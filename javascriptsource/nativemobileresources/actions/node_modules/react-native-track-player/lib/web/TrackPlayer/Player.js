import { State } from '../../src/constants/State';
import { SetupNotCalledError } from './SetupNotCalledError';
export class Player {
    hasInitialized = false;
    element;
    player;
    _current = undefined;
    _playWhenReady = false;
    _state = { state: State.None };
    // current getter/setter
    get current() {
        return this._current;
    }
    set current(cur) {
        this._current = cur;
    }
    // state getter/setter
    get state() {
        return this._state;
    }
    set state(newState) {
        this._state = newState;
    }
    // playWhenReady getter/setter
    get playWhenReady() {
        return this._playWhenReady;
    }
    set playWhenReady(pwr) {
        this._playWhenReady = pwr;
    }
    async setupPlayer() {
        // shaka only runs in a browser
        if (typeof window === 'undefined')
            return;
        if (this.hasInitialized === true) {
            // TODO: double check the structure of this error message
            throw { code: 'player_already_initialized', message: 'The player has already been initialized via setupPlayer.' };
        }
        // @ts-ignore
        const shaka = (await import('shaka-player/dist/shaka-player.ui')).default;
        // Install built-in polyfills to patch browser incompatibilities.
        shaka.polyfill.installAll();
        // Check to see if the browser supports the basic APIs Shaka needs.
        if (!shaka.Player.isBrowserSupported()) {
            // This browser does not have the minimum set of APIs we need.
            this.state = {
                state: State.Error,
                error: {
                    code: 'not_supported',
                    message: 'Browser not supported.',
                },
            };
            throw new Error('Browser not supported.');
        }
        // build dom element and attach shaka-player
        this.element = document.createElement('audio');
        this.element.setAttribute('id', 'react-native-track-player');
        this.player = new shaka.Player();
        this.player?.attach(this.element);
        // Listen for relevant events events.
        this.player.addEventListener('error', (error) => {
            // Extract the shaka.util.Error object from the event.
            this.onError(error.detail);
        });
        this.element.addEventListener('ended', this.onStateUpdate.bind(this, State.Ended));
        this.element.addEventListener('playing', this.onStateUpdate.bind(this, State.Playing));
        this.element.addEventListener('pause', this.onStateUpdate.bind(this, State.Paused));
        this.player.addEventListener('loading', this.onStateUpdate.bind(this, State.Loading));
        this.player.addEventListener('loaded', this.onStateUpdate.bind(this, State.Ready));
        this.player.addEventListener('buffering', ({ buffering }) => {
            if (buffering === true) {
                this.onStateUpdate(State.Buffering);
            }
        });
        // Attach player to the window to make it easy to access in the JS console.
        // @ts-ignore
        window.rntp = this.player;
        this.hasInitialized = true;
    }
    /**
     * event handlers
     */
    onStateUpdate(state) {
        this.state = { state };
    }
    onError(error) {
        // unload the current track to allow for clean playback on other
        this.player?.unload();
        this.state = {
            state: State.Error,
            error: {
                code: error.code.toString(),
                message: error.message,
            },
        };
        // Log the error.
        console.debug('Error code', error.code, 'object', error);
    }
    /**
     * player control
     */
    async load(track) {
        if (!this.player)
            throw new SetupNotCalledError();
        await this.player.load(track.url);
        this.current = track;
    }
    async retry() {
        if (!this.player)
            throw new SetupNotCalledError();
        this.player.retryStreaming();
    }
    async stop() {
        if (!this.player)
            throw new SetupNotCalledError();
        this.current = undefined;
        await this.player.unload();
    }
    play() {
        if (!this.element)
            throw new SetupNotCalledError();
        this.playWhenReady = true;
        return this.element.play()
            .catch(err => {
            console.error(err);
        });
    }
    pause() {
        if (!this.element)
            throw new SetupNotCalledError();
        this.playWhenReady = false;
        return this.element.pause();
    }
    setRate(rate) {
        if (!this.element)
            throw new SetupNotCalledError();
        this.element.defaultPlaybackRate = rate;
        return this.element.playbackRate = rate;
    }
    getRate() {
        if (!this.element)
            throw new SetupNotCalledError();
        return this.element.playbackRate;
    }
    seekBy(offset) {
        if (!this.element)
            throw new SetupNotCalledError();
        this.element.currentTime += offset;
    }
    seekTo(seconds) {
        if (!this.element)
            throw new SetupNotCalledError();
        this.element.currentTime = seconds;
    }
    setVolume(volume) {
        if (!this.element)
            throw new SetupNotCalledError();
        this.element.volume = volume;
    }
    getVolume() {
        if (!this.element)
            throw new SetupNotCalledError();
        return this.element.volume;
    }
    getDuration() {
        if (!this.element)
            throw new SetupNotCalledError();
        return this.element.duration;
    }
    getPosition() {
        if (!this.element)
            throw new SetupNotCalledError();
        return this.element.currentTime;
    }
    getProgress() {
        if (!this.element)
            throw new SetupNotCalledError();
        return {
            position: this.element.currentTime,
            duration: this.element.duration || 0,
            buffered: 0, // TODO: this.element.buffered.end,
        };
    }
    getBufferedPosition() {
        if (!this.element)
            throw new SetupNotCalledError();
        return this.element.buffered.end;
    }
}
