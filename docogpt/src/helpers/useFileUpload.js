import { useState } from "react";
import axios from "axios";
import { uploadfile } from "./api";

const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const uploadFile = async (file) => {
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension === "pdf") {
        if (uploadedFile) {
          setModalMessage("DocoGPT only supports one PDF file at a time.");
          setIsModalOpen(true);
        } else {
          const formData = new FormData();
          formData.append("file", file);
          setLoading(true);
          try {
            const res = await axios.post(uploadfile, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            setUploadedFile(res.data.filename);
            setModalMessage("File uploaded successfully!");
            setIsModalOpen(true);
          } catch (error) {
            setModalMessage("Failed to upload file.");
            setIsModalOpen(true);
          } finally {
            setLoading(false);
          }
        }
      } else {
        setModalMessage("DocoGPT only supports PDF format.");
        setIsModalOpen(true);
      }
    }
  };

  const resetModal = () => {
    setModalMessage("");
    setIsModalOpen(false);
  };

  const deleteFile = () => setUploadedFile(null);

  return {
    uploadedFile,
    loading,
    modalMessage,
    isModalOpen,
    uploadFile,
    deleteFile,
    resetModal,
  };
};

export default useFileUpload;
