interface StrikeProps {
  strikeClass: string;
}

function Strike({ strikeClass }: StrikeProps) {
  return <div className={`strike [--clr:#28ef0d] ${strikeClass}`}></div>;
}

export default Strike;
