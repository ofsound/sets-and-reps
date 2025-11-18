import type { ExerciseObject } from "../interfaces.ts";

import ExercisesIndex from "../components/ExercisesIndex.tsx";
import ExerciseAdder from "../components/ExerciseAdder.tsx";

type ExercisesManagerProps = {
  exercises: ExerciseObject[];
};

function ExercisesManager({ exercises }: ExercisesManagerProps) {
  return (
    <div>
      <ExercisesIndex {...{ exercises }} />
      <ExerciseAdder {...{ exercises }} />
    </div>
  );
}

export default ExercisesManager;
