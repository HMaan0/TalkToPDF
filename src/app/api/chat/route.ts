import { createEmbeddings } from "@/lib/createEmbeddings";
import { getEmbeddings } from "@/lib/vectorDB";
import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  cosineSimilarity,
} from "ai";

type PdfEmbedding = {
  id: number;
  text: string;
  vector: number[];
}[];

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const pdfEmbedding: PdfEmbedding = await getEmbeddings("pdf_chunks");

  const prompts = messages
    .filter((message) => message.role === "user")
    .flatMap((message) =>
      message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
    );
  const lastMessage = prompts[prompts.length - 1];
  const messageEmbeddings = await createEmbeddings([lastMessage]);

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
    return new Response(
      "I couldn't find relevant information in the PDF to answer your question."
    );
  }

  const context = relevantChunks
    .map((chunk: { text: string }) => chunk.text)
    .join("\n\n");

  const modelMessages = convertToModelMessages(messages);

  const enhancedMessages = [
    {
      role: "system" as const,
      content: `You are a helpful assistant that answers questions based on the provided PDF content.
                Use only the information from the context provided. If the answer is not in the context, say so clearly.
                Give the full response in valid GitHub-flavored Markdown with:
                  - Proper blank lines between paragraphs and lists
                  - Correct list syntax 
                  - use heading 

                Context from PDF:
                ${context}`,
    },
    ...modelMessages,
  ];

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: enhancedMessages,
  });

  return result.toUIMessageStreamResponse();
}
