export function splitNumber(value: number): [number, number] {
  const stringValue = value.toString();
  const middle = stringValue.length - 2;
  const firstPart = parseInt(stringValue.substring(0, middle));
  const secondPart = parseInt(stringValue.substring(middle));
  return [firstPart, secondPart];
}
