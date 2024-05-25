import { useRef } from "react";
import "./sidebar.css";

const Sidebar = ({
  uploadedFile,
  uploadFile,
  deleteFile,
  showInstructionModal,
}) => {
  const fileRef = useRef();

  return (
    <section className="sidebar-container">
      <div className="sidebar">
        <div className="title-container">
          <p className="title">DocoGPT</p>
        </div>
        <div className="uploaded-file">
          <p className="uploaded-file-title">Uploaded File</p>
          {uploadedFile && (
            <div className="file-item">
              <span className="file-name">{uploadedFile}</span>
              <button className="delete-button" onClick={deleteFile}>
                <span>x</span>
              </button>
            </div>
          )}
        </div>
        <button
          className="upload-button"
          onClick={() => fileRef.current.click()}
        >
          <p className="sidebar-button-text">Upload a File</p>
          <input
            onChange={uploadFile}
            multiple={false}
            ref={fileRef}
            type="file"
            hidden
          />
        </button>
        <button className="instruction-button" onClick={showInstructionModal}>
          <p className="sidebar-button-text">How to use DocoGPT</p>
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
