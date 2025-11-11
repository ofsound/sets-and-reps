import {
  collection,
  doc,
  setDoc,
  getCountFromServer,
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

  return (
    <div className="bg-gray-500">
      <ExerciseAdder handleExerciseAdded={handleExerciseAdded} />
      <ExercisesIndex exercises={exercises} />
    </div>
  );
}

export default ExercisesManager;
