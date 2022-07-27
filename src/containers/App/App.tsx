import { useEffect, useState } from "react";
import "./App.css";
import Board from "../../components/Board";
import Keyboard from "../../components/Keyboard";
import { allowedKeys } from "../../constants/constants";
import GameOver from "../../components/GameOver";

function App(): JSX.Element {
  const success = "rhino";
  const [guesses, setGuesses] = useState<string[]>(() => Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [charactersMap, setCharactersMap] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const handleWords = (key: string) => {
      if (isGameOver) {
        return;
      }

      if (!allowedKeys.includes(key)) {
        return;
      }

      if (key === "Backspace") {
        setCurrentGuess((previous) => previous.slice(0, -1));
        return;
      }

      if (currentGuess.length === 5 && key === "Enter") {
        const guessesCopy = [...guesses];
        const index = guessesCopy.findIndex((guess) => guess === "");
        const classNameMap: Record<string, string> = {};

        currentGuess.split("").forEach((letter, index) => {
          const letterIndex = success.indexOf(letter);

          if (charactersMap[letter] === "keyboard__key--green") {
            return;
          }

          if (letterIndex === index) {
            classNameMap[letter] = "keyboard__key--green";
          } else if (letterIndex !== index && letterIndex > -1) {
            classNameMap[letter] = "keyboard__key--yellow";
          } else {
            classNameMap[letter] = "keyboard__key--gray";
          }
        });

        guessesCopy[index] = currentGuess;

        setCharactersMap({ ...charactersMap, ...classNameMap });
        setIsGameOver(currentGuess === success);
        setGuesses([...guessesCopy]);
        setCurrentGuess("");

        return;
      }

      if (key === "Enter") {
        return;
      }

      if (currentGuess.length >= 5) {
        return;
      }

      setCurrentGuess((previous) => previous + key);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      handleWords(key);
    };

    const onScreenKeyboardEvent = (event: CustomEvent) => {
      const key = event.detail;
      handleWords(key);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("onscreenkeyboard", onScreenKeyboardEvent);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("onscreenkeyboard", onScreenKeyboardEvent);
    };
  }, [currentGuess, guesses, isGameOver, charactersMap]);

  return (
    <div className="container">
      <h1 className="title">Wordle</h1>
      <Board guesses={guesses} success={success} currentGuess={currentGuess} />
      <Keyboard charactersMap={charactersMap} />
      {/* {(isGameOver || !guesses.includes("")) && ( */}
      {/* <GameOver win={guesses.includes(success)} score={6 - guesses.length} /> */}
      {/* )} */}
      <GameOver win={true} score={6 - guesses.length} />
    </div>
  );
}

export default App;
