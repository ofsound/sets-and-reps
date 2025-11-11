import { useState, useEffect } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "./firebase-config.ts";

import type { ExerciseObject, SetObject } from "./interfaces.ts";

import Exercise from "./components/Exercise.tsx";
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

  const currentExercise = exercises.find(
    (item) => item.id === currentExerciseID,
  );

  return (
    <div className="flex h-full flex-col bg-gray-200 p-1">
      <ExercisesMenu
        {...{ exercises }}
        setCurrentExerciseIDFromMenu={(exerciseIDFromMenu) => {
          setCurrentExerciseID(exerciseIDFromMenu);
        }}
      />
      {currentExercise && ( // Check if data is defined
        <Exercise exerciseObject={currentExercise} key={currentExercise?.id} />
      )}
    </div>
  );
}

export default App;
