import React, { createContext, useState, useEffect } from "react";

const WordsContext = createContext({
  words: [],
  addWord: () => {},
  updateWord: () => {},
  deleteWord: () => {},
  getWordById: () => {},
  loading: false,
  error: false,
  setLoading: () => {},
  setError: () => {},
});

export const WordsContextProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/words`);
        const data = await response.json();
        setWords(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchWords();
  }, []);

  const addWord = async (newWord, onSuccess) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/words/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      });
      const data = await response.json();
      setWords([...words, data]);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const updateWord = async (wordToUpdate) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/words/${wordToUpdate.id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wordToUpdate),
      });
      const data = await response.json();
      const updatedWords = words.map((word) =>
        word.id === data.id ? data : word
      );
      setWords(updatedWords);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const deleteWord = async (wordId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/words/${wordId}/delete`, {
        method: "POST",
      });
      const updatedWords = words.filter((word) => word.id !== wordId);
      setWords(updatedWords);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const getWordById = async (wordId) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/words/${wordId}`);
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      return null;
    }
  };

  return (
    <WordsContext.Provider
      value={{
        words,
        addWord,
        getWordById,
        deleteWord,
        updateWord,
        loading,
        error,
        setLoading,
        setError,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};

export { WordsContext };
