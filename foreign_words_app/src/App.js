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
    fetch('http://itgirlschool.justmakeit.ru/api/words')
      .then(response => response.json())
      .then(data => setWords(data));
  }, []);

  const toggleWordListMode = () => {
    setWordListMode(prevMode => (prevMode === 'read' ? 'edit' : 'read'));
  };

  return (
    <div className="App">
      <Header />
      <WordCard />
      <WordList words={words} mode={wordListMode} toggleMode={toggleWordListMode} />
      <Footer />
    </div>
  );
}

export default App;