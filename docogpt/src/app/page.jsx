"use client";
import React, { useState, useRef } from "react";
import Modal from "@/components/modal/Modal";
import styles from "./home.module.css";

export default function Home() {
  const fileRef = useRef();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles([...uploadedFiles, file.name]);
    }
  };

  return (
    <main id={styles.container}>
      <Modal />
      <div id={styles.wrapper}>
        <section id={styles.sidebar}>
          <div className={styles["sidebar-wrapper"]}>
            <div className={styles["name-container"]}>
              <p className={styles.name}>DocoGPT</p>
            </div>
            <div className={styles["ingested-document"]}>
              <p className={styles.name2}>Injested Files</p>
              <ul>
                {uploadedFiles.map((fileName, idx) => (
                  <li key={idx} className={styles.listitem}>
                    <span className={styles.filename}>{fileName}</span>
                    <button className={styles["delete-button"]}>x</button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={styles["upload-button"]}
              onClick={() => fileRef.current.click()}
            >
              <p className={styles["button-text"]}>Upload File</p>
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
        <section id={styles.gpt}>
          <div id={styles["chat-wrapper"]}></div>
          <div id={styles["input-wrapper"]}></div>
        </section>
      </div>
    </main>
  );
}
