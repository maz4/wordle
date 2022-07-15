interface KeyboardProps {
  charactersMap: Record<string, string>;
}

interface KeyboardRowProps {
  charactersRow: string[];
  charactersMap: Record<string, string>;
}

interface KeyboardKeyProps {
  children: React.ReactNode;
  className: string;
  onClick: (event: MouseEventHandler) => void;
}
