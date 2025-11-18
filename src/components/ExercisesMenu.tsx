import type { ExerciseObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExercise: (exercise: ExerciseObject) => void;
};

function ExercisesMenu({ exercises, setCurrentExercise }: ExercisesMenuProps) {
  return (
    <div className="w-full flex-1 overflow-auto bg-gray-200 pt-3">
      {exercises
        .filter((item) => item.isCurrent === true)
        .map((item) => (
          <button
            key={item.id}
            className="mx-auto mb-3 block w-9/10 cursor-pointer rounded-lg bg-linear-to-b from-slate-400 via-gray-500 to-neutral-500 py-1 text-white"
            onClick={() => {
              setCurrentExercise(item);
            }}
          >
            {item.name}
          </button>
        ))}
    </div>
  );
}

export default ExercisesMenu;
