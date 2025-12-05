import formStylish from './stylish.js'
import formPlain from './plain.js'
import formJson from './json.js'

function makeFormat(tree, formatName = 'stylish') {
  switch (formatName) {
    case 'stylish':
      return formStylish(tree)
    case 'plain':
      return formPlain(tree)
    case 'json':
        return formJson(tree)
    default:
      throw new Error('Output format is not correct')
  }
}

export default makeFormat