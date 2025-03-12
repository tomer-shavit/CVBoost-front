/**
 * Checks if a form submission is likely from a bot based on honeypot fields
 * @param formData The form data to check
 * @param honeypotFieldName The name of the honeypot field
 * @returns true if the submission is likely from a bot, false otherwise
 */
export function isHoneypotTriggered(
  formData: FormData | Record<string, any>,
  honeypotFieldName: string = "honeypot",
): boolean {
  // For FormData objects
  if (formData instanceof FormData) {
    const honeypotValue = formData.get(honeypotFieldName);
    return honeypotValue !== null && honeypotValue !== "";
  }

  // For plain objects (like JSON)
  if (typeof formData === "object" && formData !== null) {
    return (
      honeypotFieldName in formData &&
      formData[honeypotFieldName] !== null &&
      formData[honeypotFieldName] !== ""
    );
  }

  return false;
}

/**
 * Removes the honeypot field from form data
 * @param formData The form data to clean
 * @param honeypotFieldName The name of the honeypot field
 * @returns The cleaned form data
 */
export function cleanHoneypotField(
  formData: FormData,
  honeypotFieldName: string = "honeypot",
): FormData {
  const cleanedFormData = new FormData();

  // Copy all fields except the honeypot
  // Using Array.from to avoid iteration issues
  Array.from(formData.entries()).forEach(([key, value]) => {
    if (key !== honeypotFieldName) {
      cleanedFormData.append(key, value);
    }
  });

  return cleanedFormData;
}
