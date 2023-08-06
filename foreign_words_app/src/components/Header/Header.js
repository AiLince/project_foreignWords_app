import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom'; // Импортируем Link
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <Link to="project_foreignWords_app/">
        <img className="header-logo" src={logo} alt="Логотип приложения" />
      </Link>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="project_foreignWords_app/">Главная</Link> {/* Используем Link */}
          </li>
          <li>
            <Link to="project_foreignWords_app/game">Игровой режим</Link>
          </li>
        </ul>
      </nav>
      <div className="header-profile">
        <Link to="*">Профиль</Link>
        <button>Выйти</button>
      </div>
    </header>
  );
}

export default Header;