"use client";
import { useEffect, useRef } from "react";
import "./input.css";

const Input = ({ onSendMessage }) => {
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
    <div className="input-area-wrapper" ref={wrapperRef}>
      <div
        contentEditable="true"
        className="doco-input"
        ref={docoInputRef}
        placeholder="Message DocoGPT..."
      ></div>
      <button className="send-button" onClick={handleSendMessage}>
        <span className="button-text">Send</span>
      </button>
    </div>
  );
};

export default Input;
