import UserMessage from "../user-message/UserMessage";
import DocoMessage from "../doco-message/DocoMessage";
import "./chat-history.css";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="chat-history">
      {chatHistory.map((message, index) =>
        message.type === "user" ? (
          <UserMessage key={index} message={message.text} />
        ) : (
          <DocoMessage key={index} message={message.text} />
        )
      )}
    </div>
  );
};

export default ChatHistory;
