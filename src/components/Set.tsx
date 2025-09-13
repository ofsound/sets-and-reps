interface setObject {
  reps: number;
  weight: string;
  notes: string;
  date: number;
}

type inputProps = {
  set: setObject;
};

function Set({ set }: inputProps) {
  const dateToTime = (dateNumber: number): string => {
    const date = new Date(dateNumber);
    return date.toLocaleTimeString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex gap-2">
      <div className="max-w-10">{set.reps} x </div>
      <div className="min-w-24">{set.weight}</div>
      <div className="flex-1">{set.notes}</div>
      <div className="ml-auto">{dateToTime(set.date)}</div>
    </div>
  );
}

export default Set;
