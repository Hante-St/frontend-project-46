
function formStylish(diffArray, depth = 1) {
  const indentSize = 4
  const currentIndent = ' '.repeat(indentSize * depth)

  const formatValue = (value, depthLevel) => {
    if (typeof value !== 'object' || value === null) {
      return String(value)
    }

    const lines = Object.entries(value).map(
      ([key, val]) => `${' '.repeat(indentSize * (depthLevel))}${key}: ${formatValue(val, depthLevel + 1)}`
    )
    return `{\n${lines.join('\n')}\n${' '.repeat(indentSize * (depthLevel - 1))}}`
  };

  const lines = diffArray.flatMap(item => {
    const { key, status, value, newValue } = item

    switch (status) {
      case 'added':
        if (typeof newValue === 'object' && newValue !== null) {
          return [`+ ${key}: ${formatValue(newValue, depth + 1)}`]
        }
        return [`+ ${key}: ${newValue}`]

      case 'removed':
        if (typeof value === 'object' && value !== null) {
          return [`- ${key}: ${formatValue(value, depth + 1)}`]
        }
        return [`- ${key}: ${value}`]

      case 'unchanged':
        if (typeof value === 'object' && value !== null) {
          return [`  ${key}: ${formatValue(value, depth + 1)}`]
        }
        return [`  ${key}: ${value}`]

      case 'changed':
        const linesChanged = []
        if (typeof value === 'object' && value !== null) {
          linesChanged.push(`- ${key}: ${formatValue(value, depth + 1)}`)
        } else {
          linesChanged.push(`- ${key}: ${value}`)
        }

        if (typeof newValue === 'object' && newValue !== null) {
          linesChanged.push(`+ ${key}: ${formatValue(newValue, depth + 1)}`)
        } else {
          linesChanged.push(`+ ${key}: ${newValue}`)
        }
        return linesChanged

      default:
        return []
    }
  })

  return `{\n${lines.join('\n')}\n${' '.repeat(indentSize * (depth - 1))}}`
}

export default formStylish