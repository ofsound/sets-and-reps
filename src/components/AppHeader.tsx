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

      {menuIsVisible && (
        <ExercisesMenu
          {...{ exercises }}
          {...{ setCurrentExerciseID }}
          {...{ setCurrentExerciseName }}
          {...{ showManager }}
          {...{ hideMenu }}
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
