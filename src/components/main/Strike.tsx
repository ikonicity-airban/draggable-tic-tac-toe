interface StrikeProps {
  strikeClass: string;
}

function Strike({ strikeClass }: StrikeProps) {
  return <div className={`strike ${strikeClass}`}></div>;
}

export default Strike;
