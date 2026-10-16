import { useState, useEffect, useReducer } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "./firebase-config.ts";

import type { ExerciseObject } from "./interfaces.ts";

import { firestoreMapAttemptsToArrayAttempts } from "./utils/dataConversions.ts";
import {
  createRestTimerState,
  restTimerReducer,
  REST_TIMER_STORAGE_KEY,
} from "./utils/restTimer.ts";

import AppHeader from "./components/AppHeader.tsx";
import AppWelcome from "./components/AppWelcome.tsx";
import Exercise from "./components/Exercise.tsx";
import ExercisesMenu from "./components/ExercisesMenu.tsx";
import ExercisesManager from "./components/ExercisesManager.tsx";

function App() {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  const [currentAppView, setCurrentAppView] = useState("welcome");

  const [appHeading, setAppHeading] = useState("Exercises");

  const showManager = () => {
    setCurrentAppView("manager");
    setAppHeading("Edit Exercises");
  };

  const toggleMenu = () => {
    if (currentAppView === "menu" && currentExercise) {
      setCurrentAppView("exercise");
      setAppHeading(currentExercise?.name);
    } else {
      setCurrentAppView("menu");
      setAppHeading("Exercises");
    }
  };

  const [exercises, setExercises] = useState<Array<ExerciseObject>>([]);
  const [currentExercise, setCurrentExercise] = useState<ExerciseObject>();
  const [{ lastSetLoggedAt }, dispatchRestTimer] = useReducer(
    restTimerReducer,
    null,
    () => {
      try {
        return createRestTimerState(
          localStorage.getItem(REST_TIMER_STORAGE_KEY),
        );
      } catch {
        return createRestTimerState(null);
      }
    },
  );

  useEffect(() => {
    if (lastSetLoggedAt === null) return;
    try {
      localStorage.setItem(REST_TIMER_STORAGE_KEY, String(lastSetLoggedAt));
    } catch {
      // The active timer still works when browser storage is unavailable.
    }
  }, [lastSetLoggedAt]);

  const handleSetLogged = (date: number) => {
    dispatchRestTimer({ type: "setLogged", date });
  };

  const openExercise = (exercise: ExerciseObject) => {
    setCurrentExercise(exercise);
    setAppHeading(exercise.name);
    setCurrentAppView("exercise");
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
          settings:
            typeof exercise.settings === "string" ? exercise.settings : "",
          attempts: exerciseAttempts,
          order: exercise.order,
          isCurrent: exercise.isCurrent,
        };

        dataFromFirestore.push(rowFromFirestore);
      });

      setExercises(dataFromFirestore);

      const setDates = dataFromFirestore.flatMap((exercise) =>
        exercise.attempts.flatMap((attempt) => attempt.map((set) => set.date)),
      );

      dispatchRestTimer({
        type: "initialize",
        date: setDates.length > 0 ? Math.max(...setDates) : null,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full flex-col bg-gray-200">
      <AppHeader
        {...{ showManager }}
        {...{ toggleMenu }}
        {...{ currentAppView }}
        {...{ appHeading }}
        {...{ lastSetLoggedAt }}
        exercise={
          currentAppView === "exercise"
            ? exercises.find((exercise) => exercise.id === currentExercise?.id)
            : undefined
        }
      />
      {currentAppView === "welcome" && <AppWelcome {...{ exercises }} />}

      {currentAppView === "exercise" && currentExercise && (
        <Exercise
          exercise={currentExercise}
          key={currentExercise.id}
          onSetLogged={handleSetLogged}
        />
      )}
      {currentAppView === "menu" && (
        <ExercisesMenu {...{ exercises }} setCurrentExercise={openExercise} />
      )}
      {currentAppView === "manager" && <ExercisesManager {...{ exercises }} />}
    </div>
  );
}

export default App;
