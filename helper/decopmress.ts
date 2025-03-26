const zlib = require("zlib");

export function decompressHex(hexString): string {
  const buffer = Buffer.from(hexString, "hex");
  let text = "";

  zlib.inflate(buffer, (err, decompressed) => {
    if (err) {
      console.error("Decompression failed: ", err);
      return text;
    }
    text = decompressed.toString();
  });
  return text;
}
