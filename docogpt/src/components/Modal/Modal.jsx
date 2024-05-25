import "./modal.css";

const Modal = ({ onClose, modalMessage }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <p className="modal-header-message">Warning</p>
          <button className="modal-close-button" onClick={onClose}>
            x
          </button>
        </div>
        <div className="modal-content">
          <p className="modal-content-message">{modalMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
