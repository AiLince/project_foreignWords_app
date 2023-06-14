import React from 'react';
import './WordCard.css';

function WordCard(props) {
  const { word, translation, sound, transcription } = props;
  return (
    <div className="word-card-container">
      <h3>{word}</h3>
      <p className="translation">{translation}</p>
      {sound && (
        <audio controls>
          <source src={sound} type="audio/mpeg" />
        </audio>
      )}
      {transcription && (
        <p className="transcription">{transcription}</p>
      )}
    </div>
  );
}

export default WordCard;