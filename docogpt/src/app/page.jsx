"use client";
import { useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar/Sidebar";
import ErrorModal from "@/components/ErrorModal/ErrorModal";
import ChatHistory from "@/components/chat-history/ChatHistory";
import InputArea from "@/components/input-area/InputArea";
import styles from "./home.module.css";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension === "pdf") {
        if (uploadedFile) {
          setErrorMessage("You can only upload one file at a time.");
          setIsModalOpen(true);
        } else {
          const formData = new FormData();
          formData.append("file", file);
          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/uploadfile/",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setUploadedFile(response.data.filename);
          } catch (error) {
            setErrorMessage("Failed to upload file.");
            setIsModalOpen(true);
          }
        }
      } else {
        setErrorMessage("Only PDF format supported.");
        setIsModalOpen(true);
      }
    }
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

  const onModalClose = () => {
    setErrorMessage("");
    setIsModalOpen(false);
  };

  return (
    <main className={styles["doco-container"]}>
      <ErrorModal
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
