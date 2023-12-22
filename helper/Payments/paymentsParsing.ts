export function splitNumber(value: number): [number, number] {
  const stringValue = value.toString();
  const middle = stringValue.length - 2;
  const firstPart = parseInt(stringValue.substring(0, middle));
  const secondPart = parseInt(stringValue.substring(middle));
  return [firstPart, secondPart];
}

export function extractFeatureData(htmlString: string): string[] {
  const parser = new DOMParser();

  // Parse the HTML string
  const doc = parser.parseFromString(htmlString, "text/html");

  // Extract the text content from each <li> element
  const listItems = Array.from(doc.querySelectorAll("li"));
  const extractedData = listItems.map((li) => li.textContent?.trim() || "");

  return extractedData;
}
