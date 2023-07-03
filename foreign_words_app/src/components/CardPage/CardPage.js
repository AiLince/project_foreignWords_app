import React, { useState, useEffect } from 'react';
import WordCarousel from '../WordCarousel/WordCarousel';

function CardPage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('https://itgirlschool.justmakeit.ru/api/words')
      .then(response => response.json())
      .then(data => setWords(data));
  }, []);

  return (
    <div className="CardPage">
      <WordCarousel words={words} defaultIndex={0} />
    </div>
  );
}

export default CardPage;