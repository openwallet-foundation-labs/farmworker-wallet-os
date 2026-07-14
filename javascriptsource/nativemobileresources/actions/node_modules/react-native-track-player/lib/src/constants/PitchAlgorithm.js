import TrackPlayer from '../TrackPlayerModule';
export var PitchAlgorithm;
(function (PitchAlgorithm) {
    /**
     * A high-quality time pitch algorithm that doesn’t perform pitch correction.
     * */
    PitchAlgorithm[PitchAlgorithm["Linear"] = TrackPlayer.PITCH_ALGORITHM_LINEAR] = "Linear";
    /**
     * A highest-quality time pitch algorithm that’s suitable for music.
     **/
    PitchAlgorithm[PitchAlgorithm["Music"] = TrackPlayer.PITCH_ALGORITHM_MUSIC] = "Music";
    /**
     * A modest quality time pitch algorithm that’s suitable for voice.
     **/
    PitchAlgorithm[PitchAlgorithm["Voice"] = TrackPlayer.PITCH_ALGORITHM_VOICE] = "Voice";
})(PitchAlgorithm || (PitchAlgorithm = {}));
