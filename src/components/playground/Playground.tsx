"use client";
import { useConversation } from "@/store/useCoversation";
import { Markdown } from "./MarkDown";
import { useEffect, useRef, useState } from "react";
import LoadingResponse from "../loading/LoadingResponse";

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
  }, [lastMessageId, lastMessage?.role, isUserTyping]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages.length, lastMessageId]);

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
                        className="bg-[#362d3d] p-4 rounded-xl w-fit ml-auto max-w-[80%]"
                        key={`${message.id}-${i}`}
                      >
                        {part.text}
                      </div>
                    );
                  default:
                    return null;
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
                          <>
                            <LoadingResponse />
                          </>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </>
          )}
        </div>
      ))}

      {isUserTyping && (
        <div className="w-11/12 max-w-[660px] flex gap-1 font-sans">
          <LoadingResponse />
        </div>
      )}

      <div
        ref={bottomRef}
        className={`min-h-[1px] ${isUserTyping ? "pb-36" : "pb-4"}`}
      />
    </div>
  );
};

export default Playground;
