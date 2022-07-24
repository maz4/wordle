import { KEYBOARD_LAYOUT } from "../../constants/constants";
import KeyboardRow from "../KeyboardRow";
import "./Keyboard.css";

function Keyboard({ charactersMap }: KeyboardProps): JSX.Element {
  return (
    <div className="keyboard" data-testid="keyboard">
      {KEYBOARD_LAYOUT.map((row: string[], index: number) => {
        return (
          <KeyboardRow
            key={index}
            charactersRow={row}
            charactersMap={charactersMap}
          />
        );
      })}
    </div>
  );
}

export default Keyboard;
