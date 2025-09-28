import fs from 'fs'
import path from 'path'
import parse from '../src/parser.js'

function readFile(filePath) {
  const dirName = process.cwd(filePath);
  const fullPath = path.resolve(dirName, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

function getExtension(filename) {
  const result = filename.split('.');
  return result.at(-1);
}

function genDiff(filepath1, filepath2) {
  const obj1 = parse(filepath1)
  const obj2 = parse(filepath2)

  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort()

  const lines = []

for (const key of keys) {
    const hasKey1 = Object.prototype.hasOwnProperty.call(obj1, key)
    const hasKey2 = Object.prototype.hasOwnProperty.call(obj2, key)
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (hasKey1 && !hasKey2) {
      lines.push(`- ${key}: ${val1}`)
    } else if (!hasKey1 && hasKey2) {
      lines.push(`+ ${key}: ${val2}`)
    } else {
      if (val1 === val2) {
        lines.push(`  ${key}: ${val1}`)
      } else {
        lines.push(`- ${key}: ${val1}`)
        lines.push(`+ ${key}: ${val2}`)
      }
    }
  }
return `{\n${lines.join('\n')}\n}`
}

export { readFile, genDiff, getExtension }