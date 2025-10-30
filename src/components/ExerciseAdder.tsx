import { useState } from "react";

import type { ChangeEvent } from "react";

type ExerciseAdderProps = {
  handleExerciseAdded: (newExerciseName: string) => void;
};

function ExerciseAdder({ handleExerciseAdded }: ExerciseAdderProps) {
  const [newExerciseName, setNewExerciseName] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newExerciseNameInput = event.target as HTMLInputElement;
    setNewExerciseName(newExerciseNameInput.value);
  };

  return (
    <div className="flex bg-gray-500 p-4 shadow-md">
      <input
        id="name"
        type="text"
        className="text-md mr-4 ml-auto h-8 w-full rounded-md border-1 border-dotted bg-gray-100 p-3 text-left font-bold tabular-nums"
        onChange={handleChange}
        value={newExerciseName}
      />
      <button
        className="block h-8 rounded-md border-1 px-3 text-white"
        onClick={() => {
          handleExerciseAdded(newExerciseName);
          setNewExerciseName("");
        }}
      >
        Add&nbsp;Exercise
      </button>
    </div>
  );
}

export default ExerciseAdder;
