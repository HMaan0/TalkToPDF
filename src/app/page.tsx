"use client";

import Drop from "@/components/drop/Drop";
import InputBox from "@/components/input/InputBox";
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
      className="relative  w-full min-h-screen h-full overflow-auto flex flex-col"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && <Drop />}
      <section className="flex items-center w-full h-full  pt-15  mb-28  flex-col">
        <Playground />
      </section>
      <section className="fixed bottom-0 flex justify-center w-full px-4   z-40">
        <InputBox />
      </section>
    </main>
  );
}
