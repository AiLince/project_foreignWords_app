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
  const buttonRef = useRef(null);
  const [counted, setCounted] = useState(false);

  const handleClick = () => {
    if (!counted) {
      setCounted(true);
      incrementLearnedCount();
    }
    setFlipped(!flipped);
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <div className="parent-element">
      <div
        className={`word-card ${flipped ? "flipped" : ""}`}
        title="Нажмите на карточку, чтобы увидеть перевод"
        onClick={handleClick}
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