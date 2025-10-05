import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { genDiff } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'file1.json', 'file2.json', readFixture('expected-stylish.txt')],
])('generate diff between %s files', (extension, file1, file2, expectedOutput) => {
  const result = genDiff(
    getFixturePath(file1),
    getFixturePath(file2),
    'stylish'
  )
expect(result).toEqual(expectedOutput)
});