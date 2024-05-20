import "./bot-message.css";

const BotMessage = ({ message }) => {
  return (
    <section className="bot-message-container">
      <p className="bot-message-date">2.03 PM, 15 Nov</p>
      <p className="bot-message-content">{message}</p>
    </section>
  );
};

export default BotMessage;
