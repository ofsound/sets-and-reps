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
      <ExercisesIndex exercises={exercises} />
      <ExerciseAdder handleExerciseAdded={handleExerciseAdded} />
      <button
        onClick={hideManager}
        className="absolute right-14 z-101 cursor-pointer text-black"
      >
        Close
      </button>
    </div>
  );
}

export default ExercisesManager;
