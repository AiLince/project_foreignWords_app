import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import "./AddWordForm.css";

const AddWordForm = inject("wordStore")(
  observer(({ wordStore }) => {
    const [word, setWord] = useState({ english: "", transcription: "", russian: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [inputErrors, setInputErrors] = useState({ english: false, transcription: false, russian: false });

    const handleInputChange = (event, property) => {
      const value = event.target.value;
      setWord({ ...word, [property]: value });
      const updatedErrors = { ...inputErrors, [property]: value.trim() === "" };
      setInputErrors(updatedErrors);
      const hasEmptyInput = Object.values(updatedErrors).some((error) => error);
      setButtonDisabled(hasEmptyInput);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (buttonDisabled) return;

      try {
        const response = await fetch("/api/words/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(word),
        });

        if (response.ok) {
          const newWord = await response.json();
          wordStore.addWord(newWord);
          setWord({ english: "", transcription: "", russian: "" });
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const propertyToPlaceholder = {
      english: "Введите слово на английском",
      transcription: "Введите транскрипцию",
      russian: "Введите слово на русском",
    };

    return (
      <form className="AddWordForm" onSubmit={handleSubmit}>
        {["english", "transcription", "russian"].map((property) => (
          <input
            key={property}
            type="text"
            value={word[property]}
            placeholder={propertyToPlaceholder[property]}
            onChange={(e) => handleInputChange(e, property)}
            style={{ borderColor: inputErrors[property] ? "red" : "" }}
          />
        ))}
        <button type="submit" className={`saveBtn${buttonDisabled ? " disabled" : ""}`} disabled={buttonDisabled}>
          Добавить слово
        </button>
      </form>
    );
  })
);

export default AddWordForm;