import { useState } from "react";

import type { ChangeEvent } from "react";

import type { ExerciseObject } from "../interfaces.ts";

import { collection, doc, setDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

type ExerciseAdderProps = {
  exercises: ExerciseObject[];
};

function ExerciseAdder({ exercises }: ExerciseAdderProps) {
  const [newExerciseName, setNewExerciseName] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newExerciseNameInput = event.target as HTMLInputElement;
    setNewExerciseName(newExerciseNameInput.value);
  };

  const handleExerciseAdded = async (newExerciseName: string) => {
    const docRef = doc(collection(db, "exercises"));

    const newExercise = {
      id: docRef.id,
      name: newExerciseName,
      attempts: [],
      order: exercises.length,
      isCurrent: true,
    };

    try {
      await setDoc(docRef, newExercise);
      console.log("Document successfully added!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="mx-4 flex rounded-sm p-4">
      <input
        id="name"
        type="text"
        className="mr-4 ml-auto w-full rounded-md border border-dotted bg-gray-100 p-3 font-bold tabular-nums"
        onChange={handleChange}
        value={newExerciseName}
      />
      <button
        className="block rounded-md border bg-gray-500 px-3 text-white"
        onClick={() => {
          handleExerciseAdded(newExerciseName);
          setNewExerciseName("");
        }}
      >
        New&nbsp;Exercise
      </button>
    </div>
  );
}

export default ExerciseAdder;
