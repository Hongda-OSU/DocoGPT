"use client";
import { useEffect, useRef } from "react";
import ChatUser from "../ChatUser/ChatUser";
import ChatBot from "../ChatBot/ChatBot";
import "./chat.css";

const Chat = ({ chatHistory }) => {
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
          <ChatUser key={index} message={message.text} />
        ) : (
          <ChatBot key={index} message={message.text} />
        )
      )}
    </div>
  );
};

export default Chat;
