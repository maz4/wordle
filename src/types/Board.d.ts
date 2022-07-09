interface BoardProps {
  guesses: string[];
  currentGuess: string;
  success: string;
}

interface LineProps {
  guess: string;
  success: string;
  existingGuess: boolean;
  dataTestId?: string;
}

interface TileProps {
  children: React.ReactNode;
  className: string;
}
