import "./user-message.css"

const UserMessage = ({ message }) => {
    return (
    <div className="chat-message user-message">{message}</div>
    )
}

export default UserMessage