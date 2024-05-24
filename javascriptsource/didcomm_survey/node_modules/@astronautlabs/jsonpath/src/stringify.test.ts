import * as assert from 'assert';

import { suite, describe } from 'razmin';
import { JSONPath } from './jsonpath';

suite(function() {
  describe('stringify', it => {
    it('simple path stringifies', function() {
      var string = JSONPath.stringify(['$', 'a', 'b', 'c']);
      assert.equal(string, '$.a.b.c');
    });

    it('numeric literals end up as subscript numbers', function() {
      var string = JSONPath.stringify(['$', 'store', 'book', 0, 'author']);
      assert.equal(string, '$.store.book[0].author');
    });

    it('simple path with no leading root stringifies', function() {
      var string = JSONPath.stringify(['a', 'b', 'c']);
      assert.equal(string, '$.a.b.c');
    });

    it('simple parsed path stringifies', function() {
      var path = [
        { scope: 'child', operation: 'member', expression: { type: 'identifier', value: 'a' } },
        { scope: 'child', operation: 'member', expression: { type: 'identifier', value: 'b' } },
        { scope: 'child', operation: 'member', expression: { type: 'identifier', value: 'c' } }
      ];
      var string = JSONPath.stringify(path);
      assert.equal(string, '$.a.b.c');
    });

    it('keys with hyphens get subscripted', function() {
      var string = JSONPath.stringify(['$', 'member-search']);
      assert.equal(string, '$["member-search"]');
    });

    it('complicated path round trips', function() {
      var pathExpression = '$..*[0:2].member["string-xyz"]';
      var path = JSONPath.parse(pathExpression);
      var string = JSONPath.stringify(path);
      assert.equal(string, pathExpression);
    });

    it('complicated path with filter exp round trips', function() {
      var pathExpression = '$..*[0:2].member[?(@.val > 10)]';
      var path = JSONPath.parse(pathExpression);
      var string = JSONPath.stringify(path);
      assert.equal(string, pathExpression);
    });

    it('throws for no input', function() {
      assert.throws(function() { JSONPath.stringify(undefined) }, /we need a path/);
    });
  });
});
