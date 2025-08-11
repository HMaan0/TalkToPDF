"use client";
import { useEffect } from "react";
import { useSubmit } from "@/hooks/useSubmit";
import { FaArrowUp } from "react-icons/fa";

const Button = () => {
  const { message, submit } = useSubmit();

  const hasValidMessage = message && message.trim().length > 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey && hasValidMessage) {
        e.preventDefault();
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasValidMessage, submit]);

  return (
    <button
      className={`h-full bg-[#a3004c]/20 p-3 border border-[#a3004c]/50 rounded-xl ${
        hasValidMessage
          ? "hover:cursor-pointer hover:bg-[#a3004c]/50 transition-colors duration-150"
          : "hover:cursor-not-allowed"
      }`}
      onClick={submit}
      title={hasValidMessage ? "Send message" : "Message requires text"}
      disabled={!hasValidMessage}
    >
      <FaArrowUp />
    </button>
  );
};

export default Button;
