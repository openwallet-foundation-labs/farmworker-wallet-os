export var Event;
(function (Event) {
    Event["PlayerError"] = "player-error";
    /** Fired when the state of the player changes. */
    Event["PlaybackState"] = "playback-state";
    /** Fired when a playback error occurs. */
    Event["PlaybackError"] = "playback-error";
    /** Fired after playback has paused due to the queue having reached the end. */
    Event["PlaybackQueueEnded"] = "playback-queue-ended";
    /**
     * Fired when another track has become active or when there no longer is an
     * active track.
     *
     * @deprecated use `playback-active-track-changed` instead.
     **/
    Event["PlaybackTrackChanged"] = "playback-track-changed";
    /**
     * Fired when another track has become active or when there no longer is an
     * active track.
     **/
    Event["PlaybackActiveTrackChanged"] = "playback-active-track-changed";
    /**
     * Fired when the current track receives metadata encoded in. (e.g. ID3 tags,
     * Icy Metadata, Vorbis Comments or QuickTime metadata).
     * @deprecated use `AudioChapterMetadataReceived, AudioTimedMetadataReceived, AudioCommonMetadataReceived` instead.
     **/
    Event["PlaybackMetadataReceived"] = "playback-metadata-received";
    /**
     * Fired when playback play when ready has changed.
     **/
    Event["PlaybackPlayWhenReadyChanged"] = "playback-play-when-ready-changed";
    /**
     * Fired when playback progress has been updated.
     * See https://rntp.dev/docs/api/events#playbackprogressupdated
     **/
    Event["PlaybackProgressUpdated"] = "playback-progress-updated";
    /**
     * Fired when the user presses the play button.
     * See https://rntp.dev/docs/api/events#remoteplay
     **/
    Event["RemotePlay"] = "remote-play";
    /**
     * Fired when the user presses the pause button.
     * See https://rntp.dev/docs/api/events#remotepause
     **/
    Event["RemotePause"] = "remote-pause";
    /**
     * Fired when the user presses the stop button.
     * See https://rntp.dev/docs/api/events#remotestop
     **/
    Event["RemoteStop"] = "remote-stop";
    /**
     * Fired when the user presses the next track button.
     * See https://rntp.dev/docs/api/events#remotenext
     **/
    Event["RemoteNext"] = "remote-next";
    /**
     * Fired when the user presses the previous track button.
     * See https://rntp.dev/docs/api/events#remoteprevious
     **/
    Event["RemotePrevious"] = "remote-previous";
    /**
     * Fired when the user presses the jump forward button.
     * See https://rntp.dev/docs/api/events#remotejumpforward
     **/
    Event["RemoteJumpForward"] = "remote-jump-forward";
    /**
     * Fired when the user presses the jump backward button.
     * See https://rntp.dev/docs/api/events#remotejumpbackward
     **/
    Event["RemoteJumpBackward"] = "remote-jump-backward";
    /**
     * Fired when the user changes the position of the timeline.
     * See https://rntp.dev/docs/api/events#remoteseek
     **/
    Event["RemoteSeek"] = "remote-seek";
    /**
     * Fired when the user changes the rating for the track remotely.
     * See https://rntp.dev/docs/api/events#remotesetrating
     **/
    Event["RemoteSetRating"] = "remote-set-rating";
    /**
     * Fired when the app needs to handle an audio interruption.
     * See https://rntp.dev/docs/api/events#remoteduck
     **/
    Event["RemoteDuck"] = "remote-duck";
    /**
     * (iOS only) Fired when the user presses the like button in the now playing
     * center.
     * See https://rntp.dev/docs/api/events#remotelike-ios-only
     **/
    Event["RemoteLike"] = "remote-like";
    /**
     * (iOS only) Fired when the user presses the dislike button in the now playing
     * center.
     * See https://rntp.dev/docs/api/events#remotedislike-ios-only
     **/
    Event["RemoteDislike"] = "remote-dislike";
    /** (iOS only) Fired when the user presses the bookmark button in the now
     * playing center.
     * See https://rntp.dev/docs/api/events#remotebookmark-ios-only
     **/
    Event["RemoteBookmark"] = "remote-bookmark";
    /**
     * (Android only) Fired when the user selects a track from an external device.
     * See https://rntp.dev/docs/api/events#remoteplayid
     **/
    Event["RemotePlayId"] = "remote-play-id";
    /**
     * (Android only) Fired when the user searches for a track (usually voice search).
     * See https://rntp.dev/docs/api/events#remoteplaysearch
     **/
    Event["RemotePlaySearch"] = "remote-play-search";
    /**
     * (Android only) Fired when the user presses the skip button.
     * See https://rntp.dev/docs/api/events#remoteskip
     **/
    Event["RemoteSkip"] = "remote-skip";
    /**
     * (iOS only) Fired when chapter metadata is received.
     * See https://rntp.dev/docs/api/events#chaptermetadatareceived
     **/
    Event["MetadataChapterReceived"] = "metadata-chapter-received";
    /**
     * Fired when metadata is received at a specific time in the audio.
     * See https://rntp.dev/docs/api/events#timedmetadatareceived
     **/
    Event["MetadataTimedReceived"] = "metadata-timed-received";
    /**
     * Fired when common (static) metadata is received.
     * See https://rntp.dev/docs/api/events#commonmetadatareceived
     **/
    Event["MetadataCommonReceived"] = "metadata-common-received";
})(Event || (Event = {}));
