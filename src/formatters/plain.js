function formPlain(diffArray, path = '') {
    
  const sortedDiff = [...diffArray].sort((a, b) => a.key.localeCompare(b.key))
   const lines = []

  const formatValue = (value) => {
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'
    if (typeof value === 'boolean') return value.toString()
    if (typeof value === 'string') return `'${value}'`
    if (Array.isArray(value) || (typeof value === 'object' && value !== null))
      return '[complex value]'
    return value.toString()
  }

  for (const item of sortedDiff) {
    const propertyPath = path ? `${path}.${item.key}` : item.key

    const isComplexChange = ['added', 'removed', 'changed']
      .includes(item.status) && (
        (typeof item.value === 'object' && item.value !== null) ||
        (typeof item.newValue === 'object' && item.newValue !== null)
      )

    switch (item.status) {
      case 'added':
        if (isComplexChange && item.newValue && typeof item.newValue === 'object') {
          lines.push(`Property '${propertyPath}' was added with value: [complex value]`)
        } else {
          lines.push(`Property '${propertyPath}' was added with value: ${formatValue(item.newValue)}`)
        }
        break

      case 'removed':
        if (isComplexChange && item.value && typeof item.value === 'object') {
          lines.push(`Property '${propertyPath}' was removed`)
        } else {
          lines.push(`Property '${propertyPath}' was removed`)
        }
        break

      case 'changed':
        if (isComplexChange && item.value && typeof item.value === 'object' && item.newValue && typeof item.newValue === 'object') {
         
          const oldEntries = Object.entries(item.value)
          const newEntries = Object.entries(item.newValue)
          
          const newMap = Object.fromEntries(newEntries)
          
          for (const [k, v] of oldEntries) {
            const newVal = newMap[k]
            const nestedPath = `${propertyPath}.${k}`
            if (newVal !== undefined) {
              if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                lines.push(`Property '${nestedPath}' was updated. From ${formatValue(v)} to ${formatValue(newVal)}`)
              } else {
                lines.push(`Property '${nestedPath}' was updated. From ${formatValue(v)} to ${formatValue(newVal)}`)
              }
            } else {
              lines.push(`Property '${nestedPath}' was removed`)
            }
          }
          
          for (const [k, v] of newEntries) {
            if (!Object.prototype.hasOwnProperty.call(item.value, k)) {
              const nestedPath = `${propertyPath}.${k}`
              lines.push(`Property '${nestedPath}' was added with value: ${formatValue(v)}`)
            }
          }
        } else {
          lines.push(`Property '${propertyPath}' was updated. From ${formatValue(item.value)} to ${formatValue(item.newValue)}`)
        }
        break

      case 'unchanged':
        break
    }
  }

  return lines.join('\n')
}

export default formPlain