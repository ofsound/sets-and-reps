import type { ExerciseObject } from "../interfaces.ts";

import ExercisesIndexItem from "../components/ExercisesIndexItem.tsx";

type ExercisesIndexProps = {
  exercises: ExerciseObject[];
};

function ExercisesIndex({ exercises }: ExercisesIndexProps) {
  return (
    <div className="pt-3">
      {exercises.map((item) => (
        <ExercisesIndexItem
          key={item.id}
          name={item.name}
          id={item.id}
          isCurrent={item.isCurrent}
        />
      ))}
    </div>
  );
}

export default ExercisesIndex;
