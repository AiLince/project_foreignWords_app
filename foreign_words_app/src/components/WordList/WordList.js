import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './WordList.css';

function WordRow({ word, index, onSave, onCancel }) {
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
          className={`saveBtn${buttonDisabled ? ' disabled' : ''}`}
          onClick={() => onSave(index, editedWord)}
          disabled={buttonDisabled}
        >
          Сохранить
        </button>
        <button className="cancelBtn" onClick={() => onCancel(index)}>
          Отмена
        </button>
      </td>
    </tr>
  );
}

function ReadOnlyRow({ word, index, onEditClick, onDeleteClick }) {
  return (
    <tr>
      {['english', 'transcription', 'russian'].map((property) => (
        <td key={property}>{word[property]}</td>
      ))}
      <td>
        <FaEdit
          className="FaEdit"
          title="Редактировать слово"
          onClick={() => onEditClick(index)}
        />
        <FaTrash
          className="FaTrash"
          title="Удалить слово"
          onClick={() => onDeleteClick(index)}
        />
      </td>
    </tr>
  );
}

function WordList({ words }) {
  const [editingIndices, setEditingIndices] = useState(new Set());
  const [message, setMessage] = useState('');

  const displayMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const toggleEditing = (index) => {
    const newEditingIndices = new Set(editingIndices);
    if (newEditingIndices.has(index)) {
      newEditingIndices.delete(index);
    } else {
      newEditingIndices.add(index);
    }
    setEditingIndices(newEditingIndices);
  };

  const onSaveClick = (index, editedWord) => {
    console.log("Изменённое слово:", editedWord);
    displayMessage("Изменения успешно сохранены!");
    toggleEditing(index);
  };

  const onCancelClick = (index) => {
    toggleEditing(index);
  };

  const onDeleteClick = (index) => {
    console.log("Удаление слова:", words[index]);
  };

  return (
    <>
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
            {words.map((word, index) =>
              editingIndices.has(index) ? (
                <WordRow
                  key={index}
                  word={word}
                  index={index}
                  onSave={onSaveClick}
                  onCancel={onCancelClick}
                />
              ) : (
                <ReadOnlyRow
                  key={index}
                  word={word}
                  index={index}
                  onEditClick={toggleEditing}
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