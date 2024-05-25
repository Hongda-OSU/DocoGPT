import ReactDOM from "react-dom";
import "./Loading.css";

const Loading = () => {
  return ReactDOM.createPortal(
    <div className="loading">
      <span className="loader"></span>
    </div>,
    document.body
  );
};

export default Loading;
