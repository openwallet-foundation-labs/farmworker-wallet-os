import { suite } from 'razmin';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import { JSONPath } from './jsonpath';

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'store.json')).toString());

suite(describe => {
  describe('orig-google-code-issues', it => {
    it('comma in eval', () => {
      var pathExpression = '$..book[?(@.price && ",")]'
      var results = JSONPath.query(data, pathExpression);
      assert.deepEqual(results, data.store.book);
    });
  
    it('member names with dots', () => {
      var data = { 'www.google.com': 42, 'www.wikipedia.org': 190 };
      var results = JSONPath.query(data, "$['www.google.com']");
      assert.deepEqual(results, [ 42 ]);
    });
  
    it('nested objects with filter', () => {
      var data = { dataResult: { object: { objectInfo: { className: "folder", typeName: "Standard Folder", id: "uniqueId" } } } };
      var results = JSONPath.query(data, "$..object[?(@.className=='folder')]");
      assert.deepEqual(results, [ data.dataResult.object.objectInfo ]);
    });
  
    it('script expressions with @ char', () => {
      var data = { "DIV": [{ "@class": "value", "val": 5 }] };
      var results = JSONPath.query(data, "$..DIV[?(@['@class']=='value')]");
      assert.deepEqual(results, data.DIV);
    });
  
    it('negative slices', () => {
      var results = JSONPath.query(data, "$..book[-1:].title");
      assert.deepEqual(results, ['The Lord of the Rings']);
    });
  
  });
  
});

