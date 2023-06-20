import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './WordList.css';

function WordList(props) {
  const { words } = props;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedWords, setEditedWords] = useState([]);

  const toggleEditMode = (index) => {
    if (!isEditMode) {
      const edited = words.map((word, i) => {
        const editedWord = { ...word };
        editedWords[i] = editedWord;
        return editedWord;
      });
      setEditedWords(edited);
    }
    setIsEditMode(!isEditMode);
  };

  const handleEnglishChange = (event, index) => {
    const value = event.target.value;
    setEditedWords((prev) =>
      prev.map((word, i) => {
        if (i === index) {
          const editedWord = { ...word, english: value };
          return editedWord;
        }
        return word;
      })
    );
  };

  const handleTranscriptionChange = (event, index) => {
    const value = event.target.value;
    setEditedWords((prev) =>
      prev.map((word, i) => {
        if (i === index) {
          const editedWord = { ...word, transcription: value };
          return editedWord;
        }
        return word;
      })
    );
  };

  const handleRussianChange = (event, index) => {
    const value = event.target.value;
    setEditedWords((prev) =>
      prev.map((word, i) => {
        if (i === index) {
          const editedWord = { ...word, russian: value };
          return editedWord;
        }
        return word;
      })
    );
  };

  const handleSaveClick = () => {
    console.log(editedWords);
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setEditedWords(words.slice());
    setIsEditMode(false);
  };

  const renderRows = () => {
    return words.map((word, index) => {
      const editedWord = editedWords[index];
      return (
        <tr key={index}>
          <td>{isEditMode ? <input type="text" value={editedWord.english} onChange={(e) => handleEnglishChange(e, index)} /> : word.english}</td>
          <td>{isEditMode ? <input type="text" value={editedWord.transcription} onChange={(e) => handleTranscriptionChange(e, index)} /> : word.transcription}</td>
          <td>{isEditMode ? <input type="text" value={editedWord.russian} onChange={(e) => handleRussianChange(e, index)} /> : word.russian}</td>
          <td>
            {isEditMode ? (
              <>
                <button className="saveBtn" onClick={handleSaveClick}>Сохранить</button>
                <button className="cancelBtn" onClick={handleCancelClick}>Отмена</button>
              </>
            ) : (
              <FaEdit className="FaEdit" title="Редактировать слово" onClick={() => toggleEditMode(index)} />
            )}
            <FaTrash className="FaTrash" title="Удалить слово" />
          </td>
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Слово</th>
          <th>Транскрипция</th>
          <th>Перевод</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
}

export default WordList;