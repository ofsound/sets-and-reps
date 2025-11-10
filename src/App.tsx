import { useState, useEffect } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "./firebase-config.ts";

import type { ExerciseObject, SetObject } from "./interfaces.ts";

import Exercises from "./components/Exercises.tsx";
import ExercisesManager from "./components/ExercisesManager.tsx";
import ExercisesMenu from "./components/ExercisesMenu.tsx";

function App() {
  const [exercises, setExercises] = useState<Array<ExerciseObject>>([]);

  const [currentExerciseID, setCurrentExerciseID] = useState<string>("");

  const setCurrentExerciseIDFromMenu = (currentExerciseIDFromMenu: string) => {
    setCurrentExerciseID(currentExerciseIDFromMenu);
  };

  useEffect(() => {
    const q = query(collection(db, "exercises"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dataFromFirestore: ExerciseObject[] = [];

      querySnapshot.forEach((doc) => {
        const thisExerciseAttempts: Array<Array<SetObject>> = [];

        const thisExercise = doc.data();

        thisExercise.attempts.forEach(
          (attempt: { [s: string]: unknown } | ArrayLike<unknown>) => {
            const valuesArray = Object.values(attempt) as SetObject[];
            thisExerciseAttempts.push(valuesArray);
          },
        );

        const rowFromFirestore: ExerciseObject = {
          id: thisExercise.id,
          name: thisExercise.name,
          attempts: thisExerciseAttempts,
          order: thisExercise.order,
        };

        dataFromFirestore.push(rowFromFirestore);
      });

      setExercises(dataFromFirestore);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full bg-gray-200 p-1">
      <ExercisesManager {...{ exercises }} />

      <ExercisesMenu {...{ exercises }} {...{ setCurrentExerciseIDFromMenu }} />
      <Exercises {...{ currentExerciseID }} />
    </div>
  );
}

export default App;
