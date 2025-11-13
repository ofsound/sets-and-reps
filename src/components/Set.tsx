import type { SetObject } from "../interfaces.ts";

type SetProps = {
  set: SetObject;
  index: number;
  editModeEnabled: boolean;
  deleteSet: (setIndex: number) => void;
  armSetForUpdate: (setIndex: number) => void;
};

function Set({
  set,
  index,
  editModeEnabled,
  deleteSet,
  armSetForUpdate,
}: SetProps) {
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
    <div className={`my-1 flex items-baseline px-3`}>
      <div
        onClick={() => armSetForUpdate(index)}
        className={`flex flex-1 ${editModeEnabled && "cursor-pointer bg-amber-200"}`}
      >
        <div className="text-base font-black">{set.unit}</div>
        {set.unit !== "" && (
          <div className="text-base font-black">&nbsp;x&nbsp;</div>
        )}
        <div className="text-base font-black">{set.reps}</div>
        <div className="ml-4 flex-1 text-sm italic">{set.notes}</div>
      </div>
      <div className="ml-auto text-sm">{dateToTime(set.date)}</div>
      {editModeEnabled && (
        <button onClick={() => deleteSet(index)} className="mr-2 ml-4 text-sm">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}

export default Set;
