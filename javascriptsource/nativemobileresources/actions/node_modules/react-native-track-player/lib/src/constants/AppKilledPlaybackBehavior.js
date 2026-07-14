/**
 * Define how the audio playback should behave to removing the app from recents (killing it). Default is `ContinuePlayback`.
 */
export var AppKilledPlaybackBehavior;
(function (AppKilledPlaybackBehavior) {
    /**
     * This option will continue playing audio in the background when the app is removed from recents. The notification remains. This is the default.
     */
    AppKilledPlaybackBehavior["ContinuePlayback"] = "continue-playback";
    /**
     * This option will pause playing audio in the background when the app is removed from recents. The notification remains and can be used to resume playback.
     */
    AppKilledPlaybackBehavior["PausePlayback"] = "pause-playback";
    /**
     * This option will stop playing audio in the background when the app is removed from recents. The notification is removed and can't be used to resume playback. Users would need to open the app again to start playing audio.
     */
    AppKilledPlaybackBehavior["StopPlaybackAndRemoveNotification"] = "stop-playback-and-remove-notification";
})(AppKilledPlaybackBehavior || (AppKilledPlaybackBehavior = {}));
