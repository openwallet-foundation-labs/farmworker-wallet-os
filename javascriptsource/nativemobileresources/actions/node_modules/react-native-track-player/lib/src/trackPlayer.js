import { AppRegistry, DeviceEventEmitter, NativeEventEmitter, Platform, } from 'react-native';
import TrackPlayer from './TrackPlayerModule';
import resolveAssetSource from './resolveAssetSource';
const emitter = Platform.OS !== 'android'
    ? new NativeEventEmitter(TrackPlayer)
    : DeviceEventEmitter;
// MARK: - Helpers
function resolveImportedAssetOrPath(pathOrAsset) {
    return pathOrAsset === undefined
        ? undefined
        : typeof pathOrAsset === 'string'
            ? pathOrAsset
            : resolveImportedAsset(pathOrAsset);
}
function resolveImportedAsset(id) {
    return id
        ? resolveAssetSource(id) ?? undefined
        : undefined;
}
// MARK: - General API
/**
 * Initializes the player with the specified options.
 *
 * Note that on Android this method must only be called while the app is in the
 * foreground, otherwise it will throw an error with code
 * `'android_cannot_setup_player_in_background'`. In this case you can wait for
 * the app to be in the foreground and try again.
 *
 * @param options The options to initialize the player with.
 * @see https://rntp.dev/docs/api/functions/lifecycle
 */
export async function setupPlayer(options = {}) {
    return TrackPlayer.setupPlayer(options);
}
/**
 * Register the playback service. The service will run as long as the player runs.
 */
export function registerPlaybackService(factory) {
    if (Platform.OS === 'android') {
        // Registers the headless task
        AppRegistry.registerHeadlessTask('TrackPlayer', factory);
    }
    else if (Platform.OS === 'web') {
        factory()();
    }
    else {
        // Initializes and runs the service in the next tick
        setImmediate(factory());
    }
}
export function addEventListener(event, listener) {
    return emitter.addListener(event, listener);
}
/**
 * @deprecated This method should not be used, most methods reject when service is not bound.
 */
export function isServiceRunning() {
    return TrackPlayer.isServiceRunning();
}
export async function add(tracks, insertBeforeIndex = -1) {
    const resolvedTracks = (Array.isArray(tracks) ? tracks : [tracks]).map((track) => ({
        ...track,
        url: resolveImportedAssetOrPath(track.url),
        artwork: resolveImportedAssetOrPath(track.artwork),
    }));
    return resolvedTracks.length < 1
        ? undefined
        : TrackPlayer.add(resolvedTracks, insertBeforeIndex);
}
/**
 * Replaces the current track or loads the track as the first in the queue.
 *
 * @param track The track to load.
 */
export async function load(track) {
    return TrackPlayer.load(track);
}
/**
 * Move a track within the queue.
 *
 * @param fromIndex The index of the track to be moved.
 * @param toIndex The index to move the track to. If the index is larger than
 * the size of the queue, then the track is moved to the end of the queue.
 */
export async function move(fromIndex, toIndex) {
    return TrackPlayer.move(fromIndex, toIndex);
}
export async function remove(indexOrIndexes) {
    return TrackPlayer.remove(Array.isArray(indexOrIndexes) ? indexOrIndexes : [indexOrIndexes]);
}
/**
 * Clears any upcoming tracks from the queue.
 */
export async function removeUpcomingTracks() {
    return TrackPlayer.removeUpcomingTracks();
}
/**
 * Skips to a track in the queue.
 *
 * @param index The index of the track to skip to.
 * @param initialPosition (Optional) The initial position to seek to in seconds.
 */
export async function skip(index, initialPosition = -1) {
    return TrackPlayer.skip(index, initialPosition);
}
/**
 * Skips to the next track in the queue.
 *
 * @param initialPosition (Optional) The initial position to seek to in seconds.
 */
export async function skipToNext(initialPosition = -1) {
    return TrackPlayer.skipToNext(initialPosition);
}
/**
 * Skips to the previous track in the queue.
 *
 * @param initialPosition (Optional) The initial position to seek to in seconds.
 */
