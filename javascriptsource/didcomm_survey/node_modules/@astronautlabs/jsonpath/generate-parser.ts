import { Jison } from 'jison';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { GRAMMAR } from './src/grammar';

let parser = Jison.Parser(GRAMMAR);
let source = parser.generate();
let generatedDir = path.join(__dirname, 'generated');

source = source.replace(/exports\.main.*/ms, `\n}`);

mkdirp.sync(generatedDir);
fs.writeFileSync(path.join(generatedDir, 'parser.js'), source);