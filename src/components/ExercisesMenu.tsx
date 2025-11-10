import { useState } from "react";

import type { ExerciseObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExerciseIDFromMenu: (exerciseID: string) => void;
};

function ExercisesMenu({
  exercises,
  setCurrentExerciseIDFromMenu,
}: ExercisesMenuProps) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [currentExerciseName, setCurrentExerciseName] = useState("");

  return (
    <div>
      <div className="flex h-12 justify-between bg-gradient-to-b from-indigo-700 to-slate-800 px-4 py-2">
        <div className="flex-1 text-center text-lg font-bold text-white">
          {currentExerciseName}
        </div>
        <button
          onClick={() => {
            setMenuIsVisible((menuIsVisible) => !menuIsVisible);
          }}
          className="absolute right-4 cursor-pointer"
        >
          <svg viewBox="0 0 100 80" width="25" height="25">
            <rect fill="white" width="100" height="20" rx="10"></rect>
            <rect fill="white" y="30" width="100" height="20" rx="10"></rect>
            <rect fill="white" y="60" width="100" height="20" rx="10"></rect>
          </svg>
        </button>
      </div>
      {menuIsVisible && (
        <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-white pt-6">
          {exercises.map((item, index) => (
            <button
              key={index}
              className="mx-auto mb-4 block w-60 rounded-md border-1 border-gray-700 bg-gray-600 px-6 py-2.5 text-lg font-bold text-white"
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
    </div>
  );
}

export default ExercisesMenu;
