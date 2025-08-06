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
      className="w-full min-h-screen h-full overflow-auto flex flex-col"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && <Drop />}
      <section className="flex justify-center w-full h-full bg-gray-900 pt-15 pb-10">
        <Playground />
      </section>
      <section className="sticky bottom-0 flex justify-center w-full px-4 bg-gray-900  z-40">
        <InputBox />
      </section>
    </main>
  );
}
