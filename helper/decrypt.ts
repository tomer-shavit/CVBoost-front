import * as crypto from "crypto";

export function decryptText(
  encryptedBase64: string,
  secretKey: string,
): string {
  // Convert the base64 string to a buffer
  const encryptedData = Buffer.from(encryptedBase64, "base64");

  // Extract the IV (first 16 bytes)
  const iv = encryptedData.slice(0, 16);

  // Extract the encrypted text
  const encryptedText = encryptedData.slice(16);

  // Create a SHA-256 hash of the secret key
  const keyMaterial = crypto.createHash("sha256").update(secretKey).digest();

  // Decrypt the text
  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", keyMaterial, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (e) {
    console.error("Decryption failed", e);
    return "FAIL";
  }
}
