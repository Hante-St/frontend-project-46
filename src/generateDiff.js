import has from 'lodash/has.js'

function generateDiff(obj1, obj2) {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort()

  const result = keys.map(key => {
    const hasKey1 = has(obj1, key)
    const hasKey2 = has(obj2, key)
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (hasKey1 && !hasKey2) {
      return { key, status: 'removed', value: val1 }
    }
    if (!hasKey1 && hasKey2) {
      return { key, status: 'added', value: val2 }
    }
    if (hasKey1 && hasKey2 && val1 === val2) {
      return { key, status: 'unchanged', value: val1 }
    }
    if (hasKey1 && hasKey2 && val1 !== val2) {
      return { key, status: 'changed', value: val1, newValue: val2 }
    }
    return null
  })
  
  return result
}

export default generateDiff