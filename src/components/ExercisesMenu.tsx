import { useState } from "react";

import type { ExerciseObject } from "../interfaces.ts";

import ExercisesManager from "./ExercisesManager.tsx";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExerciseIDFromMenu: (exerciseID: string) => void;
};

function ExercisesMenu({
  exercises,
  setCurrentExerciseIDFromMenu,
}: ExercisesMenuProps) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [managerIsVisible, setManagerIsVisible] = useState(false);
  const [currentExerciseName, setCurrentExerciseName] = useState("");

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
        <button
          onClick={() => {
            setManagerIsVisible((managerIsVisible) => !managerIsVisible);
          }}
          className="absolute right-14 z-101 cursor-pointer text-black"
        >
          Edit
        </button>
      </div>

      {menuIsVisible && (
        <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-white pt-6">
          {exercises.map((item, index) => (
            <button
              key={index}
              className="mx-auto mb-4 block w-9/10 rounded-md border-1 border-gray-700 bg-gray-600 px-6 py-3 text-lg font-bold text-white"
              onClick={() => {
                setCurrentExerciseIDFromMenu(item.id);
                setMenuIsVisible((menuIsVisible) => !menuIsVisible);
                setCurrentExerciseName(item.name);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
      {managerIsVisible && (
        <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-white pt-6">
          <ExercisesManager {...{ exercises }} />
        </div>
      )}
    </div>
  );
}

export default ExercisesMenu;
