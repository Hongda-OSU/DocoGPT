
import styles from "./modal.module.css";

const Modal = () => {
  return (
  <div id={styles.container}>
    <div id={styles.modal}>
       <div className={styles["modal-header"]}>
            <p></p>
       </div>
    </div>
  </div>
  );
};

export default Modal;
