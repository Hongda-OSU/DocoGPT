import "./error-modal.css";

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

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
          <p className="modal-content-message">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
