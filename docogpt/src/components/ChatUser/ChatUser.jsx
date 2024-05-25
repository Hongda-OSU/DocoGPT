import { formatDate } from "@/helpers/date";
import "./chat-user.css";

const ChatUser = ({ message }) => {
  const formatMessage = message.split("\n").map((line, index) => (
    <span key={index} className="chat-user-span">
      {line}
      <br />
    </span>
  ));

  return (
    <section className="chat-user">
      <p className="chat-user-date">{formatDate()}</p>
      <p className="chat-user-content">{formatMessage}</p>
    </section>
  );
};

export default ChatUser;
