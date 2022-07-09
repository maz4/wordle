import { render, screen } from "@testing-library/react";
import Board from "../";

describe("Board.tsx", () => {
  it("test", () => {
    render(
      <Board
        guesses={["wordl", "", "", "", "", ""]}
        currentGuess={"rihno"}
        success={"rhino"}
      />
    );
    const firstLine = screen.getByTestId("line-1");
    expect(firstLine).toBeInTheDocument();

    // const tiles = screen.getByTestId("line-");
  });
});
