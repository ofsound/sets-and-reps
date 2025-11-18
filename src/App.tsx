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
  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });

  const [currentView, setCurrentView] = useState("welcome");

  const [appHeading, setAppHeading] = useState("Exercises");

  const showManager = () => {
    setCurrentView("manager");
    setAppHeading("Edit Exercises");
  };

  const toggleMenu = () => {
    if (currentView === "menu" && currentExercise) {
      setCurrentView("exercise");
      setAppHeading(currentExercise?.name);
    } else {
      setCurrentView("menu");
      setAppHeading("Exercises");
    }
  };

  const [exercises, setExercises] = useState<Array<ExerciseObject>>([]);
  const [currentExercise, setCurrentExercise] = useState<ExerciseObject>();

  const openExercise = (exercise: ExerciseObject) => {
    setCurrentExercise(exercise);
    setAppHeading(exercise.name);
    setCurrentView("exercise");
  };

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

  return (
    <div className="flex h-full flex-col bg-gray-200">
      <AppHeader
        {...{ showManager }}
        {...{ toggleMenu }}
        {...{ currentView }}
        {...{ appHeading }}
      />
      {currentView === "welcome" && <AppWelcome {...{ exercises }} />}

      {currentView === "exercise" && currentExercise && (
        <Exercise exercise={currentExercise} key={currentExercise.id} />
      )}
      {currentView === "menu" && (
        <ExercisesMenu {...{ exercises }} setCurrentExercise={openExercise} />
      )}
      {currentView === "manager" && <ExercisesManager {...{ exercises }} />}
    </div>
  );
}

export default App;
