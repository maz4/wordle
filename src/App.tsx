import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";

function App(): JSX.Element {
  const success = "rhino";
  const [guesses, setGuesses] = useState<string[]>(() => Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (isGameOver) {
        return;
      }

      if (key === "Backspace") {
        setCurrentGuess((previous) => previous.slice(0, -1));
        return;
      }

      if (key === "Enter" && currentGuess.length === 5) {
        const guessesCopy = [...guesses];
        const index = guessesCopy.indexOf("");
        guessesCopy[index] = currentGuess;
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

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [currentGuess, guesses, isGameOver]);

  return (
    <div className="">
      <Board guesses={guesses} success={success} currentGuess={currentGuess} />
      <Keyboard />
    </div>
  );
}

export default App;
