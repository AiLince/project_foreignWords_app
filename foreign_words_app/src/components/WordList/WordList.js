import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './WordList.css';

function WordList(props) {
  const { words, mode, toggleMode } = props;

  const renderRows = () => {
    return words.map((word, index) => {
      return (
        <tr key={index}>
          <td>{word.english}</td>
          <td>{word.transcription}</td>
          <td>{word.russian}</td>
          <td>
            {mode === 'read' ? (
              <>
                <FaEdit className="FaEdit" title="Редактировать слово" onClick={() => toggleMode()} />
                <FaTrash className="FaTrash" title="Удалить слово" />
              </>
            ) : (
              <>
                <input type="text" defaultValue={word.english} />
                <input type="text" defaultValue={word.transcription} />
                <input type="text" defaultValue={word.russian} />
                <button>Сохранить</button>
              </>
            )}
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