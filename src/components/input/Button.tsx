"use client";
import { useAnswer } from "@/hooks/useAnswer";
import { useMessage } from "@/hooks/useMessage";
import { sendMessage } from "@/lib/actions/sendMessage";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

const Button = () => {
  const message = useMessage((state) => state.message);
  const setAnswer = useAnswer((state) => state.setAnswer);
  async function submit() {
    if (message) {
      const answer = await sendMessage(message);
      setAnswer(answer);
    }
  }
  return (
    <button
      className={`h-full p-3  border border-gray-500 rounded-2xl ${
        message ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
      }`}
      onClick={submit}
      title={`${message ? "send message" : "Message requires text"}`}
      disabled={message ? false : true}
    >
      <FaArrowUp />
    </button>
  );
};

export default Button;
