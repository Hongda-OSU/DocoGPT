"use client";
import { useEffect, useRef } from "react";
import "./input.css";

const Input = ({ onSendMessage }) => {
  const docoInputRef = useRef(null);

  useEffect(() => {
    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    };

    const inputElement = docoInputRef.current;
    if (inputElement) {
      inputElement.addEventListener("paste", handlePaste);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("paste", handlePaste);
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (docoInputRef.current) {
      const message = docoInputRef.current.innerHTML
        .replace(/<div>/g, "\n")
        .replace(/<\/div>/g, "")
        .replace(/<br>/g, "\n")
        .trim();
      if (message !== "") {
        onSendMessage(message);
        docoInputRef.current.innerHTML = "";
      }
    }
  };

  return (
    <div className="input-container">
      <div className="input">
        <div
          contentEditable="true"
          className="doco-input"
          ref={docoInputRef}
          placeholder="Message DocoGPT..."
        ></div>
        <button className="send-button" onClick={handleSendMessage}>
          <span className="send-button-text">Send</span>
        </button>
      </div>
    </div>
  );
};

export default Input;
