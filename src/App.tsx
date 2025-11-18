import { useState, useEffect } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "./firebase-config.ts";

import type { ExerciseObject } from "./interfaces.ts";

import { firestoreMapAttemptsToArrayAttempts } from "./utils/dataConversions.ts";

import AppHeader from "./components/AppHeader.tsx";
import AppWelcome from "./components/AppWelcome.tsx";
import Exercise from "./components/Exercise.tsx";
import ExercisesMenu from "./components/ExercisesMenu.tsx";
import ExercisesManager from "./components/ExercisesManager.tsx";

function App() {
  window.addEventListener("contextmenu", (e) => {
    // e.preventDefault();
  });

  const [currentExerciseName, setCurrentExerciseName] = useState("Exercises");

  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [managerIsVisible, setManagerIsVisible] = useState(false);

  const showManager = () => {
    setManagerIsVisible(true);
  };

  const hideManager = () => {
    setManagerIsVisible(false);
  };

  const hideMenu = () => {
    setMenuIsVisible(false);
  };

  const toggleMenu = () => {
    setMenuIsVisible((menuIsVisible) => !menuIsVisible);
  };

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
        {...{ toggleMenu }}
        {...{ showManager }}
        {...{ hideManager }}
        {...{ hideMenu }}
        {...{ managerIsVisible }}
        {...{ menuIsVisible }}
        {...{ currentExerciseName }}
      />
      {!currentExercise && !managerIsVisible && !menuIsVisible && (
        <AppWelcome {...{ exercises }} />
      )}
      {currentExercise && (
        <Exercise exercise={currentExercise} key={currentExercise?.id} />
      )}
      {menuIsVisible && !managerIsVisible && (
        <ExercisesMenu
          {...{ exercises }}
          setCurrentExerciseID={(exerciseIDFromMenu) => {
            setCurrentExerciseID(exerciseIDFromMenu);
          }}
          {...{ hideMenu }}
          {...{ setCurrentExerciseName }}
        />
      )}
      {managerIsVisible && <ExercisesManager {...{ exercises }} />}
    </div>
  );
}

export default App;
