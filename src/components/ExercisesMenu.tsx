import type { ExerciseObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setExerciseIndexFromMenu: (exerciseIndex: number) => void;
};

function ExercisesMenu({
  exercises,
  setExerciseIndexFromMenu,
}: ExercisesMenuProps) {
  return (
    <div className="mb-4 border-b-2 border-gray-300 bg-gray-500 p-4">
      {exercises.map((item, index) => (
        <button
          key={index}
          className="mr-2 rounded-md border-1 border-white px-3 py-1 text-lg text-white"
          onClick={() => {
            setExerciseIndexFromMenu(index);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ExercisesMenu;
