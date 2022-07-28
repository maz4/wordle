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
        let specialCharacter =
          character.length > 1
            ? `keyboard__key--${character.toLowerCase()}`
            : "";

        return (
          <KeyboardKey
            key={character + index}
            className={`${
              charactersMap[character] ?? ""
            }${specialCharacter}`.trim()}
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
