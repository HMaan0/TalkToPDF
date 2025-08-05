import { openaiClient } from "./openaiClient";

export async function createEmbeddings(textChunks: string[]) {
  const embeddings = [];

  for (const chunk of textChunks) {
    try {
      const response = await openaiClient.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
      });

      embeddings.push({
        text: chunk,
        embedding: response.data[0].embedding,
      });
    } catch (error) {
      console.error("Error creating embedding:", error);
    }
  }

  return embeddings;
}
