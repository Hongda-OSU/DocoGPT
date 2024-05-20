"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Modal from "@/components/modal/Modal";
import ChatHistory from "@/components/chat-history/ChatHistory";
import InputArea from "@/components/input-area/InputArea";
import styles from "./home.module.css";


export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension === "pdf") {
        if (uploadedFile) {
          setErrorMessage("You can only upload one file at a time.");
          setIsModalOpen(true);
        } else {
          setUploadedFile(file.name);
        }
      } else {
        setErrorMessage("Only PDF format supported.");
        setIsModalOpen(true);
      }
    }
    e.target.value = null;
  };

  const handleSendMessage = (message) => {
    setChatHistory((history) => [...history, { type: "user", text: message }]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { type: "bot", text: "This is a predefined response from DocoGPT." },
      ]);
    }, 1000);
  };

  const onModalClose = () => {
    setErrorMessage("");
    setIsModalOpen(false);
  };

  return (
    <main className={styles.container}>
      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        errorMessage={errorMessage}
      />
      <div className={styles["doco-gpt"]}>
        <Sidebar
          uploadFile={uploadFile}
          deleteFile={() => setUploadedFile(null)}
          uploadedFile={uploadedFile}
        />
        <section className={styles["chat-wrapper"]}>
          <ChatHistory chatHistory={chatHistory} />
          <InputArea onSendMessage={handleSendMessage} />
        </section>
      </div>
    </main>
  );
}
