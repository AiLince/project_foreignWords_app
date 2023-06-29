import React, { useState, useEffect, useCallback } from "react";
import WordCard from "../WordCard/WordCard";
import "./WordCarousel.css";

function WordCarousel({ words, disableFirstAndLast, defaultIndex }) {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex || 0);
    const [flipped, setFlipped] = useState(false);

    const handlePrevClick = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            if (disableFirstAndLast) {
                setCurrentIndex(words.length - 1);
            }
        }
        setFlipped(false);
    }, [currentIndex, disableFirstAndLast, words]);

    const handleNextClick = useCallback(() => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            if (disableFirstAndLast) {
                setCurrentIndex(0);
            }
        }
        setFlipped(false);
    }, [currentIndex, disableFirstAndLast, words]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                handlePrevClick();
            } else if (event.key === "ArrowRight") {
                handleNextClick();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handlePrevClick, handleNextClick]);

    return (
        <div className="word-carousel">
            {words[currentIndex] ? (
                <WordCard
                    key={currentIndex}
                    word={words[currentIndex].word}
                    english={words[currentIndex].english}
                    transcription={words[currentIndex].transcription}
                    russian={words[currentIndex].russian}
                    flipped={flipped}
                    setFlipped={setFlipped}
                />
            ) : (
                <p>Идёт загрузка. Пожалуйста, подождите</p>
            )}
            <div className="buttons">
                <button
                    className="prev"
                    title="Предыдущее слово"
                    onClick={handlePrevClick}
                    disabled={!disableFirstAndLast && currentIndex === 0}
                >
                    &#8592;
                </button>
                <div className="current-slide">
                    {currentIndex + 1}/{words.length}
                </div>
                <button
                    className="next"
                    title="Следующее слово"
                    onClick={handleNextClick}
                    disabled={!disableFirstAndLast && currentIndex === words.length - 1}
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}

WordCarousel.defaultProps = { words: [], defaultIndex: 0 };

export default WordCarousel;