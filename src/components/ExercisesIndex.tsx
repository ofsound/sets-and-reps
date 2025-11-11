import type { ExerciseObject } from "../interfaces.ts";

type ExercisesIndexProps = {
  exercises: ExerciseObject[];
  deleteExercise: (exerciseID: string) => void;
};

function ExercisesIndex({ exercises, deleteExercise }: ExercisesIndexProps) {
  return (
    <div className="bg-gray-500 p-4">
      {exercises.map((item) => (
        <div
          key={item.id}
          className={
            "my-3 flex rounded-md border-1 border-white px-3 py-1 text-lg text-white"
          }
        >
          {item.name} : {item.id}
          <input
            type="checkbox"
            name="optionName"
            value="optionValue"
            className="ml-auto"
          ></input>
          <button onClick={() => deleteExercise(item.id)} className="ml-10">
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExercisesIndex;
