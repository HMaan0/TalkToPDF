"use server";
import { QdrantClient } from "@qdrant/js-client-rest";
const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

const client = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
});

export async function ensureCollection(name: string, vectorSize: number) {
  await client.createCollection(name, {
    vectors: { size: vectorSize, distance: "Cosine" },
  });
}

export async function uploadEmbeddings(
  collection: string,
  chunks: {
    id: number;
    text: string;
    embedding: { text: string; embedding: number[] };
  }[]
) {
  const points = chunks.map((chunk) => ({
    id: chunk.id,
    vector: chunk.embedding.embedding,
    payload: { text: chunk.text },
  }));

  await client.upsert(collection, {
    points: points,
  });
}

export async function getEmbeddings(collection: string) {
  const response = await client.scroll(collection, {
    with_payload: true,
    with_vector: true,
  });
  return response.points.map((point: any) => ({
    id: point.id,
    vector: point.vector,
    text: point.payload?.text || "",
  }));
}

export async function deleteCollection(name: string) {
  await client.deleteCollection(name);
}
