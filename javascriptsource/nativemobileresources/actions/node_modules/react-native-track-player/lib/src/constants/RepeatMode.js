import TrackPlayer from '../TrackPlayerModule';
export var RepeatMode;
(function (RepeatMode) {
    /** Playback stops when the last track in the queue has finished playing. */
    RepeatMode[RepeatMode["Off"] = TrackPlayer.REPEAT_OFF] = "Off";
    /** Repeats the current track infinitely during ongoing playback. */
    RepeatMode[RepeatMode["Track"] = TrackPlayer.REPEAT_TRACK] = "Track";
    /** Repeats the entire queue infinitely. */
    RepeatMode[RepeatMode["Queue"] = TrackPlayer.REPEAT_QUEUE] = "Queue";
})(RepeatMode || (RepeatMode = {}));
