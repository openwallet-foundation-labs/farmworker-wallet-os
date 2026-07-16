package fwos.keymanagement.migration;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.security.keystore.KeyInfo;
import android.util.Base64;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.KeyStore;
import java.util.concurrent.Executor;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.IvParameterSpec;

/**
 * One-shot migration reader for values written by react-native-sensitive-info 6.0.0-alpha.9
 * on Android. Auto-detects which of alpha.9's two storage formats produced the value and
 * decrypts accordingly. Reads only; never writes to the old store.
 *
 * Discriminator: alpha.9's biometric value is "Base64(IV)]Base64(cipher)"; the ']' delimiter is
 * not a valid Base64 character, so its presence unambiguously marks the biometric path. A single
 * Base64 blob (no ']') is the non-biometric path.
 *
 *  NON-biometric (touchID:false):  alias "MySharedPreferenceKeyAlias", AES/GCM/NoPadding,
 *                                  GCMParameterSpec(128, FIXED_IV). Synchronous, no prompt.
 *  BIOMETRIC (touchID:true):       alias "MyAesKeyAlias", AES/CBC/PKCS7Padding, IvParameterSpec(iv).
 *                                  The key is user-auth-required, so decryption is gated by a
 *                                  BiometricPrompt and resolves asynchronously in the success callback.
 *
 * The Keystore keys are hardware-backed and non-exportable, so this decrypt MUST run natively.
 * Legacy pre-API-23 RSA path is intentionally omitted (production is modern Android).
 *
 * Requires the androidx.biometric dependency in the app module (see README).
 */
public class LegacySensitiveInfoReaderModule extends ReactContextBaseJavaModule {

    private static final String ANDROID_KEYSTORE = "AndroidKeyStore";
    private static final String DEFAULT_PREFS = "shared_preferences";
    private static final String DELIMITER = "]";

