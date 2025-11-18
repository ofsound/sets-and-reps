import { useState } from "react";

import type { ExerciseObject } from "../interfaces.ts";

import ExercisesMenu from "./ExercisesMenu.tsx";
import ExercisesManager from "./ExercisesManager.tsx";

type AppHeaderProps = {
  exercises: ExerciseObject[];
  setCurrentExerciseID: (exerciseID: string) => void;
};

function AppHeader({ exercises, setCurrentExerciseID }: AppHeaderProps) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [managerIsVisible, setManagerIsVisible] = useState(false);
  const [currentExerciseName, setCurrentExerciseName] = useState("Exercises");

  const showManager = () => {
    setManagerIsVisible(true);
  };

  const hideManager = () => {
    setManagerIsVisible(false);
  };

  const hideMenu = () => {
    setMenuIsVisible(false);
  };

  return (
    <div>
      <div className="flex h-10 justify-between px-4 pt-2">
        {!managerIsVisible && (
          <div
            onClick={() => {
              setMenuIsVisible((menuIsVisible) => !menuIsVisible);
              setCurrentExerciseName("Exercises");
            }}
            className="flex-1 cursor-pointer font-bold text-black select-none"
          >
            <div className="mx-auto w-max rounded-sm bg-gray-300 px-3 py-px">
              {currentExerciseName} ⏷
            </div>
          </div>
        )}
      </div>
      {menuIsVisible && !managerIsVisible && (
        <button
          onClick={showManager}
          className="absolute top-2 right-1/20 mx-auto flex h-6.5 w-9 cursor-pointer justify-center rounded-sm bg-gray-300 py-1 text-sm text-black"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"
            />
          </svg>
        </button>
      )}
      {managerIsVisible && (
        <button
          onClick={hideManager}
          className="absolute top-2 right-1/20 mx-auto flex h-6.5 w-9 cursor-pointer justify-center rounded-sm bg-gray-300 pt-1 text-base font-black text-black"
        >
          <svg
            className="relative top-1 -left-px"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20.29 4.29L12 12.59 7.71 8.29" />
            <path
              d="M20.29 4.29L12 12.59 7.71 8.29"
              stroke-dasharray="7 7"
              stroke-dashoffset="7"
            />
          </svg>
        </button>
      )}
      {menuIsVisible && !managerIsVisible && (
        <ExercisesMenu
          {...{ exercises }}
          {...{ setCurrentExerciseID }}
          {...{ setCurrentExerciseName }}
          {...{ hideMenu }}
        />
      )}
      {managerIsVisible && (
        <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-gray-200">
          <ExercisesManager {...{ exercises }} />
        </div>
      )}
    </div>
  );
}

export default AppHeader;
