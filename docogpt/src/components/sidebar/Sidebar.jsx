import { useRef } from "react";
import "./sidebar.css";

const Sidebar = ({ uploadFile, deleteFile, uploadedFile }) => {
  const fileRef = useRef();

  return (
    <section className="sidebar-container">
      <div className="sidebar">
        <div className="app-name-container">
          <p className="app-name">DocoGPT</p>
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
          <p className="button-text">Upload a File</p>
          <input
            onChange={uploadFile}
            multiple={false}
            ref={fileRef}
            type="file"
            hidden
          />
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
