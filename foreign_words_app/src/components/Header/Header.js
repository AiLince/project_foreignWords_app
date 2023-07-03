import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom'; // Импортируем Link
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <img className="header-logo" src={logo} alt="Логотип приложения" />
      </Link>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/">Главная</Link> {/* Используем Link */}
          </li>
          <li>
            <Link to="/dictionary">Словарь</Link>
          </li>
          <li>
            <Link to="/cards">Карточки</Link>
          </li>
        </ul>
      </nav>
      <div className="header-profile">
        <Link to="/404">Профиль</Link>
        <button>Выйти</button>
      </div>
    </header>
  );
}

export default Header;