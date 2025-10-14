import type { setObject } from "../interfaces.ts";

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
      hour: "numeric",
    });
  };

  return (
    <div className="my-1 flex items-baseline px-3">
      <div className="text-lg font-black">{set.reps} x&nbsp;</div>
      <div className="text-lg font-black">{set.weight}lbs</div>
      <div className="ml-4 flex-1 text-sm italic">{set.notes}</div>
      <div className="ml-auto text-sm">{dateToTime(set.date)}</div>
    </div>
  );
}

export default Set;
