export function chunkText(text: string, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  const words = text.split(" ");

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim().length > 0) {
      chunks.push(chunk.trim());
    }
  }

  return chunks;
}
