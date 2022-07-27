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

  xit("should not allow user to type more than 5 letters", () => {});

  it("should show game over modal with score 0 after 6 missed guesses", () => {
    render(<App />);

    const guesess = ["start", "board", " world", "toast", "paper", "guess"];

    guesess.forEach((guess) => {
      guess.split("").forEach((letter) => userEvent.keyboard(letter));
      userEvent.keyboard("{enter}");
    });

    const modal = screen.getByText("Game Over");
    const score = screen.getByText("0");
    expect(modal).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  });

  fit("should show game over win version modal with score 5 after 1 correct guess", () => {
    render(<App />);

    const guesess = ["rhino"];

    guesess.forEach((guess) => {
      guess.split("").forEach((letter) => userEvent.keyboard(letter));
      userEvent.keyboard("{enter}");
    });

    const modal = screen.getByText("Win");
    const score = screen.getByText("5");
    expect(modal).toBeInTheDocument();
    expect(score).toBeInTheDocument();
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
