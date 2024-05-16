"use client";
import { useEffect, useRef } from "react";
import "./input-area.css";

const InputArea = ({ onSendMessage }) => {
  const wrapperRef = useRef(null);
  const docoInputRef = useRef(null);

  useEffect(() => {
    const resizeTextarea = () => {
      if (wrapperRef.current && docoInputRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        docoInputRef.current.style.width = `${wrapperWidth * 0.8}px`;
      }
    };

    resizeTextarea();

    window.addEventListener("resize", resizeTextarea);

    return () => {
      window.removeEventListener("resize", resizeTextarea);
    };
  }, []);

  const handleSendMessage = () => {
    if (docoInputRef.current) {
      const message = docoInputRef.current.innerText;
      if (message.trim() !== "") {
        onSendMessage(message);
        docoInputRef.current.innerText = ""; 
      }
    }
  };

  return (
    <div className="input-area-wrapper" ref={wrapperRef}>
      <div
        contentEditable="true"
        className="doco-input"
        rows={1}
        type="text"
        ref={docoInputRef}
        placeholder="Message DocoGPT..."
      ></div>
      <button className="send-button" onClick={handleSendMessage}>
        <span className="button-text">Send</span>
      </button>
    </div>
  );
};

export default InputArea;
