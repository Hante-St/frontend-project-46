import has from 'lodash/has.js'

function generateDiff(obj1, obj2) {

  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();

  const lines = keys.flatMap(key => {
    const hasKey1 = has(obj1, key);
    const hasKey2 = has(obj2, key);
    const val1 = obj1[key];
    const val2 = obj2[key];

    const cases = [
      {
        condition: hasKey1 && !hasKey2,
        result: `- ${key}: ${val1}`,
      },
      {
        condition: !hasKey1 && hasKey2,
        result: `+ ${key}: ${val2}`,
      },
      {
        condition: hasKey1 && hasKey2 && val1 === val2,
        result: `  ${key}: ${val1}`,
      },
      {
        condition: hasKey1 && hasKey2 && val1 !== val2,
        result: [`- ${key}: ${val1}`, `+ ${key}: ${val2}`],
      },
    ];

    const matchedCases = cases.filter(c => c.condition);
    return matchedCases.flatMap(c => (Array.isArray(c.result) ? c.result : [c.result]))
  });

  const diffString = `{\n${lines.join('\n')}\n}`;

  return diffString;
}

export default generateDiff