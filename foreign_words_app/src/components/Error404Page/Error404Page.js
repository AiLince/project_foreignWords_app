import React, { useState, useEffect } from 'react'; import { AiOutlineFrown, AiOutlineSmile } from 'react-icons/ai'; import './Error404Page.css';

const Error404Page = () => { const [yesButtonStyle, setYesButtonStyle] = useState({ top: '50%', left: '50%', }); const [message, setMessage] = useState(''); const [icon, setIcon] = useState(null);

useEffect(() => {
    const handleMouseMove = (e) => {
        setYesButtonStyle({
            left: e.clientX + getRandomInt(-80, 80),
            top: e.clientY + getRandomInt(-80, 80),
        });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
    };
}, []);

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleYesClick = () => {
    setMessage('Помилуйте, он у нас и так в единственном экземпляре! Ещё и работает за кофе...');
    setIcon(<AiOutlineFrown size={64} />);
};

const handleNoClick = () => {
    setMessage('Спасибо! Мы знаем, что наши пользователи - самые лучшие!');
    setIcon(<AiOutlineSmile size={64} />);
};

return (
    <div className="page-container">
        <h1>Упс, Вам попалась страничка с ошибкой 404! Хотите уволить разработчика?</h1>
        <button onClick={handleYesClick} className="yes-button" style={{ top: yesButtonStyle.top + 'px', left: yesButtonStyle.left + 'px' }}>Да</button>
        <button onClick={handleNoClick} className="no-button">Нет</button>
        {message && (
            <div className="message">
                <h2>{message}</h2>
                {icon && <div className="icon">{icon}</div>}
            </div>
        )}
    </div>
);
};

export default Error404Page;