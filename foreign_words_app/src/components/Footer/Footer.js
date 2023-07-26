import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <p>&copy; AiLince, 2023</p>
      <nav>
        <ul>
          <li><a href="#">Обратная связь</a></li>
          <li><a href="#">Условия использования</a></li>
          <li><a href="#">Политика конфиденциальности</a></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;