import type { ExerciseObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExerciseID: (exerciseID: string) => void;
  setCurrentExerciseName: (exerciseName: string) => void;
  hideMenu: () => void;
};

function ExercisesMenu({
  exercises,
  setCurrentExerciseID,
  setCurrentExerciseName,
  hideMenu,
}: ExercisesMenuProps) {
  return (
    <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-gray-200 pt-3">
      {exercises
        .filter((item) => item.isCurrent === true)
        .map((item) => (
          <button
            key={item.id}
            className="mx-auto mb-3 block w-9/10 cursor-pointer rounded-lg bg-linear-to-b from-slate-400 via-gray-500 to-neutral-500 py-1 text-white"
            onClick={() => {
              setCurrentExerciseID(item.id);
              setCurrentExerciseName(item.name);
              hideMenu();
            }}
          >
            {item.name}
          </button>
        ))}
    </div>
  );
}

export default ExercisesMenu;
