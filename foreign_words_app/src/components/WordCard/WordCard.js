import React from "react";
import "./WordCard.css";

function WordCard({ word, english, transcription, russian }) {
  return (
    <div className="parent-element">
        <div className="word-card">
          <div className="word">{word}</div>
          <div className="english">{english}</div>
          <div className="transcription">{transcription}</div>
          <div className="russian">{russian}</div>
        </div>
    </div>
  );
}

export default WordCard;