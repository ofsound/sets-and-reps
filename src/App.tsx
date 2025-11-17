import { useState, useEffect } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "./firebase-config.ts";

import type { ExerciseObject } from "./interfaces.ts";

import { firestoreMapAttemptsToArrayAttempts } from "./utils/dataConversions.ts";

import AppWelcome from "./components/AppWelcome.tsx";
import AppHeader from "./components/AppHeader.tsx";
import Exercise from "./components/Exercise.tsx";

function App() {
  const [exercises, setExercises] = useState<Array<ExerciseObject>>([]);
  const [currentExerciseID, setCurrentExerciseID] = useState("");

  useEffect(() => {
    const q = query(collection(db, "exercises"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dataFromFirestore: ExerciseObject[] = [];

      querySnapshot.forEach((doc) => {
        const exercise = doc.data();

        const exerciseAttempts = firestoreMapAttemptsToArrayAttempts(
          exercise.attempts,
        );

        const rowFromFirestore: ExerciseObject = {
          id: exercise.id,
          name: exercise.name,
          attempts: exerciseAttempts,
          order: exercise.order,
          isCurrent: exercise.isCurrent,
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
    <div className="flex h-full flex-col bg-gray-200">
      <AppHeader
        {...{ exercises }}
        setCurrentExerciseID={(exerciseIDFromMenu) => {
          setCurrentExerciseID(exerciseIDFromMenu);
        }}
      />
      {!currentExercise && <AppWelcome {...{ exercises }} />}
      {currentExercise && (
        <Exercise exercise={currentExercise} key={currentExercise?.id} />
      )}
    </div>
  );
}

export default App;
