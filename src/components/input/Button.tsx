"use client";
import { useSubmit } from "@/hooks/useSubmit";
import { FaArrowUp } from "react-icons/fa";

const Button = () => {
  const { message, submit } = useSubmit();
  console.log("rerender button");

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
