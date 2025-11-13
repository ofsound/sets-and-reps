import type { SetObject } from "../interfaces.ts";

type SetProps = {
  set: SetObject;
  index: number;
  deleteSet: (setIndex: number) => void;
  armSetForUpdate: (setIndex: number) => void;
};

function Set({ set, index, deleteSet, armSetForUpdate }: SetProps) {
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
      <div onClick={() => armSetForUpdate(index)} className="flex">
        <div className="text-base font-black">{set.unit}</div>
        {set.unit !== "" && (
          <div className="text-base font-black">&nbsp;x&nbsp;</div>
        )}
        <div className="text-base font-black">{set.reps}</div>
        <div className="ml-4 flex-1 text-sm italic">{set.notes}</div>
      </div>
      <div className="ml-auto text-sm">{dateToTime(set.date)}</div>
      <div onClick={() => deleteSet(index)} className="mr-2 ml-4 text-sm">
        X
      </div>
    </div>
  );
}

export default Set;
