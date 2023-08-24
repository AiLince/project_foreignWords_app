import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import AddWordForm from '../AddWordForm/AddWordForm';
import WordList from '../WordList/WordList';
import './MainPage.css';

const MainPage = inject('wordStore')(
  observer(({ wordStore }) => {
    useEffect(() => {
      fetch('/api/words')
        .then(response => response.json())
        .then(data => wordStore.setWords(data))
        .catch(error => {
          console.log(error);
        });
    }, [wordStore]);

    return (
      <div className="MainPage">
        <h1>Список слов</h1>
        <AddWordForm />
        <WordList />
      </div>
    );
  }),
);

export default MainPage;