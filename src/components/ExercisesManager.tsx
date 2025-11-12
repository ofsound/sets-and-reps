import type { ExerciseObject } from "../interfaces.ts";

import ExercisesIndex from "../components/ExercisesIndex.tsx";
import ExerciseAdder from "../components/ExerciseAdder.tsx";

type ExercisesManagerProps = {
  exercises: ExerciseObject[];
  hideManager: () => void;
};

function ExercisesManager({ exercises, hideManager }: ExercisesManagerProps) {
  return (
    <div>
      <ExerciseAdder {...{ exercises }} />
      <ExercisesIndex {...{ exercises }} />
      <button
        onClick={hideManager}
        className="absolute right-0 bottom-6 left-0 mx-auto block w-max cursor-pointer rounded-sm border-1 bg-gray-600 px-3 py-1 text-lg text-white"
      >
        Close Editor
      </button>
    </div>
  );
}

export default ExercisesManager;
