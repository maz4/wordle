import KeyboardKey from "../KeyboardKey";

function KeyboardRow({
  charactersRow,
  charactersMap,
}: KeyboardRowProps): JSX.Element {
  const onKeyClick = (key: string) => {
    const event = new CustomEvent("onscreenkeyboard", {
      detail: key,
    });

    document.dispatchEvent(event);
  };

  return (
    <div className="keyboard__row">
      {charactersRow.map((character: string, index: number) => {
        return (
          <KeyboardKey
            key={character + index}
            className={charactersMap[character] ?? ""}
            onClick={(event) => onKeyClick(character)}
          >
            {character}
          </KeyboardKey>
        );
      })}
    </div>
  );
}

export default KeyboardRow;
