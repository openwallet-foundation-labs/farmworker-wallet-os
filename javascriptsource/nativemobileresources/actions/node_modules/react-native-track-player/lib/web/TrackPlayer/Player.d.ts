import { State } from '../../src/constants/State';
import type { Track, Progress, PlaybackState } from '../../src/interfaces';
export declare class Player {
    protected hasInitialized: boolean;
    protected element?: HTMLMediaElement;
    protected player?: shaka.Player;
    protected _current?: Track;
    protected _playWhenReady: boolean;
    protected _state: PlaybackState;
    get current(): Track | undefined;
    set current(cur: Track | undefined);
    get state(): PlaybackState;
    set state(newState: PlaybackState);
    get playWhenReady(): boolean;
    set playWhenReady(pwr: boolean);
    setupPlayer(): Promise<void>;
    /**
     * event handlers
     */
    protected onStateUpdate(state: Exclude<State, State.Error>): void;
    protected onError(error: any): void;
    /**
     * player control
     */
    load(track: Track): Promise<void>;
    retry(): Promise<void>;
    stop(): Promise<void>;
    play(): Promise<void>;
    pause(): void;
    setRate(rate: number): number;
    getRate(): number;
    seekBy(offset: number): void;
    seekTo(seconds: number): void;
    setVolume(volume: number): void;
    getVolume(): number;
    getDuration(): number;
    getPosition(): number;
    getProgress(): Progress;
    getBufferedPosition(): (index: number) => number;
}
