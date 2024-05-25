import "./chat-bot.css";

const ChatBot = ({ message }) => {
  return (
    <section className="bot-message-container">
      <p className="bot-message-date">2.03 PM, 15 Nov</p>
      <p
        className="bot-message-content"
        dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, "<br>") }}
      ></p>
    </section>
  );
};

export default ChatBot;
