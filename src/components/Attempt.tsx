import { useState } from "react";

import type { SetObject } from "../interfaces.ts";

import Set from "../components/Set.tsx";

type AttemptProps = {
  attempt: SetObject[];
  index: number;
  enterEditMode: (attemptIndex: number) => void;
  editModeEnabled: boolean;
  deleteAttempt: (attemptIndex: number) => void;
  deleteSetInAttempt: (attemptIndex: number, setIndex: number) => void;
  armThisSetForUpdate: (set: SetObject) => void;
};

function Attempt({
  attempt,
  index,
  enterEditMode,
  editModeEnabled,
  deleteAttempt,
  deleteSetInAttempt,
  armThisSetForUpdate,
}: AttemptProps) {
  const [armedSetIndex, setArmedSetIndex] = useState(-1);

  const deleteSet = (setIndex: number) => {
    deleteSetInAttempt(index, setIndex);
  };

  const armSetForUpdate = (set: SetObject) => {
    setArmedSetIndex(attempt.indexOf(set));
    armThisSetForUpdate(set);
  };

  return (
    <div
      className={`relative mx-4 my-2 min-h-13 rounded-md border border-gray-500 bg-white p-2 shadow-sm last:border-dashed last:bg-blue-100 ${editModeEnabled && "bg-amber-300!"}`}
    >
      <button
        onClick={() => {
          if (!editModeEnabled) {
            enterEditMode(index);
          } else {
            enterEditMode(-1);
          }
        }}
        className={`absolute right-0 bottom-0 cursor-pointer ${attempt.length === 0 && "hidden"}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"
          />
        </svg>
      </button>
      {editModeEnabled && (
        <button
          onClick={() => deleteAttempt(index)}
          className="absolute top-0 right-1"
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
          {...{ editModeEnabled }}
          {...{ deleteSet }}
          {...{ armSetForUpdate }}
          isArmedSet={armedSetIndex === index}
        />
      ))}
    </div>
  );
}

export default Attempt;