export async function skipToPrevious(initialPosition = -1) {
    return TrackPlayer.skipToPrevious(initialPosition);
}
// MARK: - Control Center / Notifications API
/**
 * Updates the configuration for the components.
 *
 * @param options The options to update.
 * @see https://rntp.dev/docs/api/functions/player#updateoptionsoptions
 */
export async function updateOptions({ alwaysPauseOnInterruption, ...options } = {}) {
    return TrackPlayer.updateOptions({
        ...options,
        android: {
            // Handle deprecated alwaysPauseOnInterruption option:
            alwaysPauseOnInterruption: options.android?.alwaysPauseOnInterruption ?? alwaysPauseOnInterruption,
            ...options.android,
        },
        icon: resolveImportedAsset(options.icon),
        playIcon: resolveImportedAsset(options.playIcon),
        pauseIcon: resolveImportedAsset(options.pauseIcon),
        stopIcon: resolveImportedAsset(options.stopIcon),
        previousIcon: resolveImportedAsset(options.previousIcon),
        nextIcon: resolveImportedAsset(options.nextIcon),
        rewindIcon: resolveImportedAsset(options.rewindIcon),
        forwardIcon: resolveImportedAsset(options.forwardIcon),
    });
}
/**
 * Updates the metadata of a track in the queue. If the current track is updated,
 * the notification and the Now Playing Center will be updated accordingly.
 *
 * @param trackIndex The index of the track whose metadata will be updated.
 * @param metadata The metadata to update.
 */
export async function updateMetadataForTrack(trackIndex, metadata) {
    return TrackPlayer.updateMetadataForTrack(trackIndex, {
        ...metadata,
        artwork: resolveImportedAssetOrPath(metadata.artwork),
    });
}
/**
 * @deprecated Nominated for removal in the next major version. If you object
 * to this, please describe your use-case in the following issue:
 * https://github.com/doublesymmetry/react-native-track-player/issues/1653
 */
export function clearNowPlayingMetadata() {
    return TrackPlayer.clearNowPlayingMetadata();
}
/**
 * Updates the metadata content of the notification (Android) and the Now Playing Center (iOS)
 * without affecting the data stored for the current track.
 */
export function updateNowPlayingMetadata(metadata) {
    return TrackPlayer.updateNowPlayingMetadata({
        ...metadata,
        artwork: resolveImportedAssetOrPath(metadata.artwork),
    });
}
// MARK: - Player API
/**
 * Resets the player stopping the current track and clearing the queue.
 */
export async function reset() {
    return TrackPlayer.reset();
}
/**
 * Plays or resumes the current track.
 */
export async function play() {
    return TrackPlayer.play();
}
/**
 * Pauses the current track.
 */
export async function pause() {
    return TrackPlayer.pause();
}
/**
 * Stops the current track.
 */
export async function stop() {
    return TrackPlayer.stop();
}
/**
 * Sets whether the player will play automatically when it is ready to do so.
 * This is the equivalent of calling `TrackPlayer.play()` when `playWhenReady = true`
 * or `TrackPlayer.pause()` when `playWhenReady = false`.
 */
export async function setPlayWhenReady(playWhenReady) {
    return TrackPlayer.setPlayWhenReady(playWhenReady);
}
/**
 * Gets whether the player will play automatically when it is ready to do so.
 */
export async function getPlayWhenReady() {
    return TrackPlayer.getPlayWhenReady();
}
/**
 * Seeks to a specified time position in the current track.
 *
 * @param position The position to seek to in seconds.
 */
export async function seekTo(position) {
    return TrackPlayer.seekTo(position);
}
/**
 * Seeks by a relative time offset in the current track.
 *
 * @param offset The time offset to seek by in seconds.
 */
export async function seekBy(offset) {
    return TrackPlayer.seekBy(offset);
}
/**
 * Sets the volume of the player.
 *
 * @param volume The volume as a number between 0 and 1.
 */