    // Non-biometric path (alpha.9 encrypt/decrypt)
    private static final String KEY_ALIAS = "MySharedPreferenceKeyAlias";
    private static final String AES_GCM = "AES/GCM/NoPadding";
    private static final int GCM_TAG_BITS = 128;
    private static final byte[] FIXED_IV = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1};

    // Biometric path (alpha.9 putExtraWithAES/decryptWithAes)
    private static final String KEY_ALIAS_AES = "MyAesKeyAlias";
    private static final String AES_CBC = "AES/CBC/PKCS7Padding";

    public LegacySensitiveInfoReaderModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "LegacySensitiveInfoReader";
    }

    /**
     * Resolves the decrypted plaintext for key, or null when there is nothing to migrate
     * (entry absent, or the old Keystore alias is gone). Biometric-format entries prompt the
     * user and resolve after a successful authentication.
     */
    @ReactMethod
    public void readLegacy(String prefsName, String key, Promise promise) {
        try {
            String name = (prefsName == null || prefsName.isEmpty()) ? DEFAULT_PREFS : prefsName;
            SharedPreferences prefs =
                    getReactApplicationContext().getSharedPreferences(name, Context.MODE_PRIVATE);
            String stored = prefs.getString(key, null);
            if (stored == null || stored.isEmpty()) {
                promise.resolve(null); // nothing stored under this key
                return;
            }

            if (stored.contains(DELIMITER)) {
                decryptBiometric(stored, promise);
            } else {
                decryptNonBiometric(stored, promise);
            }
        } catch (Exception e) {
            promise.reject("LEGACY_READ_FAILED", e.getMessage(), e);
        }
    }

    private void decryptNonBiometric(String stored, Promise promise) throws Exception {
        KeyStore keyStore = KeyStore.getInstance(ANDROID_KEYSTORE);
        keyStore.load(null);
        if (!keyStore.containsAlias(KEY_ALIAS)) {
            promise.resolve(null); // old key gone -> unrecoverable
            return;
        }
        Key k = keyStore.getKey(KEY_ALIAS, null);
        if (!(k instanceof SecretKey)) {
            promise.reject("LEGACY_KEY_TYPE",
                    "Keystore alias " + KEY_ALIAS + " is not an AES SecretKey (legacy RSA path not supported).");
            return;
        }
        Cipher cipher = Cipher.getInstance(AES_GCM);
        cipher.init(Cipher.DECRYPT_MODE, (SecretKey) k, new GCMParameterSpec(GCM_TAG_BITS, FIXED_IV));
        byte[] plain = cipher.doFinal(Base64.decode(stored, Base64.DEFAULT));
        promise.resolve(new String(plain, StandardCharsets.UTF_8));
    }

    private void decryptBiometric(String stored, Promise promise) throws Exception {
        String[] parts = stored.split("\\" + DELIMITER, 2); // -> [ Base64(iv), Base64(cipher) ]
        if (parts.length < 2) {
            promise.reject("LEGACY_FORMAT", "Expected Base64(IV)]Base64(cipher).");
            return;
        }
        final byte[] cipherBytes = Base64.decode(parts[1], Base64.DEFAULT);
        final byte[] iv = Base64.decode(parts[0], Base64.DEFAULT);

        KeyStore keyStore = KeyStore.getInstance(ANDROID_KEYSTORE);
        keyStore.load(null);
        if (!keyStore.containsAlias(KEY_ALIAS_AES)) {
            promise.resolve(null); // old key gone -> unrecoverable
            return;
        }
        SecretKey secretKey = (SecretKey) keyStore.getKey(KEY_ALIAS_AES, null);

        final Cipher cipher = Cipher.getInstance(AES_CBC);
        cipher.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(iv));

        // Does this key require per-use user authentication (the biometric case)?
        SecretKeyFactory factory = SecretKeyFactory.getInstance(secretKey.getAlgorithm(), ANDROID_KEYSTORE);
        KeyInfo info = (KeyInfo) factory.getKeySpec(secretKey, KeyInfo.class);
        if (!info.isUserAuthenticationRequired()) {
            byte[] plain = cipher.doFinal(cipherBytes);
            promise.resolve(new String(plain, StandardCharsets.UTF_8));
            return;
        }

        // User-auth-required: show a BiometricPrompt on the UI thread and doFinal on success.
        Activity current = getCurrentActivity();
        if (!(current instanceof FragmentActivity)) {
            promise.reject("LEGACY_NO_ACTIVITY", "No FragmentActivity available to host the biometric prompt.");
            return;
        }
        final FragmentActivity activity = (FragmentActivity) current;

        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Executor executor = ContextCompat.getMainExecutor(activity);
                    BiometricPrompt prompt = new BiometricPrompt(activity, executor,
                            new BiometricPrompt.AuthenticationCallback() {
                                @Override
                                public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
                                    try {
                                        Cipher authed = (result.getCryptoObject() != null && result.getCryptoObject().getCipher() != null)
                                                ? result.getCryptoObject().getCipher() : cipher;
                                        byte[] plain = authed.doFinal(cipherBytes);
                                        promise.resolve(new String(plain, StandardCharsets.UTF_8));
                                    } catch (Exception e) {
                                        promise.reject("LEGACY_DECRYPT_FAILED", e.getMessage(), e);
                                    }
                                }

                                @Override
                                public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                                    promise.reject("LEGACY_AUTH_ERROR_" + errorCode, errString.toString());
                                }

                                @Override
                                public void onAuthenticationFailed() {
                                    // Transient (unrecognized biometric); the prompt stays up. Do not settle the promise.
                                }
                            });

                    BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                            .setTitle("Restore your wallet")
                            .setSubtitle("Authenticate to migrate your saved data")
                            .setNegativeButtonText("Cancel")
                            .build();

                    prompt.authenticate(promptInfo, new BiometricPrompt.CryptoObject(cipher));
                } catch (Exception e) {
                    promise.reject("LEGACY_PROMPT_FAILED", e.getMessage(), e);
                }
            }
        });
    }

    /** Optional: remove the old entry after a confirmed successful migration. */
    @ReactMethod
    public void deleteLegacy(String prefsName, String key, Promise promise) {
        try {
            String name = (prefsName == null || prefsName.isEmpty()) ? DEFAULT_PREFS : prefsName;
            getReactApplicationContext().getSharedPreferences(name, Context.MODE_PRIVATE)
                    .edit().remove(key).apply();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("LEGACY_DELETE_FAILED", e.getMessage(), e);
        }
    }
}
