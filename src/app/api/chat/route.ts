import { createEmbeddings } from "@/lib/createEmbeddings";
import { getEmbeddings } from "@/lib/vectorDB";
import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  cosineSimilarity,
} from "ai";

type PdfEmbedding =
  | {
      id: number;
      text: string;
      vector: number[];
    }[]
  | null;

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    let pdfEmbedding: PdfEmbedding = null;
    let context: string | null = null;

    try {
      pdfEmbedding = await getEmbeddings("pdf_chunks");
    } catch (err) {
      console.warn("No PDF embeddings found or failed to fetch:", err);
      pdfEmbedding = null;
    }

    const prompts = messages
      .filter((message) => message.role === "user")
      .flatMap((message) =>
        message.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
      );

    const lastMessage = prompts[prompts.length - 1];

    let messageEmbeddings: { embedding: number[] }[] = [];
    try {
      messageEmbeddings = await createEmbeddings([lastMessage]);
    } catch (err) {
      console.warn("Failed to create message embeddings:", err);
    }

    if (pdfEmbedding && messageEmbeddings.length > 0) {
      const similarities = pdfEmbedding.map((chunk) => ({
        text: chunk.text,
        similarity: cosineSimilarity(
          messageEmbeddings[0].embedding,
          chunk.vector
        ),
      }));

      const relevantChunks = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3);

      if (relevantChunks.length > 0) {
        context = relevantChunks.map((chunk) => chunk.text).join("\n\n");
      }
    }

    const modelMessages = convertToModelMessages(messages);

    const enhancedMessages = [
      {
        role: "system" as const,
        content: `You are a helpful and friendly chat with PDF assistant that answers questions based on the provided PDF content.
                  Use only the information from the PDF provided. If the answer is not in the context, say so clearly.
                  About application:
                  user can drag and drop one pdf (only pdf file are supported for now) at a time (only with 100 pages) and get answers from the pdf
                  application works just any other talk to pdf application using vector database, next js and open ai.

                  This application is open source link is: https://github.com/hmaan0/TalkToPDF

                  DO's
                  Give the full response in valid GitHub-flavored Markdown with:
                  - Proper blank lines between paragraphs and lists
                  - Correct list syntax
                  - Use headings

                  DON'Ts
                  - Do not use --- for your response
${
  context
    ? `Context from PDF:\n${context}`
    : "No PDF available. If user ask anything specific say PDF is not provided"
}
        `,
      },
      ...modelMessages,
    ];

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: enhancedMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("POST request failed:", error);
    return new Response("An error occurred while processing your request.", {
      status: 500,
    });
  }
}
