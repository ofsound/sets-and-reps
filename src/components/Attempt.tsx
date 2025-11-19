import { useState } from "react";

import type { SetObject } from "../interfaces.ts";

import { useLongPress } from "use-long-press";

import Set from "../components/Set.tsx";

type AttemptProps = {
  attempt: SetObject[];
  index: number;
  enterEditMode: (attemptIndex: number) => void;
  editModeEnabledOnAttempt: boolean;
  globalEditModeEnabled: boolean;
  deleteAttempt: (attempt: SetObject[]) => void;
  deleteSet: (set: SetObject) => void;
  duplicateSet: (set: SetObject) => void;
  armThisSetForUpdate: (set: SetObject) => void;
};

function Attempt({
  attempt,
  index,
  enterEditMode,
  editModeEnabledOnAttempt,
  globalEditModeEnabled,
  deleteAttempt,
  deleteSet,
  duplicateSet,
  armThisSetForUpdate,
}: AttemptProps) {
  const [armedSetIndex, setArmedSetIndex] = useState(-1);

  const armSetForUpdate = (set: SetObject) => {
    setArmedSetIndex(attempt.indexOf(set));
    armThisSetForUpdate(set);
  };

  const handlers = useLongPress(
    () => {
      if (!editModeEnabledOnAttempt) {
        enterEditMode(index);
      }
    },
    {
      threshold: 1000,
    },
  );

  return (
    <div
      {...handlers()}
      className={`relative mx-4 my-2 min-h-13 rounded-md border border-gray-500 bg-white p-2 shadow-sm last:border-dashed last:bg-blue-100 ${editModeEnabledOnAttempt && "mr-20 bg-yellow-50! shadow-lg"} ${globalEditModeEnabled && !editModeEnabledOnAttempt && "blur-[2px]"}`}
    >
      <button
        onClick={() => {
          if (editModeEnabledOnAttempt) {
            enterEditMode(-1);
          }
        }}
        className={`absolute -right-12 bottom-8 cursor-pointer ${attempt.length === 0 && "hidden"}`}
      >
        <svg
          className="relative top-1 -left-px"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.29 4.29L12 12.59 7.71 8.29" />
          <path
            d="M20.29 4.29L12 12.59 7.71 8.29"
            strokeDasharray="7 7"
            strokeDashoffset="7"
          />
        </svg>
      </button>
      {editModeEnabledOnAttempt && (
        <button
          onClick={() => deleteAttempt(attempt)}
          className="absolute top-4 -right-12"
        >
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
      {attempt.map((item, index) => (
        <Set
          set={item}
          key={index}
          {...{ index }}
          {...{ editModeEnabledOnAttempt }}
          {...{ deleteSet }}
          {...{ duplicateSet }}
          {...{ armSetForUpdate }}
          isArmedSet={armedSetIndex === index}
        />
      ))}
    </div>
  );
}

export default Attempt;
