import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <p><strong>&copy; <a href="https://github.com/AiLince">AiLince</a>, 2023</strong></p>
      <nav>
        <ul>
          <li><a href="#">Как пользоваться?</a></li>
          <li><a href="#">Обратная связь</a></li>
          <li><a href="#">Политика конфиденциальности</a></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;