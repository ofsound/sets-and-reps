import type { ExerciseObject } from "../interfaces.ts";

import ExercisesIndexItem from "../components/ExercisesIndexItem.tsx";

type ExercisesIndexProps = {
  exercises: ExerciseObject[];
};

function ExercisesIndex({ exercises }: ExercisesIndexProps) {
  return (
    <div className="bg-gray-500 p-4">
      {exercises.map((item) => (
        <ExercisesIndexItem key={item.id} name={item.name} id={item.id} />
      ))}
    </div>
  );
}

export default ExercisesIndex;
