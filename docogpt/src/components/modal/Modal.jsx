import "./modal.css";

const Modal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div id="container">
      <div id="modal">
        <div id="modal-header">
          <p id="warning">Warning</p>
          <button id="close-button" onClick={onClose}>
            x
          </button>
        </div>
        <div id="modal-content">
          <p id="content">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
