import React, { useEffect, useRef, useState } from "react";
import "./WordCard.css";

function WordCard({
  word,
  english,
  transcription,
  russian,
  flipped,
  setFlipped,
  incrementLearnedCount,
}) {
  const cardRef = useRef(null);
  const [counted, setCounted] = useState(false);

  const handleClick = () => {
    handleFlip();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFlip();
    }
  };

  const handleFlip = () => {
    if (!counted) {
      setCounted(true);
      incrementLearnedCount();
    }
    setFlipped(!flipped);
  };

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, []);

  return (
    <div className="parent-element">
      <div
        ref={cardRef}
        tabIndex="0"
        className={`word-card ${flipped ? "flipped" : ""}`}
        title="Нажмите на карточку, чтобы увидеть перевод"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
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