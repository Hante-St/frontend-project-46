import yaml from 'js-yaml'

function parse(data, format) {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`Not correct format file ${data}`)
  }
}

export default parse