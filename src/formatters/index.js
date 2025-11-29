import formStylish from './stylish.js'
import formPlain from './plain.js'

function makeFormat(tree, formatName = 'stylish') {
  switch (formatName) {
    case 'stylish':
      return formStylish(tree)
    case 'plain':
      return formPlain(tree)
    default:
      throw new Error('Output format is not correct')
  }
}

export default makeFormat