import { collection, doc, setDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

import type { ExerciseObject } from "../interfaces.ts";

import ExercisesIndex from "../components/ExercisesIndex.tsx";
import ExerciseAdder from "../components/ExerciseAdder.tsx";

type ExercisesManagerProps = {
  exercises: ExerciseObject[];
  hideManager: () => void;
};

function ExercisesManager({ exercises, hideManager }: ExercisesManagerProps) {
  const handleExerciseAdded = async (newExerciseName: string) => {
    const docRef = doc(collection(db, "exercises"));

    const newExercise = {
      id: docRef.id,
      name: newExerciseName,
      attempts: [],
      order: exercises.length,
    };

    try {
      await setDoc(docRef, newExercise);
      console.log("Document successfully added!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <ExerciseAdder handleExerciseAdded={handleExerciseAdded} />
      <ExercisesIndex exercises={exercises} />
      <button
        onClick={hideManager}
        className="absolute right-0 bottom-6 left-0 mx-auto block w-max cursor-pointer rounded-sm border-1 bg-gray-600 px-3 py-1 text-lg text-white"
      >
        Close Editor
      </button>
    </div>
  );
}

export default ExercisesManager;
