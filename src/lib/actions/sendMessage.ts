"use server";
import { cosineSimilarity } from "../cosineSimilarity";
import { createEmbeddings } from "../createEmbeddings";
import { openaiClient } from "../openaiClient";
import { getEmbeddings } from "../vectorDB";

type PdfEmbedding = {
  id: number;
  text: string;
  vector: number[];
}[];

export async function sendMessage(message: string) {
  const pdfEmbedding: PdfEmbedding = await getEmbeddings("pdf_chunks");
  const messageEmbeddings = await createEmbeddings([message]);
  const similarities = pdfEmbedding.map((chunk) => ({
    text: chunk.text,
    similarity: cosineSimilarity(messageEmbeddings[0].embedding, chunk.vector),
  }));
  const relevantChunks = similarities
    .sort(
      (a: { similarity: number }, b: { similarity: number }) =>
        b.similarity - a.similarity
    )
    .slice(0, 3);

  if (relevantChunks.length === 0) {
    return "I couldn't find relevant information in the PDF to answer your question.";
  }

  const context = relevantChunks
    .map((chunk: { text: string }) => chunk.text)
    .join("\n\n");

  const completion = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that answers questions based on the provided PDF content. 
                   Use only the information from the context provided. If the answer is not in the context, 
                   say so clearly. Be concise and accurate.`,
      },
      {
        role: "user",
        content: `Context from PDF:\n${context}\n\nQuestion: ${message}`,
      },
    ],
    max_tokens: 500,
    temperature: 0.1,
  });

  const answer = completion.choices[0].message.content;

  return answer
    ? answer
    : "I couldn't able find a response this time. Please try again later!";
}
