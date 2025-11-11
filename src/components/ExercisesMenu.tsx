import type { ExerciseObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExerciseIDFromMenu: (exerciseID: string) => void;
  setCurrentExerciseName: (exerciseName: string) => void;
  showManager: () => void;
};

function ExercisesMenu({
  exercises,
  setCurrentExerciseIDFromMenu,
  setCurrentExerciseName,
  showManager,
}: ExercisesMenuProps) {
  return (
    <div className="absolute z-100 h-[calc(100vh-48px)] w-full bg-gray-200 pt-6">
      {exercises.map((item) => (
        <button
          key={item.id}
          className="mx-auto mb-4 block w-9/10 rounded-md border-1 border-gray-700 bg-gray-600 px-6 py-3 text-lg font-bold text-white"
          onClick={() => {
            setCurrentExerciseIDFromMenu(item.id);
            setCurrentExerciseName(item.name);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={showManager}
        className="absolute right-14 z-101 cursor-pointer text-black"
      >
        Edit
      </button>
    </div>
  );
}

export default ExercisesMenu;
