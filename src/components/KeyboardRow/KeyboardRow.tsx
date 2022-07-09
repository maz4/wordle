import KeyboardKey from "../KeyboardKey";

function KeyboardRow({
  charactersRow,
  charactersMap,
}: KeyboardRowProps): JSX.Element {
  console.log(charactersMap);
  return (
    <div className="keyboard__row">
      {charactersRow.map((character: string, index: number) => {
        return (
          <KeyboardKey
            key={character + index}
            className={charactersMap[character] ?? ""}
          >
            {character}
          </KeyboardKey>
        );
      })}
    </div>
  );
}

export default KeyboardRow;
