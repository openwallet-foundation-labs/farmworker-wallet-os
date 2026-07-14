import { Player } from './Player';
import { RepeatMode } from './RepeatMode';
import { State } from '../../src';
export class PlaylistPlayer extends Player {
    // TODO: use immer to make the `playlist` immutable
    playlist = [];
    lastIndex;
    _currentIndex;
    repeatMode = RepeatMode.Off;
    async onStateUpdate(state) {
        super.onStateUpdate(state);
        if (state === State.Ended) {
            await this.onTrackEnded();
        }
    }
    async onTrackEnded() {
        switch (this.repeatMode) {
            case RepeatMode.Track:
                if (this.currentIndex !== undefined) {
                    await this.goToIndex(this.currentIndex);
                }
                break;
            case RepeatMode.Playlist:
                if (this.currentIndex === this.playlist.length - 1) {
                    await this.goToIndex(0);
                }
                else {
                    await this.skipToNext();
                }
                break;
            default:
                try {
                    await this.skipToNext();
                }
                catch (err) {
                    if (err.message !== 'playlist_exhausted') {
                        throw err;
                    }
                    this.onPlaylistEnded();
                }
                break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPlaylistEnded() { }
    get currentIndex() {
        return this._currentIndex;
    }
    set currentIndex(current) {
        this.lastIndex = this.currentIndex;
        this._currentIndex = current;
    }
    async goToIndex(index, initialPosition) {
        const track = this.playlist[index];
        if (!track) {
            throw new Error('playlist_exhausted');
        }
        if (this.currentIndex !== index) {
            this.currentIndex = index;
            await this.load(track);
        }
        if (initialPosition) {
            this.seekTo(initialPosition);
        }
        if (this.playWhenReady) {
            await this.play();
        }
    }
    async add(tracks, insertBeforeIndex) {
        if (insertBeforeIndex !== -1 && insertBeforeIndex !== undefined) {
            this.playlist.splice(insertBeforeIndex, 0, ...tracks);
        }
        else {
            this.playlist.push(...tracks);
        }
        if (this.currentIndex === undefined) {
            await this.goToIndex(0);
        }
    }
    async skip(index, initialPosition) {
        const track = this.playlist[index];
        if (track === undefined) {
            throw new Error('index out of bounds');
        }
        await this.goToIndex(index, initialPosition);
    }
    async skipToNext(initialPosition) {
        if (this.currentIndex === undefined)
            return;
        const index = this.currentIndex + 1;
        await this.goToIndex(index, initialPosition);
    }
    async skipToPrevious(initialPosition) {
        if (this.currentIndex === undefined)
            return;
        const index = this.currentIndex - 1;
        await this.goToIndex(index, initialPosition);
    }
    getTrack(index) {
        const track = this.playlist[index];
        return track || null;
    }
    setRepeatMode(mode) {
        this.repeatMode = mode;
    }
    getRepeatMode() {
        return this.repeatMode;
    }
    async remove(indexes) {
        const idxMap = indexes.reduce((acc, elem) => {
            acc[elem] = true;
            return acc;
        }, {});
        let isCurrentRemoved = false;
        this.playlist = this.playlist.filter((_track, idx) => {
            const keep = !idxMap[idx];
            if (!keep && idx === this.currentIndex) {
                isCurrentRemoved = true;
            }
            return keep;
        });
        if (this.currentIndex === undefined) {
            return;
        }
        const hasItems = this.playlist.length > 0;
        if (isCurrentRemoved && hasItems) {
            await this.goToIndex(this.currentIndex % this.playlist.length);
        }
        else if (isCurrentRemoved) {
            await this.stop();
        }
    }
    async stop() {
        await super.stop();
        this.currentIndex = undefined;
    }
    async reset() {
        await this.stop();
        this.playlist = [];
    }
    async removeUpcomingTracks() {
        if (this.currentIndex === undefined)
            return;
        this.playlist = this.playlist.slice(0, this.currentIndex + 1);
    }
    async move(fromIndex, toIndex) {
        if (!this.playlist[fromIndex]) {
            throw new Error('index out of bounds');
        }
        if (this.currentIndex === fromIndex) {
            throw new Error('you cannot move the currently playing track');
        }
        if (this.currentIndex === toIndex) {
            throw new Error('you cannot replace the currently playing track');
        }
        // calculate `currentIndex` after move
        let shift = undefined;
        if (this.currentIndex) {
            if (fromIndex < this.currentIndex && toIndex > this.currentIndex) {
                shift = -1;
            }
            else if (fromIndex > this.currentIndex && toIndex < this.currentIndex) {
                shift = +1;
            }
        }
        // move the track
        const fromItem = this.playlist[fromIndex];
        this.playlist.splice(fromIndex, 1);
        this.playlist.splice(toIndex, 0, fromItem);
        if (this.currentIndex && shift) {
            this.currentIndex = this.currentIndex + shift;
        }
    }
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateMetadataForTrack(index, metadata) { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    clearNowPlayingMetadata() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateNowPlayingMetadata(metadata) { }
}
