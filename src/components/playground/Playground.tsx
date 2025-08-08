"use client";
import { useConversation } from "@/store/useCoversation";
import { Markdown } from "./MarkDown";
import { useEffect, useRef, useState } from "react";

const Playground = () => {
  const messages = useConversation((state) => state.messages);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];
  const lastMessageId = lastMessage?.id;

  useEffect(() => {
    const shouldShowTyping = lastMessage && lastMessage.role === "user";
    if (shouldShowTyping !== isUserTyping) {
      setIsUserTyping(shouldShowTyping);
    }
  }, [lastMessageId, lastMessage?.role]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages.length]);

  return (
    <div className="w-full flex flex-col gap-14 items-center">
      {messages.map((message) => (
        <div
          key={message.id}
          className="w-11/12 max-w-[660px] flex flex-col font-sans"
        >
          {message.role === "user" ? (
            <>
              {/* User message */}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        className="bg-gray-700 p-4 rounded-xl w-fit ml-auto max-w-[80%]"
                        key={`${message.id}-${i}`}
                      >
                        {part.text}
                      </div>
                    );
                }
              })}
            </>
          ) : (
            <>
              {/* AI message */}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div className="pb-10" key={`${message.id}-${i}`}>
                        {part.text.length > 0 ? (
                          <Markdown>{part.text}</Markdown>
                        ) : (
                          <span className="text-gray-400 italic">
                            Thinking...
                          </span>
                        )}
                      </div>
                    );
                }
              })}
            </>
          )}
        </div>
      ))}

      <div
        ref={bottomRef}
        className={`min-h-[1px] ${isUserTyping ? "pb-36" : "pb-4"}`}
      />
    </div>
  );
};

export default Playground;
