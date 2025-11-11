import { useState, useEffect, useRef } from "react";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

import type { ExerciseObject, SetObject, Dictionary } from "../interfaces.ts";

import Attempt from "../components/Attempt.tsx";
import SetAdder from "../components/SetAdder.tsx";

type ExerciseProps = {
  exerciseObject: ExerciseObject;
};

function Exercise({ exerciseObject }: ExerciseProps) {
  const [lastReps, setLastReps] = useState(3);
  const [lastUnit, setLastUnit] = useState("20lbs");

  const scroller = useRef(null);

  const updateExerciseAttemptsInDatabase = (exerciseObject: ExerciseObject) => {
    const attemptArray: Dictionary[] = [];

    exerciseObject.attempts.forEach((attempt) => {
      const myObject: Dictionary = {};

      attempt.forEach((value, index) => {
        const indexString = index.toString();
        myObject[indexString] = value;
      });

      attemptArray.push(myObject);
    });

    const newFirestoreDocData = {
      attempts: attemptArray,
    };

    const exerciseRef = doc(db, "exercises", exerciseObject.id);
    updateDoc(exerciseRef, newFirestoreDocData);
  };

  const updateScroller = () => {
    setTimeout(() => {
      const thisScroller = scroller.current;
      if (thisScroller) {
        (thisScroller as HTMLElement).scrollTop = (
          thisScroller as HTMLElement
        ).scrollHeight;
      }
    });
  };

  const isFirstRenderRef = useRef(true);

  if (isFirstRenderRef.current) {
    const lastAttempt =
      exerciseObject.attempts[exerciseObject.attempts.length - 1];

    // On mount, create an empty attempt, except if it already exists
    if (lastAttempt?.length !== 0) {
      exerciseObject.attempts.push([]);
      updateExerciseAttemptsInDatabase(exerciseObject);
    }
    isFirstRenderRef.current = false;

    updateScroller();
  }

  const handleNewSet = (newSet: SetObject) => {
    exerciseObject.attempts[exerciseObject.attempts.length - 1].push(newSet);
    updateExerciseAttemptsInDatabase(exerciseObject);
    updateScroller();
  };

  useEffect(() => {
    if (exerciseObject.attempts.length > 1) {
      const arrayIndexForLastAttemptWithData =
        exerciseObject.attempts.length - 2;
      const lastAttemptWithData =
        exerciseObject.attempts[arrayIndexForLastAttemptWithData];
      const lastSetInAttempt =
        lastAttemptWithData[lastAttemptWithData.length - 1];
      setLastReps(lastSetInAttempt.reps);
      setLastUnit(lastSetInAttempt.unit);

      updateScroller();
    }
  }, [exerciseObject.attempts]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-auto" ref={scroller}>
        {exerciseObject.attempts.map((item, index) => (
          <Attempt attempt={item} key={index} />
        ))}
      </div>
      <SetAdder
        handleNewSet={handleNewSet}
        previousReps={lastReps}
        previousUnit={lastUnit}
      />
    </div>
  );
}

export default Exercise;
