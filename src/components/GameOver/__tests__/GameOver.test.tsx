import { render, screen } from "@testing-library/react";
import GameOver from "../";

describe("GameOver.tsx", () => {
  it('should show game over modal with "Game Over" words and score', () => {
    render(<GameOver win={false} score={0} />);
    expect(screen.getByText("Game Over")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
  it('should show game over modal with "Win" word and score', () => {
    render(<GameOver win={true} score={5} />);
    expect(screen.getByText("Win")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
