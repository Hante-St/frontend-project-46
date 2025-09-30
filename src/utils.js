import fs from 'fs'
import path from 'path'
import parse from '../src/parser.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_DIR = path.resolve(__dirname, '..', '__fixtures__') 

function readFile(fileName) {
  if (path.isAbsolute(fileName)) {
    const fullPath = fileName;
    return fs.readFileSync(fullPath, 'utf-8');
  } else {
    const fullPath = path.resolve(BASE_DIR, fileName);
    return fs.readFileSync(fullPath, 'utf-8');
  }
}

function getExtension(filePath) {
  const ext = path.extname(filePath);
  return ext.startsWith('.') ? ext.slice(1) : ext;
}

function getContent(filePath) {
  const content = readFile(filePath);
  const ext = getExtension(filePath);
  return parse(content, ext);
}

function genDiff(filepath1, filepath2) {
  const obj1 = getContent(filepath1);
  const obj2 = getContent(filepath2);

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

export { readFile, genDiff, getContent }