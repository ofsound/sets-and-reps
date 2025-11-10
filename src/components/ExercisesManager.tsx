import {
  collection,
  doc,
  setDoc,
  getCountFromServer,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase-config.ts";

import type { ExerciseObject } from "../interfaces.ts";

import ExercisesIndex from "../components/ExercisesIndex.tsx";
import ExerciseAdder from "../components/ExerciseAdder.tsx";

type ExercisesManagerProps = {
  exercises: ExerciseObject[];
};

function ExercisesManager({ exercises }: ExercisesManagerProps) {
  const handleExerciseAdded = async (newExerciseName: string) => {
    const collectionRef = collection(db, "exercises");
    const snapshot = await getCountFromServer(collectionRef);
    // does this await just pause the code right here?
    const exercisesTotal = snapshot.data().count;

    const docRef = doc(collectionRef);

    const newExercise = {
      id: docRef.id,
      name: newExerciseName,
      attempts: [],
      order: exercisesTotal,
    };

    try {
      await setDoc(docRef, newExercise);
      console.log("Document successfully added!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // how is this async not at the root, but inside ExercisesManager
  const deleteExercise = async (exerciseID: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Exercise?`,
    );

    if (confirmed) {
      const docRef = doc(db, "exercises", exerciseID);
      try {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    } else {
      console.log("Deletion cancelled.");
    }
  };

  return (
    <div className="mb-4 hidden border-b-2 border-gray-300 bg-gray-500 p-4">
      <ExerciseAdder handleExerciseAdded={handleExerciseAdded} />
      <ExercisesIndex exercises={exercises} deleteExercise={deleteExercise} />
    </div>
  );
}

export default ExercisesManager;
