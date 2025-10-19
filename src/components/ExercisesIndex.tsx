import type { exerciseObject } from "../interfaces.ts";

type ExercisesIndexProps = {
  exercises: exerciseObject[];
  deleteExercise: (exerciseID: string) => void;
};

function ExercisesIndex({ exercises, deleteExercise }: ExercisesIndexProps) {
  return (
    <div className="mb-4 border-b-2 border-gray-300 bg-gray-500 p-4">
      {exercises.map((item, index) => (
        <div
          key={index}
          className={`my-2 flex rounded-md border-1 border-white px-3 py-1 text-lg text-white`}
        >
          {item.name} : {item.id}
          <button onClick={() => deleteExercise(item.id)} className="ml-auto">
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExercisesIndex;
