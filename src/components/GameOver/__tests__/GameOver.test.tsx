import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameOver from "../";

const restartCallbackMock = jest.fn();

describe("GameOver.tsx", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should show game over modal with "Game Over" words and score', () => {
    render(<GameOver win={false} restartCallback={restartCallbackMock} />);
    expect(screen.getByText("Game Over")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Restart Game" })
    ).toBeInTheDocument();
  });

  it('should show game over modal with "Win" word and score', () => {
    render(<GameOver win={true} restartCallback={restartCallbackMock} />);
    expect(screen.getByText("Win")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Restart Game" })
    ).toBeInTheDocument();
  });

  it("should call reset game callback when button clicked", () => {
    render(<GameOver win={true} restartCallback={restartCallbackMock} />);

    userEvent.click(screen.getByRole("button", { name: "Restart Game" }));
    expect(restartCallbackMock).toBeCalledTimes(1);
  });
});
