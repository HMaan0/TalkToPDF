import axios from "axios";

const QDRANT_URL = "http://localhost:6333";

export async function ensureCollection(name: string, vectorSize: number) {
  await axios.put(`${QDRANT_URL}/collections/${name}`, {
    vectors: {
      size: vectorSize,
      distance: "Cosine",
    },
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

  await axios.put(`${QDRANT_URL}/collections/${collection}/points`, {
    points,
  });
}

export async function getEmbeddings(collection: string) {
  const response = await axios.post(
    `${QDRANT_URL}/collections/${collection}/points/scroll`,
    {
      with_vector: true,
      with_payload: true,
    }
  );
  return response.data.result.points.map((point: any) => ({
    id: point.id,
    vector: point.vector,
    text: point.payload?.text || "",
  }));
}
