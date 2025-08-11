"use client";

import Drop from "@/components/drop/Drop";
import GitHub from "@/components/GitHub";
import InputBox from "@/components/input/InputBox";
import LandingText from "@/components/LandingText";
import Playground from "@/components/playground/Playground";
import ScrollToBottom from "@/components/ScrollToBottom";
import { useDrag } from "@/hooks/useDrag";
import { useConversation } from "@/store/useCoversation";

export default function Home() {
  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDrag();
  const messages = useConversation((state) => state.messages);
  return (
    <main
      className="relative  w-full min-h-screen h-full overflow-auto flex flex-col"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <GitHub />
      {isDragging && <Drop />}
      <section className="flex items-center w-full h-full  pt-15  mb-28  flex-col">
        {messages.length > 0 ? <Playground /> : <LandingText />}
      </section>
      <ScrollToBottom />
      <section className="fixed bottom-0 flex justify-center w-full px-4   z-40">
        <InputBox />
      </section>
    </main>
  );
}
