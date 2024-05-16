"use client";
import { useRef } from "react";
import "./sidebar.css";

const Sidebar = ({ uploadFile, deleteFile, uploadedFile }) => {
  const fileRef = useRef();

  return (
    <section className="sidebar">
      <div className="sidebar-wrapper">
        <div className="name-container">
          <p className="app-name">DocoGPT</p>
        </div>
        <div className="ingested-document">
          <p className="injested-file">Injested File</p>
          {uploadedFile && (
            <div className="list-item">
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
          <p className="button-text">Upload File</p>
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
