"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Modal from "@/components/modal/Modal";
import ChatWrapper from "@/components/chat-wrapper/ChatWrapper";
import styles from "./home.module.css";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null);
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

  const deleteFile = () => {
    setUploadedFile(null);
  };

  const onModalClose = () => {
    setErrorMessage("");
    setIsModalOpen(false);
  };

  return (
    <main id={styles["doco-gpt"]}>
      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        errorMessage={errorMessage}
      />
      <div id={styles.wrapper}>
        <Sidebar
          uploadFile={uploadFile}
          deleteFile={deleteFile}
          uploadedFile={uploadedFile}
        />
        <ChatWrapper />
      </div>
    </main>
  );
}
