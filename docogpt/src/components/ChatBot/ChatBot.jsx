import { formatDate } from "@/helpers/date";
import "./chat-bot.css";

const ChatBot = ({ message, isLoading }) => {
  const formatMessage = message.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <section className="chat-bot">
      <p className="chat-bot-date">{formatDate()}</p>
      {isLoading ? (
        <div class="chat-bot-loader"></div>
      ) : (
        <p className="chat-bot-content">{formatMessage}</p>
      )}
    </section>
  );
};

export default ChatBot;
