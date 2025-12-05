function formPlain(diffArray, path = '') {
  const sortedDiff = [...diffArray].sort((a, b) => a.key.localeCompare(b.key))
  const lines = []

  const normalize = (val) => (typeof val === 'string' ? val.trim() : val)
  const isEqual = (a, b) => {
  const aNorm = normalize(a)
  const bNorm = normalize(b)
  return aNorm === bNorm
}

  const formatValue = (value) => {
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'
    if (typeof value === 'boolean') return value.toString()
    if (typeof value === 'string') return `'${value}'`
    if (Array.isArray(value) || (typeof value === 'object' && value !== null))
      return '[complex value]'
    return value.toString()
  };

  for (const item of sortedDiff) {
    const propertyPath = path ? `${path}.${item.key}` : item.key

    const valueVal = item.value
    const newVal = item.newValue

    const isComplexObject =
      (typeof valueVal === 'object' && valueVal !== null) ||
      (typeof newVal === 'object' && newVal !== null)

    const valuesAreEqual = isEqual(valueVal, newVal)

    switch (item.status) {
      case 'added':
        if (isComplexObject) {
          lines.push(`Property '${propertyPath}' was added with value: [complex value]`)
        } else {
          lines.push(`Property '${propertyPath}' was added with value: ${formatValue(newVal)}`)
        }
        break

      case 'removed':
        lines.push(`Property '${propertyPath}' was removed`)
        break

      case 'changed':
        if (valuesAreEqual) {
        } else {
          if (
            typeof valueVal === 'object' && valueVal !== null &&
            typeof newVal === 'object' && newVal !== null
          ) {
            const oldEntries = Object.entries(valueVal)
            const newEntries = Object.entries(newVal)
            const newMap = Object.fromEntries(newEntries)

            for (const [k, v] of oldEntries) {
              const newV = newMap[k]
              const nestedPath = `${propertyPath}.${k}`

              if (newV !== undefined) {
                lines.push(`Property '${nestedPath}' was updated. From ${formatValue(v)} to ${formatValue(newV)}`)
              } else {
                lines.push(`Property '${nestedPath}' was removed`)
              }
            }

            for (const [k, v] of newEntries) {
              if (!Object.prototype.hasOwnProperty.call(valueVal, k)) {
                const nestedPath = `${propertyPath}.${k}`
                lines.push(`Property '${nestedPath}' was added with value: ${formatValue(v)}`)
              }
            }
          } else {
            lines.push(`Property '${propertyPath}' was updated. From ${formatValue(valueVal)} to ${formatValue(newVal)}`);
          }
        }
        break

      case 'unchanged':
        break
    }
  }

  return lines.join('\n')
}

export default formPlain