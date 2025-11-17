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
      <div className="flex h-12 justify-between px-4 py-2">
        <div
          onClick={() => {
            setMenuIsVisible((menuIsVisible) => !menuIsVisible);
            setCurrentExerciseName("Exercises");
          }}
          className="flex-1 cursor-pointer text-center text-lg font-bold text-black select-none"
        >
          {currentExerciseName} ⏷
        </div>
      </div>
      {menuIsVisible && !managerIsVisible && (
        <button
          onClick={showManager}
          className="absolute top-2 right-1/20 mx-auto block w-max cursor-pointer rounded-sm border bg-gray-800 px-3 py-1 text-sm text-white"
        >
          Edit Exercises
        </button>
      )}
      {managerIsVisible && (
        <button
          onClick={hideManager}
          className="absolute top-2 right-1/20 mx-auto block w-max cursor-pointer rounded-sm border bg-gray-800 px-3 py-1 text-sm text-white"
        >
          Close Editor
        </button>
      )}
      {menuIsVisible && (
        <ExercisesMenu
          {...{ exercises }}
          {...{ setCurrentExerciseID }}
          {...{ setCurrentExerciseName }}
          {...{ hideMenu }}
        />
      )}
      {managerIsVisible && (
        <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-gray-200 pt-6">
          <ExercisesManager {...{ exercises }} />
        </div>
      )}
    </div>
  );
}

export default AppHeader;
