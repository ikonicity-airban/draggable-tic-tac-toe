interface TileProps {
  className?: string;
}

function Tile({ className }: TileProps) {
  return <div className={`tile ${className}  `} />;
}

export default Tile;
