import Line from "../Line";

interface BoardProps {
  guesses: string[];
  currentGuess: string;
  success: string;
}

function Board({ guesses, currentGuess, success }: BoardProps): JSX.Element {
  return (
    <div className="board">
      {guesses.map((guess: string, index: number) => {
        const isCurrent = guesses.findIndex((val) => val === "") === index;
        const existingGuess = guess !== "" && guesses.includes(guess);
        return (
          <Line
            key={index}
            guess={isCurrent ? currentGuess : guess}
            success={success}
            existingGuess={existingGuess}
            dataTestId={`line-${index}`}
          />
        );
      })}
    </div>
  );
}

export default Board;
