import { useState, useEffect } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "./firebase-config.ts";

import type { ExerciseObject, SetObject } from "./interfaces.ts";

import Exercise from "./components/Exercise.tsx";
import ExercisesManager from "./components/ExercisesManager.tsx";
import ExercisesMenu from "./components/ExercisesMenu.tsx";

function App() {
  const [exercises, setExercises] = useState<Array<ExerciseObject>>([]);
  const [currentExerciseID, setCurrentExerciseID] = useState<string>("");

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
    <div className="flex h-full flex-col bg-gray-200 p-1">
      <ExercisesManager {...{ exercises }} />
      <ExercisesMenu
        {...{ exercises }}
        setCurrentExerciseIDFromMenu={(exerciseIDFromMenu) => {
          setCurrentExerciseID(exerciseIDFromMenu);
        }}
      />
      {exercises
        .filter((item) => item.id === currentExerciseID)
        .map((item, index) => (
          <Exercise exerciseObject={item} key={index} />
        ))}
    </div>
  );
}

export default App;
