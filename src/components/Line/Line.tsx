import { WORDLE_LENGTH } from "../../constants/constants";
import Tile from "../Tile";

interface LineProps {
  guess: string;
  success: string;
  existingGuess: boolean;
  dataTestId?: string;
}

function Line({
  guess,
  success,
  existingGuess,
  dataTestId,
}: LineProps): JSX.Element {
  let tiles = [];
  let className = "";
  for (let i = 0; i < WORDLE_LENGTH; i++) {
    const letterIndex = success.indexOf(guess[i]);

    if (letterIndex === i) {
      className = "board__tile--green";
    } else if (letterIndex > -1 && letterIndex !== i) {
      className = "board__tile--yellow";
    } else {
      className = "board__tile--gray";
    }

    tiles.push(
      <Tile key={`tile-${i}`} className={existingGuess ? className : ""}>
        {guess[i] ?? ""}
      </Tile>
    );
  }

  return (
    <div data-testid={dataTestId} className="board__line">
      {tiles}
    </div>
  );
}

export default Line;
