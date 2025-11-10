import type { ExerciseObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExerciseIDFromMenu: (exerciseID: string) => void;
};

function ExercisesMenu({
  exercises,
  setCurrentExerciseIDFromMenu,
}: ExercisesMenuProps) {
  return (
    <div className="border-b-2 border-gray-300 bg-gray-500 p-4">
      {exercises.map((item, index) => (
        <button
          key={index}
          className="mr-2 rounded-md border-1 border-gray-700 bg-black px-1.5 py-1 text-sm font-bold text-white"
          onClick={() => {
            setCurrentExerciseIDFromMenu(item.id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ExercisesMenu;
