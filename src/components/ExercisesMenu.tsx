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
  const [currentExerciseName, setCurrentExerciseName] = useState("default");

  return (
    <div>
      <div className="flex justify-between border-b-2 border-gray-300 bg-gray-500 px-4 py-2">
        <div>{currentExerciseName}</div>
        <button
          onClick={() => {
            setMenuIsVisible((menuIsVisible) => !menuIsVisible);
          }}
        >
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
          </svg>
        </button>
      </div>
      {menuIsVisible && (
        <div className="absolute z-100 h-[calc(100vh-64px)] w-full bg-blue-200">
          {exercises.map((item, index) => (
            <button
              key={index}
              className="mx-auto mb-2 block rounded-md border-1 border-gray-700 bg-black px-1.5 py-1 text-lg font-bold text-white"
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
