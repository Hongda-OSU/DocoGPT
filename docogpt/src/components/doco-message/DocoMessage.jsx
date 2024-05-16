import "./doco-message.css"

const DocoMessage = ({ message }) => {
    return (
    <div className="chat-message user-message">{message}</div>
    )
}

export default DocoMessage