import type { ExerciseObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExerciseID: (exerciseID: string) => void;
  setCurrentExerciseName: (exerciseName: string) => void;
  showManager: () => void;
  hideMenu: () => void;
};

function ExercisesMenu({
  exercises,
  setCurrentExerciseID,
  setCurrentExerciseName,
  showManager,
  hideMenu,
}: ExercisesMenuProps) {
  return (
    <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-gray-200 pt-6">
      {exercises.map((item) => (
        <button
          key={item.id}
          className="mx-auto mb-4 block w-9/10 rounded-md border-1 border-gray-700 bg-gray-600 px-6 py-3 text-lg font-bold text-white"
          onClick={() => {
            setCurrentExerciseID(item.id);
            setCurrentExerciseName(item.name);
            hideMenu();
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={showManager}
        className="mx-auto block w-max cursor-pointer rounded-sm border-1 bg-gray-600 px-3 py-1 text-white"
      >
        Edit Exercises
      </button>
    </div>
  );
}

export default ExercisesMenu;
