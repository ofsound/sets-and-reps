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
      if (newExerciseName) {
        await setDoc(docRef, newExercise);
        console.log("Document successfully added!");
      } else {
        console.error("Exercise name field was left blank.");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="mx-auto flex w-9/10 rounded-sm">
      <input
        id="name"
        type="text"
        className="mr-4 ml-auto w-full rounded-md border border-dotted bg-gray-100 px-2 py-1 tabular-nums"
        onChange={handleChange}
        value={newExerciseName}
      />
      <button
        className="block rounded-md bg-gray-300 px-3 font-semibold text-black"
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