export async function setVolume(level) {
    return TrackPlayer.setVolume(level);
}
/**
 * Sets the playback rate.
 *
 * @param rate The playback rate to change to, where 0.5 would be half speed,
 * 1 would be regular speed, 2 would be double speed etc.
 */
export async function setRate(rate) {
    return TrackPlayer.setRate(rate);
}
/**
 * Sets the queue.
 *
 * @param tracks The tracks to set as the queue.
 * @see https://rntp.dev/docs/api/constants/repeat-mode
 */
export async function setQueue(tracks) {
    return TrackPlayer.setQueue(tracks);
}
/**
 * Sets the queue repeat mode.
 *
 * @param repeatMode The repeat mode to set.
 * @see https://rntp.dev/docs/api/constants/repeat-mode
 */
export async function setRepeatMode(mode) {
    return TrackPlayer.setRepeatMode(mode);
}
// MARK: - Getters
/**
 * Gets the volume of the player as a number between 0 and 1.
 */
export async function getVolume() {
    return TrackPlayer.getVolume();
}
/**
 * Gets the playback rate where 0.5 would be half speed, 1 would be
 * regular speed and 2 would be double speed etc.
 */
export async function getRate() {
    return TrackPlayer.getRate();
}
/**
 * Gets a track object from the queue.
 *
 * @param index The index of the track.
 * @returns The track object or undefined if there isn't a track object at that
 * index.
 */
export async function getTrack(index) {
    return TrackPlayer.getTrack(index);
}
/**
 * Gets the whole queue.
 */
export async function getQueue() {
    return TrackPlayer.getQueue();
}
/**
 * Gets the index of the active track in the queue or undefined if there is no
 * current track.
 */
export async function getActiveTrackIndex() {
    return (await TrackPlayer.getActiveTrackIndex()) ?? undefined;
}
/**
 * Gets the active track or undefined if there is no current track.
 */
export async function getActiveTrack() {
    return (await TrackPlayer.getActiveTrack()) ?? undefined;
}
/**
 * Gets the index of the current track or null if there is no current track.
 *
 * @deprecated use `TrackPlayer.getActiveTrackIndex()` instead.
 */
export async function getCurrentTrack() {
    return TrackPlayer.getActiveTrackIndex();
}
/**
 * Gets the duration of the current track in seconds.
 * @deprecated Use `TrackPlayer.getProgress().then((progress) => progress.duration)` instead.
 */
export async function getDuration() {
    return TrackPlayer.getDuration();
}
/**
 * Gets the buffered position of the current track in seconds.
 *
 * @deprecated Use `TrackPlayer.getProgress().then((progress) => progress.buffered)` instead.
 */
export async function getBufferedPosition() {
    return TrackPlayer.getBufferedPosition();
}
/**
 * Gets the playback position of the current track in seconds.
 * @deprecated Use `TrackPlayer.getProgress().then((progress) => progress.position)` instead.
 */
export async function getPosition() {
    return TrackPlayer.getPosition();
}
/**
 * Gets information on the progress of the currently active track, including its
 * current playback position in seconds, buffered position in seconds and
 * duration in seconds.
 */
export async function getProgress() {
    return TrackPlayer.getProgress();
}
/**
 * @deprecated use (await getPlaybackState()).state instead.
 */
export async function getState() {
    return (await TrackPlayer.getPlaybackState()).state;
}
/**
 * Gets the playback state of the player.
 *
 * @see https://rntp.dev/docs/api/constants/state
 */
export async function getPlaybackState() {
    return TrackPlayer.getPlaybackState();
}
/**
 * Gets the queue repeat mode.
 *
 * @see https://rntp.dev/docs/api/constants/repeat-mode
 */
export async function getRepeatMode() {
    return TrackPlayer.getRepeatMode();
}
/**
 * Retries the current item when the playback state is `State.Error`.
 */
export async function retry() {
    return TrackPlayer.retry();
}
