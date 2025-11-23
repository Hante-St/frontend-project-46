import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_DIR = path.resolve(__dirname, '..', '__fixtures__')

function readFile(filePath) {
  try {
    const fullPath = path.resolve(BASE_DIR, filePath)
    return fs.readFileSync(fullPath, 'utf-8')
  } catch (error) {
    console.error(`Ошибка при чтении файла: ${filePath}`, error)
    throw error
  }
}

function getExtension(filename) {
  const result = filename.split('.')
  return result.at(-1)
}

export { readFile, getExtension }