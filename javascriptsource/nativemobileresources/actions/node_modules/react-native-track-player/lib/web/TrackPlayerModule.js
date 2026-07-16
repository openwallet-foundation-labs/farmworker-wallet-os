import { DeviceEventEmitter } from 'react-native';
import { Event, State } from '../src';
import { PlaylistPlayer, RepeatMode } from './TrackPlayer';
import { SetupNotCalledError } from './TrackPlayer/SetupNotCalledError';
export class TrackPlayerModule extends PlaylistPlayer {
    emitter = DeviceEventEmitter;
    progressUpdateEventInterval;
    // Capabilities
    CAPABILITY_PLAY = 'CAPABILITY_PLAY';
    CAPABILITY_PLAY_FROM_ID = 'CAPABILITY_PLAY_FROM_ID';
    CAPABILITY_PLAY_FROM_SEARCH = 'CAPABILITY_PLAY_FROM_SEARCH';
    CAPABILITY_PAUSE = 'CAPABILITY_PAUSE';
    CAPABILITY_STOP = 'CAPABILITY_STOP';
    CAPABILITY_SEEK_TO = 'CAPABILITY_SEEK_TO';
    CAPABILITY_SKIP = 'CAPABILITY_SKIP';
    CAPABILITY_SKIP_TO_NEXT = 'CAPABILITY_SKIP_TO_NEXT';
    CAPABILITY_SKIP_TO_PREVIOUS = 'CAPABILITY_SKIP_TO_PREVIOUS';
    CAPABILITY_JUMP_FORWARD = 'CAPABILITY_JUMP_FORWARD';
    CAPABILITY_JUMP_BACKWARD = 'CAPABILITY_JUMP_BACKWARD';
    CAPABILITY_SET_RATING = 'CAPABILITY_SET_RATING';
    CAPABILITY_LIKE = 'CAPABILITY_LIKE';
    CAPABILITY_DISLIKE = 'CAPABILITY_DISLIKE';
    CAPABILITY_BOOKMARK = 'CAPABILITY_BOOKMARK';
    // States
    STATE_NONE = 'STATE_NONE';
    STATE_READY = 'STATE_READY';
    STATE_PLAYING = 'STATE_PLAYING';
    STATE_PAUSED = 'STATE_PAUSED';
    STATE_STOPPED = 'STATE_STOPPED';
    STATE_BUFFERING = 'STATE_BUFFERING';
    STATE_CONNECTING = 'STATE_CONNECTING';
    // Rating Types
    RATING_HEART = 'RATING_HEART';
    RATING_THUMBS_UP_DOWN = 'RATING_THUMBS_UP_DOWN';
    RATING_3_STARS = 'RATING_3_STARS';
    RATING_4_STARS = 'RATING_4_STARS';
    RATING_5_STARS = 'RATING_5_STARS';
    RATING_PERCENTAGE = 'RATING_PERCENTAGE';
    // Repeat Modes
    REPEAT_OFF = RepeatMode.Off;
    REPEAT_TRACK = RepeatMode.Track;
    REPEAT_QUEUE = RepeatMode.Playlist;
    // Pitch Algorithms
    PITCH_ALGORITHM_LINEAR = 'PITCH_ALGORITHM_LINEAR';
    PITCH_ALGORITHM_MUSIC = 'PITCH_ALGORITHM_MUSIC';
    PITCH_ALGORITHM_VOICE = 'PITCH_ALGORITHM_VOICE';
    // observe and emit state changes
    get state() {
        return super.state;
    }
    set state(newState) {
        super.state = newState;
        this.emitter.emit(Event.PlaybackState, newState);
    }
    async updateOptions(options) {
        this.setupProgressUpdates(options.progressUpdateEventInterval);
    }
    setupProgressUpdates(interval) {
        // clear and reset interval
        this.clearUpdateEventInterval();
        if (interval) {
            this.clearUpdateEventInterval();
            this.progressUpdateEventInterval = setInterval(async () => {
                if (this.state.state === State.Playing) {
                    const progress = await this.getProgress();
                    this.emitter.emit(Event.PlaybackProgressUpdated, {
                        ...progress,
                        track: this.currentIndex,
                    });
                }
            }, interval * 1000);
        }
    }
    clearUpdateEventInterval() {
        if (this.progressUpdateEventInterval) {
            clearInterval(this.progressUpdateEventInterval);
        }
    }
    async onTrackEnded() {
        const position = this.element.currentTime;
        await super.onTrackEnded();
        this.emitter.emit(Event.PlaybackTrackChanged, {
            track: this.lastIndex,
            position,
            nextTrack: this.currentIndex,
        });
    }
    async onPlaylistEnded() {
        await super.onPlaylistEnded();
        this.emitter.emit(Event.PlaybackQueueEnded, {
            track: this.currentIndex,
            position: this.element.currentTime,
        });
    }
    get playWhenReady() {
        return super.playWhenReady;
    }
    set playWhenReady(pwr) {
        const didChange = pwr !== this._playWhenReady;
        super.playWhenReady = pwr;
        if (didChange) {
            this.emitter.emit(Event.PlaybackPlayWhenReadyChanged, { playWhenReady: this._playWhenReady });
        }
    }
    getPlayWhenReady() {
        return this.playWhenReady;
    }
    setPlayWhenReady(pwr) {
        this.playWhenReady = pwr;
        return this.playWhenReady;
    }
    async load(track) {
        if (!this.element)
            throw new SetupNotCalledError();
        const lastTrack = this.current;
        const lastPosition = this.element.currentTime;
        await super.load(track);
        this.emitter.emit(Event.PlaybackActiveTrackChanged, {
            lastTrack,
            lastPosition,
            lastIndex: this.lastIndex,
            index: this.currentIndex,
            track,
        });
    }
    getQueue() {
        return this.playlist;
    }
    async setQueue(queue) {
        await this.stop();
        this.playlist = queue;
    }
    getActiveTrack() {
        return this.current;
    }
    getActiveTrackIndex() {
        // per the existing spec, this should throw if setup hasn't been called
        if (!this.element || !this.player)
            throw new SetupNotCalledError();
        return this.currentIndex;
    }
    /**
     * @deprecated
     * @returns State
     */
    getState() {
        return this.state.state;
    }
    getPlaybackState() {
        return this.state;
    }
}
;
