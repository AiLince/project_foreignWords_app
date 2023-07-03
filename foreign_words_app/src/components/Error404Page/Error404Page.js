import React, { useState, useEffect } from 'react';
import './Error404Page.css';

const Error404Page = () => {
  const [yesButtonStyle, setYesButtonStyle] = useState({
    top: '50%',
    left: '50%',
  });

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
    alert('А кто тогда будет доделывать этот проект?');
  };

  const handleNoClick = () => {
    alert('Спасибо, вы замечательный пользователь!');
  };

  return (
    <div className="page-container">
      <h1>
        Упс, Вам попалась страничка с ошибкой 404! Хотите уволить разработчика?
      </h1>
      <button
        onClick={handleYesClick}
        className="yes-button"
        style={{
          top: yesButtonStyle.top + 'px',
          left: yesButtonStyle.left + 'px',
        }}
      >
        Да
      </button>
      <button 
      onClick={handleNoClick}
      className="no-button">Нет</button>
    </div>
  );
};

export default Error404Page;