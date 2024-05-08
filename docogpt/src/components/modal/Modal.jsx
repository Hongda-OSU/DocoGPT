import styles from "./modal.module.css";

const Modal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div id={styles.container}>
      <div id={styles.modal}>
        <div id={styles["modal-header"]}>
          <p id={styles.warning}>Warning</p>
          <button id={styles["close-button"]} onClick={onClose}>
            x
          </button>
        </div>
        <div id={styles["modal-content"]}>
          <p id={styles.content}>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
