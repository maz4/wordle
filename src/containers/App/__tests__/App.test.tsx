import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Board.tsx", () => {
  it("should render title, board and keyboard", () => {
    render(<App />);

    screen.getByRole("heading", { level: 1 });
    screen.getByTestId("board");
    screen.getByTestId("keyboard");
  });

  it("should type on keyboard and display current guess on the board", () => {
    render(<App />);

    const board = screen.getByTestId("board");

    expect(within(board).queryByText("a")).toBeNull();

    userEvent.keyboard("a");

    expect(within(board).getByText("a")).toBeInTheDocument();
  });

  it("should click on the onscreen keyboard and display current guess on the board", () => {
    render(<App />);

    const board = screen.getByTestId("board");
    const keyboard = screen.getByTestId("keyboard");

    expect(within(board).queryByText("c")).toBeNull();

    const cKey = within(keyboard).getByText("c");

    userEvent.click(cKey);

    expect(within(board).getByText("c")).toBeInTheDocument();
  });

  it("should erase one letter from current guess when backspace key is pressed", () => {
    render(<App />);

    const board = screen.getByTestId("board");

    userEvent.keyboard("c");
    userEvent.keyboard("d");
    userEvent.keyboard("z");

    expect(within(board).getByText("c")).toBeInTheDocument();
    expect(within(board).getByText("d")).toBeInTheDocument();
    expect(within(board).getByText("z")).toBeInTheDocument();

    userEvent.keyboard(`{backspace}`);

    expect(within(board).getByText("c")).toBeInTheDocument();
    expect(within(board).getByText("d")).toBeInTheDocument();
    expect(within(board).queryByText("z")).toBeNull();
  });

  it("should erase one letter from current guess when onscreen backspace key is clicked", () => {
    render(<App />);

    const board = screen.getByTestId("board");
    const keyboard = screen.getByTestId("keyboard");

    const cKey = within(keyboard).getByText("c");
    const dKey = within(keyboard).getByText("d");
    const zKey = within(keyboard).getByText("z");
    const bspKey = within(keyboard).getByText("Backspace");

    userEvent.click(cKey);
    userEvent.click(dKey);
    userEvent.click(zKey);

    expect(within(board).getByText("c")).toBeInTheDocument();
    expect(within(board).getByText("d")).toBeInTheDocument();
    expect(within(board).getByText("z")).toBeInTheDocument();

    userEvent.click(bspKey);

    expect(within(board).getByText("c")).toBeInTheDocument();
    expect(within(board).getByText("d")).toBeInTheDocument();
    expect(within(board).queryByText("z")).toBeNull();
  });

  it("should not save guess when user press Enter but there is less than five letters", () => {
    render(<App />);

    const board = screen.getByTestId("board");

    userEvent.keyboard("r");
    userEvent.keyboard("i");
    userEvent.keyboard("h");

    userEvent.keyboard(`{enter}`);

    const boardLetterR = within(board).getByText("r");

    expect(boardLetterR).toHaveClass("board__tile");
  });

  it("should save the word in the guess board when user presses enter after typing 5 letters", () => {
    render(<App />);

    const board = screen.getByTestId("board");

    userEvent.keyboard("r");
    userEvent.keyboard("h");
    userEvent.keyboard("i");
    userEvent.keyboard("n");
    userEvent.keyboard("o");

    userEvent.keyboard(`{enter}`);

    expect(within(board).getByText("r")).toHaveClass(
      "board__tile board__tile--green"
    );
    expect(within(board).getByText("i")).toHaveClass(
      "board__tile board__tile--green"
    );
    expect(within(board).getByText("h")).toHaveClass(
      "board__tile board__tile--green"
    );
    expect(within(board).getByText("n")).toHaveClass(
      "board__tile board__tile--green"
    );
    expect(within(board).getByText("o")).toHaveClass(
      "board__tile board__tile--green"
    );
  });

  it("should show a game over modal on lost game with 'Game Over' message", () => {
    render(<App />);

    const guesess = ["start", "board", " world", "toast", "paper", "guess"];

    guesess.forEach((guess) => {
      guess.split("").forEach((letter) => userEvent.keyboard(letter));
      userEvent.keyboard("{enter}");
    });

    const modal = screen.getByText("Game Over");
    const resetButton = screen.getByRole("button", { name: "Restart Game" });
    expect(modal).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("should show a game over modal on win game with 'Win' word", () => {
    render(<App />);

    const guesess = ["rhino"];

    guesess.forEach((guess) => {
      guess.split("").forEach((letter) => userEvent.keyboard(letter));
      userEvent.keyboard("{enter}");
    });

    const modal = screen.getByText("Win");
    const resetButton = screen.getByRole("button", { name: "Restart Game" });
    expect(resetButton).toBeInTheDocument();
    expect(modal).toBeInTheDocument();
  });

  it("should reset teh game after clicking 'Reset Game' button", () => {
    render(<App />);

    const guesess = ["rhino"];

    guesess.forEach((guess) => {
      guess.split("").forEach((letter) => userEvent.keyboard(letter));
      userEvent.keyboard("{enter}");
    });

    const resetButton = screen.getByRole("button", { name: "Restart Game" });

    userEvent.click(resetButton);

    expect(screen.queryByRole("button", { name: "Restart Game" })).toBeNull();
  });

  it("should not allow typing when game is over", () => {
    render(<App />);

    const guesess = ["rhino"];

    guesess.forEach((guess) => {
      guess.split("").forEach((letter) => userEvent.keyboard(letter));
      userEvent.keyboard("{enter}");
    });

    userEvent.keyboard("y");

    const board = screen.getByTestId("board");
    expect(within(board).queryByText("y")).toBeNull();
  });

  it("should not replace color of already correctly guessed letter on the onscreen keyboard", () => {
    render(<App />);

    const firstGuess = "rhoni";
    const secondGuess = "rohni";

    firstGuess.split("").forEach((letter) => userEvent.keyboard(letter));
    userEvent.keyboard("{enter}");

    let keyboard = screen.getByTestId("keyboard");

    expect(within(keyboard).getByText("h")).toHaveClass(
      "keyboard__key keyboard__key--green"
    );

    secondGuess.split("").forEach((letter) => userEvent.keyboard(letter));
    userEvent.keyboard("{enter}");

    keyboard = screen.getByTestId("keyboard");
    expect(within(keyboard).getByText("h")).toHaveClass(
      "keyboard__key keyboard__key--green"
    );
  });
});

describe("Test keyboard keys", () => {
  const notAllowedKeys = [
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Shift",
    "Tab",
    "CapsLock",
    "Control",
    "Alt",
    "Meta",
    " ",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "§",
    "[[",
    "]",
    ";",
    "'",
    ",",
    ".",
    "/",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "8",
    "9",
    "0",
    "-",
    "=",
  ];

  it.each(notAllowedKeys)("should not accept key %s as a guess", (key) => {
    render(<App />);

    const board = screen.getByTestId("board");

    const firstLetter = key.split("")[0];

    userEvent.keyboard(key);
    expect(within(board).queryByText(firstLetter)).toBeNull();
  });
});
