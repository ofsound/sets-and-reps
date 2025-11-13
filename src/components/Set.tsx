import type { SetObject } from "../interfaces.ts";

type SetProps = {
  set: SetObject;
};

function Set({ set }: SetProps) {
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
      <div className="text-base font-black">{set.unit}</div>
      {set.unit !== "" && (
        <div className="text-base font-black">&nbsp;x&nbsp;</div>
      )}
      <div className="text-base font-black">{set.reps}</div>
      <div className="ml-4 flex-1 text-sm italic">{set.notes}</div>
      <div className="ml-auto text-sm">{dateToTime(set.date)}</div>
    </div>
  );
}

export default Set;
