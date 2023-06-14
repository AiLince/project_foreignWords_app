import React from 'react';
import logo from './logo.png';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <img className="header-logo" src={logo} alt="Логотип нашего приложения" />
      <nav className="header-nav">
        <ul>
          <li><a href="#">Главная</a></li>
          <li><a href="#">Словарь</a></li>
          <li><a href="#">Учебник</a></li>
        </ul>
      </nav>
      <div className="header-profile">
        <a href="#">Профиль</a>
        <button>Выйти</button>
      </div>
    </header>
  );
}

export default Header;