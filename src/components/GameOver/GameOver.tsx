import "./GameOver.css";

interface GameOverProps {
  score: number;
  win: boolean;
  restartCallback?: () => void;
}

const GameOver = ({
  score,
  win,
  restartCallback,
}: GameOverProps): JSX.Element => {
  const handleRestartClick = (): void => {
    restartCallback && restartCallback();
  };

  return (
    <div className="game-over">
      <p>{win ? "Win" : "Game Over"}</p>
      <span>Score: {score}</span>
      {restartCallback && <button onClick={handleRestartClick}>Restart</button>}
    </div>
  );
};

export default GameOver;
