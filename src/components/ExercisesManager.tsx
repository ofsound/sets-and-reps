import type { ExerciseObject } from "../interfaces.ts";

import ExercisesIndex from "../components/ExercisesIndex.tsx";
import ExerciseAdder from "../components/ExerciseAdder.tsx";

type ExercisesManagerProps = {
  exercises: ExerciseObject[];
};

function ExercisesManager({ exercises }: ExercisesManagerProps) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-gray-200">
      <ExercisesIndex {...{ exercises }} />
      <ExerciseAdder {...{ exercises }} />
    </div>
  );
}

export default ExercisesManager;
