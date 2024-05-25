import { useState } from "react";

const instructionMessage = `
Here is how you can use DocoGPT:

  1. Upload a PDF file to start.
  2. Ask questions about the content of the PDF.
  3. Receive answers from DocoGPT based on the content of the PDF.

Notes:
  - The file should be less than 4 pages; otherwise, it won't answer because too many tokens will be used.
  - If it's your first time uploading a file, it will take some time to build the document tree and cache it.
  - If you want to upload another file, you need to refresh the page and do the above steps again.
`;

const useInstructionModal = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showInstructionModal = () => {
    setModalMessage(instructionMessage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalMessage("");
    setIsModalOpen(false);
  };

  return {
    modalMessage,
    isModalOpen,
    showInstructionModal,
    closeModal,
  };
};

export default useInstructionModal;
