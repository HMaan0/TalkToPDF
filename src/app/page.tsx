"use client";

import Drop from "@/components/drop/Drop";
import Input from "@/components/input/Input";
import Playground from "@/components/playground/Playground";
import { useDrag } from "@/hooks/useDrag";

export default function Home() {
  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDrag();

  return (
    <main
      className="w-full h-screen"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && <Drop />}
      <section className="w-full h-full bg-gray-900">
        <Playground />
      </section>
      <section className="absolute bottom-0 flex justify-center w-full px-4">
        <Input />
      </section>
    </main>
  );
}
