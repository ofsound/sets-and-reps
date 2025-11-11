import { useState } from "react";

import type { ExerciseObject } from "../interfaces.ts";

import ExercisesMenu from "./ExercisesMenu.tsx";
import ExercisesManager from "./ExercisesManager.tsx";

type AppHeaderProps = {
  exercises: ExerciseObject[];
  setCurrentExerciseIDFromMenu: (exerciseID: string) => void;
};

function AppHeader({
  exercises,
  setCurrentExerciseIDFromMenu,
}: AppHeaderProps) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [managerIsVisible, setManagerIsVisible] = useState(false);
  const [currentExerciseName, setCurrentExerciseName] =
    useState("Sets And Reps");

  const showManager = () => {
    setManagerIsVisible(true);
  };

  const hideManager = () => {
    setManagerIsVisible(false);
  };

  return (
    <div>
      <div className="flex h-12 justify-between px-4 py-2">
        <div className="flex-1 text-center text-lg font-bold text-black">
          {currentExerciseName}
        </div>
        <button
          onClick={() => {
            setMenuIsVisible((menuIsVisible) => !menuIsVisible);
          }}
          className="absolute right-4 cursor-pointer"
        >
          <svg viewBox="0 0 100 80" width="23" height="23">
            <rect fill="black" width="100" height="20" rx="10"></rect>
            <rect fill="black" y="30" width="100" height="20" rx="10"></rect>
            <rect fill="black" y="60" width="100" height="20" rx="10"></rect>
          </svg>
        </button>
      </div>

      {menuIsVisible && (
        <ExercisesMenu
          {...{ exercises }}
          {...{ setCurrentExerciseIDFromMenu }}
          {...{ setCurrentExerciseName }}
          {...{ showManager }}
        />
      )}
      {managerIsVisible && (
        <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-gray-200 pt-6">
          <ExercisesManager {...{ exercises }} hideManager={hideManager} />
        </div>
      )}
    </div>
  );
}

export default AppHeader;
