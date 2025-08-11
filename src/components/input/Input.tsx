"use client";
import { useMessage } from "@/store/useMessage";
import { useEffect, useRef } from "react";

const Input = () => {
  const setMessage = useMessage((state) => state.setMessage);
  const message = useMessage((state) => state.message);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      const newHeight = Math.min(Math.max(textarea.scrollHeight, 24), 250);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e);
    setTimeout(adjustHeight, 0);
  };

  return (
    <textarea
      ref={textareaRef}
      placeholder="Ask anything..."
      className="font-sans w-full focus:outline-none placeholder:font-[600] resize-none overflow-y-auto min-h-[24px] max-h-[250px] leading-6
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-[#3b3237]"
      value={message || ""}
      onChange={handleChange}
      rows={2}
      style={{
        height: "24px",
      }}
    />
  );
};

export default Input;
