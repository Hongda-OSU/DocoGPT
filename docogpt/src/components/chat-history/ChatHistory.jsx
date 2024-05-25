"use client";
import { useEffect, useRef } from "react";
import UserMessage from "../user-message/UserMessage";
import BotMessage from "../bot-message/BotMessage";
import "./chat-history.css";

const ChatHistory = ({ chatHistory }) => {
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chat-history" ref={chatHistoryRef}>
      {chatHistory.map((message, index) =>
        message.type === "user" ? (
          <UserMessage key={index} message={message.text} />
        ) : (
          <BotMessage key={index} message={message.text} />
        )
      )}
    </div>
  );
};

export default ChatHistory;
