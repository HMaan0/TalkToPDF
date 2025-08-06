import { upload } from "@/lib/actions/upload";
import { useState } from "react";

interface UseDragReturn {
  isDragging: boolean;
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
}

export function useDrag(): UseDragReturn {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragEnter = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const hasPDF: boolean = Array.from(e.dataTransfer.items).some(
        (item: DataTransferItem) => item.type === "application/pdf"
      );

      if (hasPDF) {
        setIsDragging(true);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    // Type assertion needed because relatedTarget can be null
    const relatedTarget = e.relatedTarget as Node | null;

    if (relatedTarget && e.currentTarget.contains(relatedTarget)) {
      return;
    }

    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files: File[] = Array.from(e.dataTransfer.files);
    const pdfFiles: File[] = files.filter(
      (file: File) => file.type === "application/pdf"
    );

    if (pdfFiles.length > 0) {
      "PDF files dropped:", pdfFiles;
      const formData = new FormData();
      formData.append("file", pdfFiles[0]);
      await upload(formData);
    }
  };

  return {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
}
