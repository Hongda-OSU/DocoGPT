import { chat } from "./api";
import { useState } from "react";
import axios from "axios";

export const useChat = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (message) => {
    setChatHistory((history) => [...history, { type: "user", text: message }]);

    const tempBotMessage = { type: "bot", text: "", isLoading: true };
    setChatHistory((history) => [...history, tempBotMessage]);

    try {
      const response = await axios.post(
        chat,
        { query: message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const messages = response.data.data;
      const answer = messages[messages.length - 1];

      setChatHistory((history) => {
        const updatedHistory = [...history];
        updatedHistory[updatedHistory.length - 1] = {
          type: "bot",
          text: answer,
          isLoading: false,
        };
        return updatedHistory;
      });
    } catch (error) {
      setChatHistory((history) => {
        const updatedHistory = [...history];
        updatedHistory[updatedHistory.length - 1] = {
          type: "bot",
          text: "Failed to get response from DocoGPT.",
        };
        return updatedHistory;
      });
    }
  };

  return {
    chatHistory,
    handleSendMessage,
  };
};
