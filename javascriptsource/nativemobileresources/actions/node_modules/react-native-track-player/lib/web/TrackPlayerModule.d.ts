import { PlaybackState, State } from '../src';
import type { Track, UpdateOptions } from '../src';
import { PlaylistPlayer, RepeatMode } from './TrackPlayer';
export declare class TrackPlayerModule extends PlaylistPlayer {
    protected emitter: import("react-native").DeviceEventEmitterStatic;
    protected progressUpdateEventInterval: any;
    readonly CAPABILITY_PLAY = "CAPABILITY_PLAY";
    readonly CAPABILITY_PLAY_FROM_ID = "CAPABILITY_PLAY_FROM_ID";
    readonly CAPABILITY_PLAY_FROM_SEARCH = "CAPABILITY_PLAY_FROM_SEARCH";
    readonly CAPABILITY_PAUSE = "CAPABILITY_PAUSE";
    readonly CAPABILITY_STOP = "CAPABILITY_STOP";
    readonly CAPABILITY_SEEK_TO = "CAPABILITY_SEEK_TO";
    readonly CAPABILITY_SKIP = "CAPABILITY_SKIP";
    readonly CAPABILITY_SKIP_TO_NEXT = "CAPABILITY_SKIP_TO_NEXT";
    readonly CAPABILITY_SKIP_TO_PREVIOUS = "CAPABILITY_SKIP_TO_PREVIOUS";
    readonly CAPABILITY_JUMP_FORWARD = "CAPABILITY_JUMP_FORWARD";
    readonly CAPABILITY_JUMP_BACKWARD = "CAPABILITY_JUMP_BACKWARD";
    readonly CAPABILITY_SET_RATING = "CAPABILITY_SET_RATING";
    readonly CAPABILITY_LIKE = "CAPABILITY_LIKE";
    readonly CAPABILITY_DISLIKE = "CAPABILITY_DISLIKE";
    readonly CAPABILITY_BOOKMARK = "CAPABILITY_BOOKMARK";
    readonly STATE_NONE = "STATE_NONE";
    readonly STATE_READY = "STATE_READY";
    readonly STATE_PLAYING = "STATE_PLAYING";
    readonly STATE_PAUSED = "STATE_PAUSED";
    readonly STATE_STOPPED = "STATE_STOPPED";
    readonly STATE_BUFFERING = "STATE_BUFFERING";
    readonly STATE_CONNECTING = "STATE_CONNECTING";
    readonly RATING_HEART = "RATING_HEART";
    readonly RATING_THUMBS_UP_DOWN = "RATING_THUMBS_UP_DOWN";
    readonly RATING_3_STARS = "RATING_3_STARS";
    readonly RATING_4_STARS = "RATING_4_STARS";
    readonly RATING_5_STARS = "RATING_5_STARS";
    readonly RATING_PERCENTAGE = "RATING_PERCENTAGE";
    readonly REPEAT_OFF = RepeatMode.Off;
    readonly REPEAT_TRACK = RepeatMode.Track;
    readonly REPEAT_QUEUE = RepeatMode.Playlist;
    readonly PITCH_ALGORITHM_LINEAR = "PITCH_ALGORITHM_LINEAR";
    readonly PITCH_ALGORITHM_MUSIC = "PITCH_ALGORITHM_MUSIC";
    readonly PITCH_ALGORITHM_VOICE = "PITCH_ALGORITHM_VOICE";
    get state(): PlaybackState;
    set state(newState: PlaybackState);
    updateOptions(options: UpdateOptions): Promise<void>;
    protected setupProgressUpdates(interval?: number): void;
    protected clearUpdateEventInterval(): void;
    protected onTrackEnded(): Promise<void>;
    protected onPlaylistEnded(): Promise<void>;
    get playWhenReady(): boolean;
    set playWhenReady(pwr: boolean);
    getPlayWhenReady(): boolean;
    setPlayWhenReady(pwr: boolean): boolean;
    load(track: Track): Promise<void>;
    getQueue(): Track[];
    setQueue(queue: Track[]): Promise<void>;
    getActiveTrack(): Track | undefined;
    getActiveTrackIndex(): number | undefined;
    /**
     * @deprecated
     * @returns State
     */
    getState(): State;
    getPlaybackState(): PlaybackState;
}
