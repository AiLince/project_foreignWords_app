import React, { useState } from "react";
import "./FeedbackPage.css";
import { AiOutlineUser } from "react-icons/ai";

const CommentItem = ({ comment, isHighlighted }) => {
    return (
        <li className={isHighlighted ? "highlighted-comment" : ""}>
            <span className="comment-user-icon">
                <AiOutlineUser />
            </span>
            <strong>{comment.name}</strong>: {comment.message}
            <div className="comment-time">{comment.time}</div>
        </li>
    );
};

const FeedbackPage = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);

    const checkSpam = (str) => {
        const regex = /viagra|XXX/gi;
        return str.replace(regex, "***");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newComment = {
            name: name,
            message: checkSpam(message),
            time: new Date().toLocaleString()
        };
        setComments([newComment, ...comments]);
        setName("");
        setMessage("");
    };

    return (
        <div className="feedback">
            <h2>Оставьте Ваш отзыв</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        className="name-input"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Текст сообщения:</label>
                    <textarea
                        id="message"
                        className="message-textarea"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Добавить комментарий
                </button>
            </form>
            <div className="chat-comment">
                <ul>
                    {comments.map((comment, index) => (
                        <CommentItem
                            key={index}
                            comment={comment}
                            isHighlighted={index === 0}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FeedbackPage;