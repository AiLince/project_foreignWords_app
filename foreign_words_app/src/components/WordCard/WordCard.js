import React, { useState } from "react";
import "./WordCard.css";

function WordCard({ word, english, transcription, russian }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  }

  return (
    <div className={`parent-element ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="word-card" title="Нажмите на карточку, чтобы увидеть перевод">
        <div className="front">
          <div className="word">{word}</div>
          <div className="english">{english}</div>
          <div className="transcription">{transcription}</div>
        </div>
        <div className="back">
          <div className="russian">{russian}</div>
        </div>
      </div>
    </div>
  );
}

export default WordCard;