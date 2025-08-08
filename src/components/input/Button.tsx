"use client";
import { useEffect } from "react";
import { useSubmit } from "@/hooks/useSubmit";
import { FaArrowUp } from "react-icons/fa";

const Button = () => {
  const { message, submit } = useSubmit();

  // Listen for Enter key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && message) {
        e.preventDefault();
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [message, submit]);

  return (
    <button
      className={`h-full p-3 border border-gray-500 rounded-2xl ${
        message ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
      }`}
      onClick={submit}
      title={message ? "Send message" : "Message requires text"}
      disabled={!message}
    >
      <FaArrowUp />
    </button>
  );
};

export default Button;
