import React, { useState, useEffect } from 'react';
import WordCarousel from '../WordCarousel/WordCarousel';
import './CardPage.css';

function CardPage() {
  const [words, setWords] = useState([]);
  const [learnedCount, setLearnedCount] = useState(0);

  useEffect(() => {
    fetch('https://itgirlschool.justmakeit.ru/api/words')
      .then(response => response.json())
      .then(data => setWords(data));
  }, []);

  const incrementLearnedCount = () => {
    setLearnedCount(prevCount => prevCount + 1);
  };

  return (
    <div className="CardPage">
      <WordCarousel
        words={words}
        defaultIndex={0}
        incrementLearnedCount={incrementLearnedCount}
      />
      <p>Изучено слов: {learnedCount}</p>
    </div>
  );
}

export default CardPage;