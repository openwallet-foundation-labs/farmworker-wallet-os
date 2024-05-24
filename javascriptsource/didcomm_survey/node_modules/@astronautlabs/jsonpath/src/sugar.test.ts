import { suite, describe } from 'razmin';
import * as assert from 'assert';

import { JSONPath } from './jsonpath';

suite(function() {
  describe('sugar', it => {
    it('parent gets us parent value', function() {
      let data = { a: 1, b: 2, c: 3, z: { a: 100, b: 200 } };
      let parent = JSONPath.parent(data, '$.z.b');
      assert.equal(parent, data.z);
    });

    it('apply method sets values', function() {
      let data = { a: 1, b: 2, c: 3, z: { a: 100, b: 200 } };
      JSONPath.apply(data, '$..a', function(v) { return v + 1 });
      assert.equal(data.a, 2);
      assert.equal(data.z.a, 101);
    });

    it('apply method applies survives structural changes', function() {
      let data = {a: {b: [1, {c: [2,3]}]}};
      JSONPath.apply(data, '$..*[?(@.length > 1)]', function(array) {
        return array.reverse();
      });
      assert.deepEqual(data.a.b, [{c: [3, 2]}, 1]);
    });

    it('value method gets us a value', function() {
      var data = { a: 1, b: 2, c: 3, z: { a: 100, b: 200 } };
      var b = JSONPath.value(data, '$..b')
      assert.equal(b, data.b);
    });

    it('value method sets us a value', function() {
      let data = { a: 1, b: 2, c: 3, z: { a: 100, b: 200 } };
      let b = JSONPath.value(data, '$..b', '5000')
      assert.equal(b, 5000);
      assert.equal(data.b, 5000);
    });

    it('value method sets new key and value', function() {
      let data : any = {};
      let a = JSONPath.value(data, '$.a', 1);
      let c = JSONPath.value(data, '$.b.c', 2);
      assert.equal(a, 1);
      assert.equal(data.a, 1);
      assert.equal(c, 2);
      assert.equal(data.b.c, 2);
    });

    it('value method sets new array value', function() {
      let data : any = {};
      let v1 = JSONPath.value(data, '$.a.d[0]', 4);
      let v2 = JSONPath.value(data, '$.a.d[1]', 5);
      assert.equal(v1, 4);
      assert.equal(v2, 5);
      assert.deepEqual(data.a.d, [4, 5]);
    });

    it('value method sets non-literal key', function() {
      let data = { "list": [ { "index": 0, "value": "default" }, { "index": 1, "value": "default" } ] };
      JSONPath.value(data, '$.list[?(@.index == 1)].value', "test");
      assert.equal(data.list[1].value, "test");
    });

    it('paths with a count gets us back count many paths', function() {
      let data = [ { a: [ 1, 2, 3 ], b: [ -1, -2, -3 ] }, { } ]
      let paths = JSONPath.paths(data, '$..*', 3)
      assert.deepEqual(paths, [ ['$', '0'], ['$', '1'], ['$', '0', 'a'] ]);
    });
  });
});
