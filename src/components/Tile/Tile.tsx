interface TileProps {
  letter?: string;
  children: React.ReactNode;
  className: string;
}

function Tile({ children, className }: TileProps): JSX.Element {
  return <div className={`board__tile ${className}`.trim()}>{children}</div>;
}

export default Tile;
