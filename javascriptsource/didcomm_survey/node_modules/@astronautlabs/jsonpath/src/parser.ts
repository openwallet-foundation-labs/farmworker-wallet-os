import * as gparser from '../generated/parser';

/**
 * @hidden
 * @internal
 */
export function Parser(): void {
  let parser = new gparser.Parser();
  let _parseError = parser.parseError;

  parser.yy.parseError = function() {
    if (parser.yy.ast) {
      parser.yy.ast.initialize();
    }
    _parseError.apply(parser, arguments);
  }

  return parser;
}