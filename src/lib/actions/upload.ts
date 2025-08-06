"use server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import os from "os";
import path from "path";
import { chunkText } from "../chunkText";
import { createEmbeddings } from "../createEmbeddings";
import { ensureCollection, uploadEmbeddings } from "../vectorDB";

export async function upload(formData: FormData) {
  try {
    const uploadedFiles = formData.getAll("file");
    let fileName = "";
    let parsedText = "";
    if (uploadedFiles && uploadedFiles.length > 0) {
      const uploadedFile = uploadedFiles[0];

      if (uploadedFile instanceof File) {
        fileName = uuidv4();

        const tempDir = os.tmpdir();
        const tempFilePath = path.join(tempDir, `${fileName}.pdf`);

        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
        await fs.writeFile(tempFilePath, fileBuffer);
        const pdfParser = new (PDFParser as any)(null, 1);

        pdfParser.on(
          "pdfParser_dataError",
          (errData: { parserError: string }) =>
            console.error(errData.parserError)
        );

        pdfParser.on("pdfParser_dataReady", () => {
          parsedText = pdfParser.getRawTextContent();
        });

        await new Promise((resolve, reject) => {
          pdfParser.loadPDF(tempFilePath);
          pdfParser.on("pdfParser_dataReady", resolve);
          pdfParser.on("pdfParser_dataError", reject);
        });

        const textChunks = chunkText(parsedText);
        const chunks = await createEmbeddings(textChunks);

        await ensureCollection("pdf_chunks", 1536);

        const points = chunks.map((embedding, idx) => ({
          id: idx + 1,
          text: textChunks[idx],
          embedding,
        }));
        await uploadEmbeddings("pdf_chunks", points);
      }
    }
  } catch (error) {
    console.error("Error uploading PDF", error);
  }
}
