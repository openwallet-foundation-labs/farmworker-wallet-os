import TrackPlayer from '../TrackPlayerModule';
export var Capability;
(function (Capability) {
    Capability[Capability["Play"] = TrackPlayer.CAPABILITY_PLAY] = "Play";
    Capability[Capability["PlayFromId"] = TrackPlayer.CAPABILITY_PLAY_FROM_ID] = "PlayFromId";
    Capability[Capability["PlayFromSearch"] = TrackPlayer.CAPABILITY_PLAY_FROM_SEARCH] = "PlayFromSearch";
    Capability[Capability["Pause"] = TrackPlayer.CAPABILITY_PAUSE] = "Pause";
    Capability[Capability["Stop"] = TrackPlayer.CAPABILITY_STOP] = "Stop";
    Capability[Capability["SeekTo"] = TrackPlayer.CAPABILITY_SEEK_TO] = "SeekTo";
    Capability[Capability["Skip"] = TrackPlayer.CAPABILITY_SKIP] = "Skip";
    Capability[Capability["SkipToNext"] = TrackPlayer.CAPABILITY_SKIP_TO_NEXT] = "SkipToNext";
    Capability[Capability["SkipToPrevious"] = TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS] = "SkipToPrevious";
    Capability[Capability["JumpForward"] = TrackPlayer.CAPABILITY_JUMP_FORWARD] = "JumpForward";
    Capability[Capability["JumpBackward"] = TrackPlayer.CAPABILITY_JUMP_BACKWARD] = "JumpBackward";
    Capability[Capability["SetRating"] = TrackPlayer.CAPABILITY_SET_RATING] = "SetRating";
    Capability[Capability["Like"] = TrackPlayer.CAPABILITY_LIKE] = "Like";
    Capability[Capability["Dislike"] = TrackPlayer.CAPABILITY_DISLIKE] = "Dislike";
    Capability[Capability["Bookmark"] = TrackPlayer.CAPABILITY_BOOKMARK] = "Bookmark";
})(Capability || (Capability = {}));
