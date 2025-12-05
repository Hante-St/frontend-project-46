function formJson(item) {
  if (Array.isArray(item)) {
    return item.map(element => formJson(element))
  } else if (item !== null && typeof item === 'object') {
    const result = {}
    for (const key in item) {
      if (Object.hasOwnProperty.call(item, key)) {
        result[key] = formJson(item[key])
      }
    }
    return result
  }
  return item
}


export default formJson