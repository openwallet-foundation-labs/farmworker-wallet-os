import * as assert from 'assert';

import { suite } from 'razmin';
import { slice } from './slice';

var data = ['a', 'b', 'c', 'd', 'e', 'f'];

suite(describe => {
  describe('slice', it => {
    it('no params yields copy', () => {
      assert.deepEqual(slice(data), data);
    });

    it('no end param defaults to end', () => {
      assert.deepEqual(slice(data, 2), data.slice(2));
    });

    it('zero end param yields empty', () => {
      assert.deepEqual(slice(data, 0, 0), []);
    });

    it('first element with explicit params', () => {
      assert.deepEqual(slice(data, 0, 1, 1), ['a']);
    });

    it('last element with explicit params', () => {
      assert.deepEqual(slice(data, -1, 6), ['f']);
    });

    it('empty extents and negative step reverses', () => {
      assert.deepEqual(slice(data, null, null, -1), ['f', 'e', 'd', 'c', 'b', 'a']);
    });

    it('negative step partial slice', () => {
      assert.deepEqual(slice(data, 4, 2, -1), ['e', 'd']);
    });

    it('negative step partial slice no start defaults to end', () => {
      assert.deepEqual(slice(data, null, 2, -1), ['f', 'e', 'd']);
    });

    it('extents clamped end', () => {
      assert.deepEqual(slice(data, null, 100), data);
    });

    it('extents clamped beginning', () => {
      assert.deepEqual(slice(data, -100, 100), data);
    });

    it('backwards extents yields empty', () => {
      assert.deepEqual(slice(data, 2, 1), []);
    });

    it('zero step gets shot down', () => {
      assert.throws(() => { slice(data, null, null, 0) });
    });
  });
});

