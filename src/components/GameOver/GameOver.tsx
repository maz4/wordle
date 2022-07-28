import "./GameOver.css";

interface GameOverProps {
  win: boolean;
  restartCallback: () => void;
}

const GameOver = ({ win, restartCallback }: GameOverProps): JSX.Element => {
  const handleRestartClick = (): void => {
    restartCallback && restartCallback();
  };

  return (
    <div className="game-over">
      <p>{win ? "Win" : "Game Over"}</p>
      <button onClick={handleRestartClick}>Restart Game</button>
    </div>
  );
};

export default GameOver;
