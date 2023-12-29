import { MixpanelBack } from "@/services/mixpanelBack";
import { MontioringErrorTypes } from "@/types/monitoring/errors";
import * as crypto from "crypto";

export function decryptText(
  encryptedBase64: string,
  secretKey: string,
): string {
  const encryptedData = Buffer.from(encryptedBase64, "base64");
  const iv = encryptedData.slice(0, 16);
  const encryptedText = encryptedData.slice(16);
  const keyMaterial = crypto.createHash("sha256").update(secretKey).digest();

  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", keyMaterial, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (e) {
    MixpanelBack.getInstance().track(MontioringErrorTypes.DECRYPT_KEY_ERROR, {
      error: e,
    });
    return "FAIL";
  }
}

export function encryptText(text: string, secretKey: string): string {
  const iv = crypto.randomBytes(16); // Initialization vector
  const keyMaterial = crypto.createHash("sha256").update(secretKey).digest();

  try {
    const cipher = crypto.createCipheriv("aes-256-cbc", keyMaterial, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const encryptedData = Buffer.concat([iv, encrypted]); // Prepend the IV to the encrypted data
    return encryptedData.toString("base64");
  } catch (e) {
    MixpanelBack.getInstance().track(MontioringErrorTypes.ENCRYPT_KEY_ERROR, {
      error: e,
    });
    return "FAIL";
  }
}

export function hashText(text: string): Buffer {
  return crypto.createHash("sha256").update(text, "utf-8").digest();
}
