const formatValue = (value) => {
  if (value === null) return "null"
  if (value === undefined) return "[complex value]"
  if (typeof value === "boolean") return value.toString()
  if (typeof value === "string") return `'${value}'`
  if (Array.isArray(value) || (typeof value === "object" && value !== null))
    return "[complex value]"
  return value.toString()
};
function formPlain(diffArray, path = "") {
  const lines = [];

  const newLines = diffArray.flatMap((item) => { 
    const propertyPath = path ? `${path}.${item.key}` : item.key;

    const isComplexChange =
      ["added", "removed", "changed"].includes(item.status) &&
      ((typeof item.value === "object" && item.value !== null) ||
        (typeof item.newValue === "object" && item.newValue !== null));

    switch (item.status) {
      case "added":
        if (isComplexChange && item.newValue && typeof item.newValue === "object") {
          return [`Property '${propertyPath}' was added with value: [complex value]`];
        } else {
          return [`Property '${propertyPath}' was added with value: ${formatValue(item.newValue)}`];
        }

      case "removed":
        return [`Property '${propertyPath}' was removed`];

      case "changed":
        if (
          isComplexChange &&
          item.value &&
          typeof item.value === "object" &&
          item.newValue &&
          typeof item.newValue === "object"
        ) {
          const oldEntries = Object.entries(item.value);
          const newEntries = Object.entries(item.newValue);
          const newMap = Object.fromEntries(newEntries);
          const linesArr = [];

          for (const [k, v] of oldEntries) {
            const newVal = newMap[k];
            const nestedPath = `${propertyPath}.${k}`;
            if (newVal !== undefined) {
              // Обновление
              linesArr.push(
                `Property '${nestedPath}' was updated. From ${formatValue(v)} to ${formatValue(newVal)}`
              );
            } else {
              // Значение удалено
              linesArr.push(`Property '${nestedPath}' was removed`);
            }
          }

          for (const [k, v] of newEntries) {
            if (!Object.prototype.hasOwnProperty.call(item.value, k)) {
              const nestedPath = `${propertyPath}.${k}`;
              linesArr.push(`Property '${nestedPath}' was added with value: ${formatValue(v)}`);
            }
          }

          return linesArr;
        } else {
          // Простое обновление
          return [
            `Property '${propertyPath}' was updated. From ${formatValue(
              item.value
            )} to ${formatValue(item.newValue)}`
          ];
        }

      case "unchanged":
        return []; // ничего не добавляем
      default:
        return [];
    }
  });
  lines.push(...newLines);
  return lines.join('\n');
}

export default formPlain
