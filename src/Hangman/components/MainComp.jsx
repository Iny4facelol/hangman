import { useEffect, useState } from "react";
import ReactEmojis from "@souhaildev/reactemojis";
import words from "../data/words.json";
import confetti from "canvas-confetti";

export const MainComp = () => {
  const [newGame, setNewGame] = useState(false);
  const [word, setWord] = useState("0");
  const [hint, setHint] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [letter, setLetter] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [image, setImage] = useState("/hangman/hangman0.webp");
  const [showAttempts, setShowAttempts] = useState(5);

  useEffect(() => {
    const random = Math.floor(Math.random() * words.length);
    setWord(words[random].word);
    setHint(words[random].hint);
    setGuessedLetters([]);
    setAttempts(0);
    setGameOver(false);
    setWin(false);
    setLetter("");
    setImage("/hangman/hangman0.webp");
    setShowAttempts(5);
  }, [newGame]);

  useEffect(() => {
    if (attempts >= 5) {
      setGameOver(true);
    }
  }, [attempts]);

  useEffect(() => {
    const uniqueLetters = [...new Set(word.split(""))];
    const checkLetters = uniqueLetters.every((letter) =>
      guessedLetters.includes(letter)
    );

    if (checkLetters) {
      setWin(true);
      confetti();
      console.log("victoria");
    }
  }, [guessedLetters, word]);

  const handleNewGame = () => {
    setNewGame(!newGame);
  };

  const handleValue = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setLetter(inputValue);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (!letter) return;

    if (guessedLetters.includes(letter)) {
      setAttempts((prevAttempts) => prevAttempts + 1);
      setImage(`/hangman/hangman${attempts + 1}.webp`);
      setShowAttempts(showAttempts - 1);
      return;
    }

    setGuessedLetters((prev) => [...prev, letter]);

    if (!word.includes(letter)) {
      setAttempts((prevAttempts) => prevAttempts + 1);
      setImage(`/hangman/hangman${attempts + 1}.webp`);
      setShowAttempts(showAttempts - 1);
    }

    setLetter("");
  };

  const hideWord = () => {
    return word
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  return (
    <>
      <span>The Hangman</span>
      <div className="container2">
        <article>
          <h2>Elige una letra</h2>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGuess(e);
              }
            }}
            value={letter}
            onChange={handleValue}
            type="text"
            maxLength="1"
          />
          <button className="btn-hover" onClick={handleGuess}>
            Enviar
          </button>
        </article>
        <article>
          <h2>¿Qué palabra será?</h2>
          <p className="key-word">{hideWord()}</p>
          <p>{hint}</p>
        </article>
        <article>
          <h2>Este eres tú</h2>
          <img src={image} alt="" />
          <p>Intentos restantes: {showAttempts}</p>
        </article>
      </div>
      <div className={gameOver || win ? "opened-modal" : "closed-modal"}>
        <article>
          {win ? <ReactEmojis emoji="🚀" /> : <ReactEmojis emoji="☹️" />}
          <h3>{win ? "HAS GANADO" : "HAS PERDIDO"}</h3>
          <p className="keyword-modal">
            La palabra era: <span className="keyword-span">{word}</span>
          </p>
          <button className="hvr-pulse-grow" onClick={handleNewGame}>
            Volver a empezar
          </button>
        </article>
      </div>
    </>
  );
};
