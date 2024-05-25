import "./modal.css";

const Modal = ({ onClose, modalMessage, format = false }) => {
  const formatMessage = (message) => {
    if (!message) return null;

    return message.split("\n").map((line, index) => {
      const trimmedLine = line.trim();
      const isIndented = line.startsWith("  ");
      const isNote = trimmedLine.startsWith("Notes:");

      return (
        <p
          key={index}
          className={`modal-content-message ${
            isIndented ? "modal-content-indented" : ""
          } ${isNote ? "modal-content-note" : ""}`}
          style={{
            margin: format ? "auto 0" : "",
          }}
        >
          {trimmedLine}
        </p>
      );
    });
  };

  return (
    <div className="bg">
      <div className="modal">
        <div className="modal-header">
          <p className="modal-header-title">Message</p>
          <button className="modal-close-button" onClick={onClose}>
            X
          </button>
        </div>
        {formatMessage(modalMessage)}
      </div>
    </div>
  );
};

export default Modal;
