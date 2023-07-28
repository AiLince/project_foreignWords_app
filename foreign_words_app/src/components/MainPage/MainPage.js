import React, { useState, useEffect } from 'react';
import WordList from '../WordList/WordList';
import './MainPage.css';

function MainPage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('https://itgirlschool.justmakeit.ru/api/words')
      .then(response => response.json())
      .then(data => setWords(data))
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div className="MainPage">
        <h1>Список слов</h1>
        <WordList words={words} />
    </div>
  )
}

export default MainPage;