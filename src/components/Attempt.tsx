import { useState, useEffect, useRef } from "react";

import type { SetObject } from "../interfaces.ts";

import Set from "../components/Set.tsx";

type AttemptProps = {
  attempt: SetObject[];
  index: number;
  enterEditMode: (attemptIndex: number) => void;
  editModeEnabledOnAttempt: boolean;
  globalEditModeEnabled: boolean;
  deleteAttempt: (attempt: SetObject[]) => void;
  makeAttemptCurrent: (attempt: SetObject[]) => void;
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
  makeAttemptCurrent,
  deleteSet,
  duplicateSet,
  armThisSetForUpdate,
}: AttemptProps) {
  const longPressDuration = 800;

  const [isPointerDown, setIsPointerDown] = useState(false);
  const mouseDownStartTime = useRef(0);

  const [armedSetIndex, setArmedSetIndex] = useState(-1);

  const attemptElementRef = useRef<HTMLInputElement>(null);

  const armSetForUpdate = (set: SetObject) => {
    setArmedSetIndex(attempt.indexOf(set));
    armThisSetForUpdate(set);
  };

  const handlePointerDown = () => {
    console.log("pointer down");

    if (attemptElementRef.current) {
      attemptElementRef.current.style.touchAction = "none";
    }

    mouseDownStartTime.current = Date.now();
    setIsPointerDown(true);
  };

  const handlePointerUp = () => {
    if (attemptElementRef.current) {
      attemptElementRef.current.style.touchAction = "auto";
    }

    setIsPointerDown(false);
  };

  const handlePointerCancel = () => {
    handlePointerUp();
  };

  useEffect(() => {
    if (isPointerDown) {
      const handleDuringPointerDown = () => {
        const timeSincePointerDown = Date.now() - mouseDownStartTime.current;

        if (timeSincePointerDown > longPressDuration) {
          if (!editModeEnabledOnAttempt) {
            setArmedSetIndex(-1);
            enterEditMode(index);
            clearInterval(interval);
          }
        }
      };

      const interval = setInterval(handleDuringPointerDown, 80);
      return () => clearInterval(interval);
    }
  }, [isPointerDown]);

  useEffect(() => {
    if (isPointerDown) {
      console.log("add pointerup listener");

      window.addEventListener("pointerup", handlePointerUp);
    } else {
      window.removeEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isPointerDown]);

  return (
    <div className="my-1 flex last:*:mt-1 last:*:border-dashed last:*:bg-blue-100">
      <div
        ref={attemptElementRef}
        onClick={() => {
          if (Date.now() - mouseDownStartTime.current <= longPressDuration) {
            makeAttemptCurrent(attempt);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerCancel={handlePointerCancel}
        className={`relative mx-1 min-h-13 flex-1 rounded-md border border-gray-500 bg-white p-2 shadow-sm ${editModeEnabledOnAttempt && "bg-yellow-50! shadow-lg"} ${globalEditModeEnabled && !editModeEnabledOnAttempt && "blur-[2px]"}`}
      >
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
      {editModeEnabledOnAttempt && (
        <div className="flex flex-col gap-3.5 px-3 pt-2">
          <button onClick={() => deleteAttempt(attempt)} className="">
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
          <button
            onClick={() => {
              if (editModeEnabledOnAttempt) {
                enterEditMode(-1);
              }
            }}
            className={`cursor-pointer ${attempt.length === 0 && "hidden"}`}
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
        </div>
      )}
    </div>
  );
}

export default Attempt;
