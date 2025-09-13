interface setObject {
  reps: number;
  weight: number;
  notes: string;
  date: number;
}

type inputProps = {
  set: setObject;
};

function Set({ set }: inputProps) {
  const dateToTime = (dateNumber: number): string => {
    const date = new Date(dateNumber);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className="my-1 flex gap-2">
      <div className="max-w-10 font-black">{set.reps} x </div>
      <div className="min-w-14 font-black">{set.weight}lbs</div>
      <div className="flex-1 text-sm italic">{set.notes}</div>
      <div className="ml-auto text-sm">{dateToTime(set.date)}</div>
    </div>
  );
}

export default Set;
