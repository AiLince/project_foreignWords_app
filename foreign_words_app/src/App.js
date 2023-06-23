import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import WordCard from './components/WordCard/WordCard';
import WordList from './components/WordList/WordList';
import Footer from './components/Footer/Footer';
import './assets/styles/style.css';

function App() {
  const [words, setWords] = useState([]);
  const [wordListMode, setWordListMode] = useState('read');

  useEffect(() => {
    fetch('https://itgirlschool.justmakeit.ru/api/words')
      .then(response => response.json())
      .then(data => setWords(data));
  }, []);

  const toggleWordListMode = () => {
    setWordListMode(prevMode => (prevMode === 'read' ? 'edit' : 'read'));
  };

  return (
    <div className="App">
      <Header />
      {words.length > 0 && (
        <WordCard
          word={words[0].word}
          english={words[0].english}
          transcription={words[0].transcription}
          russian={words[0].russian}
        />
      )}
      <WordList
        words={words}
        mode={wordListMode}
        toggleMode={toggleWordListMode}>
        {words.map((word, index) => (
          <WordCard
            key={index}
            word={word.word}
            english={word.english}
            transcription={word.transcription}
            russian={word.russian}
          />
        ))}
      </WordList>
      <Footer />
    </div>
  );
}

export default App;