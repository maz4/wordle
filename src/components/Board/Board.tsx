import Line from "../Line";
import "./Board.css";

function Board({ guesses, currentGuess, success }: BoardProps): JSX.Element {
  return (
    <div className="board">
      {guesses.map((guess: string, index: number) => {
        const isCurrent = guesses.findIndex((guess) => guess === "") === index;
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
