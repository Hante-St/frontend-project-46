import { test, expect } from '@jest/globals'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8')

const testCases = [
  ['json', 'file1.json', 'file2.json', readFixture('expected-stylish.txt')],
  ['yml', 'file1.yml', 'file2.yml', readFixture('expected-stylish.txt')],
  ['yaml', 'file1.yaml', 'file2.yaml', readFixture('expected-stylish.txt')],
]

test.each(testCases)('generate diff between %s files', (extension, file1, file2, expectedOutput) => {
  const result = genDiff(
    getFixturePath(file1),
    getFixturePath(file2),
    'stylish'
  )
  expect(result).toEqual(expectedOutput)
})