import React, { useContext } from "react";
import { WordsContext } from "../../contexts/WordsContext/WordsContext";
import WordList from "../WordList/WordList";
import "./MainPage.css";

function MainPage() {
  const { words } = useContext(WordsContext);

  return (
    <div className="MainPage">
      <h1>Список слов</h1>
      <WordList words={Array.isArray(words) ? words : []} />
    </div>
  );
}

export default MainPage;