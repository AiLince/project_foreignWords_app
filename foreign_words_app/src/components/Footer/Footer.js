import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <p><strong>&copy; <a href="https://github.com/AiLince">AiLince</a>, 2023</strong></p>
      <nav>
        <ul>
          <li><Link to="*">Как пользоваться?</Link></li>
          <li><Link to="project_foreignWords_app/feedback" title="Оставьте Ваш отзыв">Обратная связь</Link></li>
          <li><Link to="*">Политика конфиденциальности</Link></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;