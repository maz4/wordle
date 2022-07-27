import { render, screen, within } from "@testing-library/react";
import Board from "../index";

describe("Board.tsx", () => {
  it("should render board", () => {
    render(
      <Board
        guesses={["", "", "", "", "", ""]}
        currentGuess={""}
        success={"rhino"}
      />
    );

    screen.getByTestId("board");
  });

  it("should render first word in the row", () => {
    render(
      <Board
        guesses={["board", "", "", "", "", ""]}
        currentGuess={""}
        success={"rhino"}
      />
    );
    const row = screen.getByTestId("line-0");
    within(row).getAllByText(/b/i);
    within(row).getAllByText(/o/i);
    within(row).getAllByText(/a/i);
    within(row).getAllByText(/r/i);
    within(row).getAllByText(/d/i);
  });

  it("should set gray color on incorrect letters", () => {
    render(
      <Board
        guesses={["board", "", "", "", "", ""]}
        currentGuess={""}
        success={"rhino"}
      />
    );
    const row = screen.getByTestId("line-0");
    const letterB = within(row).getByText(/b/i);
    const letterA = within(row).getByText(/a/i);
    const letterD = within(row).getByText(/d/i);

    expect(letterA).toHaveClass("board__tile board__tile--gray");
    expect(letterB).toHaveClass("board__tile board__tile--gray");
    expect(letterD).toHaveClass("board__tile board__tile--gray");
  });

  it("should set yellow color on misplaced letters", () => {
    render(
      <Board
        guesses={["board", "", "", "", "", ""]}
        currentGuess={""}
        success={"rhino"}
      />
    );
    const row = screen.getByTestId("line-0");
    const letterO = within(row).getByText(/o/i);
    const letterR = within(row).getByText(/r/i);

    expect(letterO).toHaveClass("board__tile board__tile--yellow");
    expect(letterR).toHaveClass("board__tile board__tile--yellow");
  });

  it("should set green color on correctly guessed letters", () => {
    render(
      <Board
        guesses={["rhino", "", "", "", "", ""]}
        currentGuess={""}
        success={"rhino"}
      />
    );
    const row = screen.getByTestId("line-0");
    const letterR = within(row).getByText(/r/i);
    const letterI = within(row).getByText(/i/i);
    const letterH = within(row).getByText(/h/i);
    const letterN = within(row).getByText(/n/i);
    const letterO = within(row).getByText(/o/i);

    expect(letterR).toHaveClass("board__tile board__tile--green");
    expect(letterI).toHaveClass("board__tile board__tile--green");
    expect(letterH).toHaveClass("board__tile board__tile--green");
    expect(letterN).toHaveClass("board__tile board__tile--green");
    expect(letterO).toHaveClass("board__tile board__tile--green");
  });

  it("should not set colors on a currently typed word", () => {
    render(
      <Board
        guesses={["board", "", "", "", "", ""]}
        currentGuess={"setup"}
        success={"rhino"}
      />
    );
    const row = screen.getByTestId("line-1");
    const letterS = within(row).getByText(/s/i);
    const letterE = within(row).getByText(/e/i);
    const letterT = within(row).getByText(/t/i);
    const letterU = within(row).getByText(/u/i);
    const letterP = within(row).getByText(/p/i);

    expect(letterS).toHaveClass("board__tile");
    expect(letterS).not.toHaveClass("board__tile board__tile--green");

    expect(letterE).toHaveClass("board__tile");
    expect(letterE).not.toHaveClass("board__tile board__tile--green");

    expect(letterT).toHaveClass("board__tile");
    expect(letterT).not.toHaveClass("board__tile board__tile--green");

    expect(letterU).toHaveClass("board__tile");
    expect(letterU).not.toHaveClass("board__tile board__tile--green");

    expect(letterP).toHaveClass("board__tile");
    expect(letterP).not.toHaveClass("board__tile board__tile--green");
  });
});
