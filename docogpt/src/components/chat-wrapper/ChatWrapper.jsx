"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import ChatHistory from "../chat-history/ChatHistory";
import "./chat-wrapper.css";

const InputArea = dynamic(() => import("@/components/input-area/InputArea"), {
  ssr: false,
});

const ChatWrapper = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = (message) => {
    setChatHistory((history) => [...history, { type: "user", text: message }]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { type: "bot", text: "This is a predefined response from DocoGPT." },
      ]);
    }, 1000);
  };

  return (
    <section className="chat-wrapper">
      <ChatHistory chatHistory={chatHistory} />
      <InputArea onSendMessage={handleSendMessage} />
    </section>
  );
};

export default ChatWrapper;
