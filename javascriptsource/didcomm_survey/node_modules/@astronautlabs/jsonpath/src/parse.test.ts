import { suite } from 'razmin';
import * as assert from 'assert';
import { JSONPath } from './jsonpath';

suite(describe => {
  describe('parse', it => {
    it('should parse root-only', function() {
      var path = JSONPath.parse('$');
      assert.deepEqual(path, [ { expression: { type: 'root', value: '$' } } ]);
    });

    it('parse path for store', function() {
      var path = JSONPath.parse('$.store');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'store' } }
      ])
    });

    it('parse path for the authors of all books in the store', function() {
      var path = JSONPath.parse('$.store.book[*].author');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'store' } },
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'book' } },
        { operation: 'subscript', scope: 'child', expression: { type: 'wildcard', value: '*' } },
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'author' } }
      ])
    });

    it('parse path for all authors', function() {
      var path = JSONPath.parse('$..author');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'descendant', expression: { type: 'identifier', value: 'author' } }
      ])
    });

    it('parse path for all authors via subscript descendant string literal', function() {
      var path = JSONPath.parse("$..['author']");
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'subscript', scope: 'descendant', expression: { type: 'string_literal', value: 'author' } }
      ])
    });

    it('parse path for all things in store', function() {
      var path = JSONPath.parse('$.store.*');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'store' } },
        { operation: 'member', scope: 'child', expression: { type: 'wildcard', value: '*' } }
      ])
    });

    it('parse path for price of everything in the store', function() {
      var path = JSONPath.parse('$.store..price');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'store' } },
        { operation: 'member', scope: 'descendant', expression: { type: 'identifier', value: 'price' } }
      ])
    });

    it('parse path for the last book in order via expression', function() {
      var path = JSONPath.parse('$..book[(@.length-1)]');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'descendant', expression: { type: 'identifier', value: 'book' } },
        { operation: 'subscript', scope: 'child', expression: { type: 'script_expression', value: '(@.length-1)' } }
      ])
    });

    it('parse path for the first two books via union', function() {
      var path = JSONPath.parse('$..book[0,1]');

      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'descendant', expression: { type: 'identifier', value: 'book' } },
        { operation: 'subscript', scope: 'child', expression: { type: 'union', value: [ { expression: { type: 'numeric_literal', value: '0' } }, { expression: { type: 'numeric_literal', value: '1' } } ] } }
      ])
    });

    it('parse path for the first two books via slice', function() {
      var path = JSONPath.parse('$..book[0:2]');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'descendant', expression: { type: 'identifier', value: 'book' } },
        { operation: 'subscript', scope: 'child', expression: { type: 'slice', value: '0:2' } }
      ])
    });

    it('parse path to filter all books with isbn number', function() {
      var path = JSONPath.parse('$..book[?(@.isbn)]');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'descendant', expression: { type: 'identifier', value: 'book' } },
        { operation: 'subscript', scope: 'child', expression: { type: 'filter_expression', value: '?(@.isbn)' } }
      ])
    });

    it('parse path to filter all books with a price less than 10', function() {
      var path = JSONPath.parse('$..book[?(@.price<10)]');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'descendant', expression: { type: 'identifier', value: 'book' } },
        { operation: 'subscript', scope: 'child', expression: { type: 'filter_expression', value: '?(@.price<10)' } }
      ])
    });

    it('parse path to match all elements', function() {
      var path = JSONPath.parse('$..*');
      assert.deepEqual(path, [
        { expression: { type: 'root', value: '$' } },
        { operation: 'member', scope: 'descendant', expression: { type: 'wildcard', value: '*' } }
      ])
    });

    it('parse path with leading member', function() {
      var path = JSONPath.parse('store');
      assert.deepEqual(path, [
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'store' } }
      ])
    });

    it('parse path with leading member and followers', function() {
      var path = JSONPath.parse('Request.prototype.end');
      assert.deepEqual(path, [
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'Request' } },
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'prototype' } },
        { operation: 'member', scope: 'child', expression: { type: 'identifier', value: 'end' } }
      ])
    });

    it('parser ast is reinitialized after parse() throws', function() {
      assert.throws(function() { var path = JSONPath.parse('store.book...') })
      var path = JSONPath.parse('$..price');
      assert.deepEqual(path, [
        { "expression": { "type": "root", "value": "$" } },
        { "expression": { "type": "identifier", "value": "price" }, "operation": "member", "scope": "descendant"}
      ])
    });

  });

  describe('parse-negative', it => {
    it('parse path with leading member component throws', () => {
      assert.throws(() => JSONPath.parse('.store'), /Expecting 'DOLLAR'/);
    });

    it('parse path with leading descendant member throws', () => {
      assert.throws(function() { var path = JSONPath.parse('..store') }, /Expecting 'DOLLAR'/)
    });

    it('leading script throws', () => {
      assert.throws(function() { var path = JSONPath.parse('()') }, /Unrecognized text/)
    });

    it('first time friendly error', () => {
      assert.throws(function() { JSONPath.parse('$...') }, /Expecting 'STAR'/)
    });
  });
});
