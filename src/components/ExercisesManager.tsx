import type { ExerciseObject } from "../interfaces.ts";

import ExercisesIndex from "../components/ExercisesIndex.tsx";
import ExerciseAdder from "../components/ExerciseAdder.tsx";

type ExercisesManagerProps = {
  exercises: ExerciseObject[];
};

function ExercisesManager({ exercises }: ExercisesManagerProps) {
  return (
    <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-gray-200">
      <ExercisesIndex {...{ exercises }} />
      <ExerciseAdder {...{ exercises }} />
    </div>
  );
}

export default ExercisesManager;
