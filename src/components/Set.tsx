interface setObject {
  reps: number;
  weight: string;
  note: string;
  date: string;
}

type inputProps = {
  set: setObject;
};

function Set({ set }: inputProps) {
  return (
    <div className="flex gap-2">
      <div>{set.reps}</div>
      <div>{set.weight}</div>
      <div>{set.note}</div>
    </div>
  );
}

export default Set;
