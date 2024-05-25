"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Sidebar from "@/components/Sidebar/Sidebar";
import Modal from "@/components/Modal/Modal";
import Chat from "@/components/Chat/Chat";
import Input from "@/components/Input/Input";
import useFileUpload from "@/helpers/useFileUpload";
import styles from "./home.module.css";

const Loading = dynamic(() => import("@/components/loading/Loading"), {
  ssr: false,
});

export default function Home() {
  const {
    uploadedFile,
    loading,
    modalMessage,
    isModalOpen,
    uploadFile,
    deleteFile,
    resetModal,
  } = useFileUpload();

  const [chatHistory, setChatHistory] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    uploadFile(file);
    e.target.value = null;
  };

  const handleSendMessage = async (message) => {
    setChatHistory((history) => [...history, { type: "user", text: message }]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat/",
        { query: message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const messages = response.data.data;
      const answer = messages[messages.length - 1];

      setChatHistory((history) => [...history, { type: "bot", text: answer }]);
    } catch (error) {
      console.error("Error while fetching response from DocoGPT:", error);
      setChatHistory((history) => [
        ...history,
        { type: "bot", text: "Failed to get response from DocoGPT." },
      ]);
    }
  };

  return (
    <main className={styles["doco-container"]}>
      {isModalOpen && (
        <Modal onClose={resetModal} modalMessage={modalMessage} />
      )}
      {loading && <Loading />}
      <div className={styles["doco-gpt"]}>
        <Sidebar
          uploadFile={handleFileUpload}
          deleteFile={deleteFile}
          uploadedFile={uploadedFile}
        />
        <section className={styles["chat-wrapper"]}>
          <Chat chatHistory={chatHistory} />
          <Input onSendMessage={handleSendMessage} />
        </section>
      </div>
    </main>
  );
}
