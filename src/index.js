import makeFormat from './formatters/index.js'
import generateDiff from './generateDiff.js'
import { readFile, getExtension } from './utils.js'
import parse from './parser.js'

function genDiff(filepath1, filepath2, format) {
  const dataFile1 = readFile(filepath1)
  const dataFile2 = readFile(filepath2)
  const extension1 = getExtension(filepath1)
  const extension2 = getExtension(filepath2)

  const obj1 = parse(dataFile1, extension1)
  const obj2 = parse(dataFile2, extension2)

  const objWithDiff = generateDiff(obj1, obj2)

console.log('Тип objWithDiff:', typeof objWithDiff);
console.log('Является ли массивом:', Array.isArray(objWithDiff));
console.log('Объект:', objWithDiff);

  const result = makeFormat(objWithDiff, format)

  return result
}

const diffResult = genDiff('file1.json', 'file2.json', 'plain')
console.log(diffResult)

export default genDiff