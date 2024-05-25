import "./chat-user.css";

const ChatUser = ({ message }) => {
  const msg = message.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));

  return (
    <section className="user-message-container">
      <p className="user-message-date">2.03 PM, 15 Nov</p>
      <p className="user-message-content">{msg}</p>
    </section>
  );
};

export default ChatUser;
