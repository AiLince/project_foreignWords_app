import React, { createContext, useState, useEffect } from "react";

const WordsContext = createContext();

const WordsContextProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/words');
        const data = await response.json();
        setWords(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
        setWords([]);
      }
    };
  
    fetchWords();
  }, []);
  
  const postDataToServer = async (method, id = null, data = null, onSuccess) => {
    setLoading(true);
    const url = id ? (
      method === "PUT"
        ? `/api/words/update/${id}`
        : `/api/words/${id}`
    ) : (
      "/api/words"
    );
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (method === "POST") {
        setWords((prevWords) => [...prevWords, responseData]);
        if (onSuccess) {
          onSuccess(responseData);
        }
      } else if (method === "PUT") {
        setWords((prevWords) => prevWords.map((word) => word.id === responseData.id ? responseData : word));
      } else if (method === "DELETE") {
        setWords((prevWords) => prevWords.filter((word) => word.id !== id));
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const addWord = (newWord, onSuccess) => {
    postDataToServer("POST", null, newWord, onSuccess);
  };

  const updateWord = (wordToUpdate) => {
    postDataToServer("PUT", wordToUpdate.id, wordToUpdate);
  };
  
  const deleteWord = (wordId) => {
    postDataToServer("DELETE", wordId);
  };

  return (
    <WordsContext.Provider
      value={{
        words,
        addWord,
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

export { WordsContext, WordsContextProvider };
