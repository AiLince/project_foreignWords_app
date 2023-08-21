import React, { useState, useContext } from 'react';
import { WordsContext } from "../WordsContext/WordsContext";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Error from '../Error/Error';
import './WordList.css';

function AddWordRow({ onSubmit }) {
  const [newWord, setNewWord] = useState({ english: "", transcription: "", russian: "" });
  const [inputErrors, setInputErrors] = useState({ english: true, transcription: true, russian: true });

  const handleInputChange = (event, property) => {
    const value = event.target.value;
    setNewWord({ ...newWord, [property]: value });

    const updatedErrors = { ...inputErrors, [property]: value.trim().length === 0 };
    setInputErrors(updatedErrors);
  };

  const handleSubmit = () => {
    onSubmit({ english: newWord.english.trim(), transcription: newWord.transcription.trim(), russian: newWord.russian.trim() });
    setNewWord({ english: "", transcription: "", russian: "" });
  };

  const isFormValid = () => {
    return Object.values(inputErrors).every((error) => !error) && Object.values(newWord).every(value => value !== "");
  };

  return (
    <tr>
      {['english', 'transcription', 'russian'].map((property) => (
        <td key={property}>
          <input
            type="text"
            value={newWord[property]}
            onChange={(e) => handleInputChange(e, property)}
          />
        </td>
      ))}
      <td>
      <button
  className={`addWordBtn${isFormValid() ? '' : ' disabled'}`}
  onClick={handleSubmit}
  disabled={!isFormValid()}
>
  Добавить слово
</button>
      </td>
    </tr>
  );
}


function WordRow({ id, word, onSave, onCancel }) {
  const [editedWord, setEditedWord] = useState({ ...word });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputErrors, setInputErrors] = useState({ english: false, transcription: false, russian: false });

  const handleInputChange = (event, property) => {
    const value = event.target.value;
    setEditedWord({ ...editedWord, [property]: value });
    const updatedErrors = { ...inputErrors, [property]: value.trim() === '' };
    setInputErrors(updatedErrors);
    const hasEmptyInput = Object.values(updatedErrors).some((error) => error);
    const isModified = Object.keys(editedWord).some((key) => editedWord[key] !== word[key]);
    setButtonDisabled(hasEmptyInput || !isModified);
  };

  return (
    <tr>
      {['english', 'transcription', 'russian'].map((property) => (
        <td key={property}>
          <input
            type="text"
            value={editedWord[property]}
            onChange={(e) => handleInputChange(e, property)}
            style={{ borderColor: inputErrors[property] ? 'red' : '' }}
          />
        </td>
      ))}
      <td>
        <button
          className={`saveBtn${buttonDisabled ? " disabled" : ""}`}
          onClick={() => onSave(id, editedWord)}
          disabled={buttonDisabled}
        >
          Сохранить
        </button>
        <button className="cancelBtn" onClick={() => onCancel(id)}>
          Отмена
        </button>
      </td>
    </tr>
  );
}

function ReadOnlyRow({ id, word, onEditClick, onDeleteClick }) {
  return (
    <tr>
      {['english', 'transcription', 'russian'].map((property) => (
        <td key={property}>{word[property]}</td>
      ))}
      <td>
        <FaEdit
          className="FaEdit"
          title="Редактировать слово"
          onClick={() => onEditClick(id)}
        />
        <FaTrash
          className="FaTrash"
          title="Удалить слово"
          onClick={() => onDeleteClick(id)}
        />
      </td>
    </tr>
  );
}

function WordList({ words }) {
  const [editingId, setEditingId] = useState(null);
  const { updateWord, deleteWord, addWord } = useContext(WordsContext);
  const [message, setMessage] = useState('');

  const displayMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleSubmit = (newWord) => {
    addWord(newWord);
    displayMessage(`Слово "${newWord.english}" успешно добавлено.`);
  };

  const onSaveClick = (id, editedWord) => {
    console.log("Изменённое слово:", editedWord);
    updateWord({ ...editedWord, id });
    setEditingId(null);
    displayMessage(`Слово "${editedWord.english}" успешно обновлено.`);
  };

  const onCancelClick = (id) => {
    setEditingId(null);
  };

  const onDeleteClick = (id) => {
    console.log("Удаление слова:", words.find((word) => word.id === id));
    deleteWord(id);
    displayMessage(`Слово успешно удалено.`);
  };

  const { error } = useContext(WordsContext);

  return (
    <>
    {error && <Error message="Произошла ошибка при получении данных. Пожалуйста, обновите страницу." />}
      {message && (
        <div className="MessageContainer">
          <div className="Message">{message}</div>
        </div>
      )}
      <div className="List">
        <table>
          <thead>
            <tr>
              <th>Слово</th>
              <th>Транскрипция</th>
              <th>Перевод</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AddWordRow onSubmit={handleSubmit} />
            {(Array.isArray(words) ? words : []).map((word) =>
              editingId === word.id ? (
                <WordRow
                  key={word.id}
                  id={word.id}
                  word={word}
                  onSave={onSaveClick}
                  onCancel={onCancelClick}
                />
              ) : (
                <ReadOnlyRow
                  key={word.id}
                  id={word.id}
                  word={word}
                  onEditClick={setEditingId}
                  onDeleteClick={onDeleteClick}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WordList;