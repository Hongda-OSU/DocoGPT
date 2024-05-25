"use client";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar/Sidebar";
import Modal from "@/components/Modal/Modal";
import Chat from "@/components/Chat/Chat";
import Input from "@/components/Input/Input";
import useFileUpload from "@/helpers/useFileUpload";
import useInstructionModal from "@/helpers/useInstructionModal";
import { useChat } from "@/helpers/useChat";
import styles from "./home.module.css";

const Loading = dynamic(() => import("@/components/loading/Loading"), {
  ssr: false,
});

export default function Home() {
  const {
    uploadedFile,
    loading,
    modalMessage: fileUploadModalMessage,
    isModalOpen: isFileUploadModalOpen,
    closeModal: closeFileUploadModal,
    uploadFile,
    deleteFile,
  } = useFileUpload();

  const {
    isModalOpen: isInstructionModalOpen,
    modalMessage: instructionModalMessage,
    closeModal: closeInstructionModal,
    showInstructionModal,
  } = useInstructionModal();

  const { chatHistory, handleSendMessage } = useChat();

  return (
    <main className={styles["doco-container"]}>
      {isFileUploadModalOpen && (
        <Modal
          onClose={closeFileUploadModal}
          modalMessage={fileUploadModalMessage}
        />
      )}
      {isInstructionModalOpen && (
        <Modal
          onClose={closeInstructionModal}
          modalMessage={instructionModalMessage}
          format={true}
        />
      )}
      {loading && <Loading />}
      <div className={styles["doco-gpt"]}>
        <Sidebar
          uploadedFile={uploadedFile}
          uploadFile={uploadFile}
          deleteFile={deleteFile}
          showInstructionModal={showInstructionModal}
        />
        <section className={styles["chat-wrapper"]}>
          <Chat chatHistory={chatHistory} />
          <Input onSendMessage={handleSendMessage} />
        </section>
      </div>
    </main>
  );
}
