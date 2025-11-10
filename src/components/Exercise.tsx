import { useState, useEffect } from "react";

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
  const [lastWeight, setLastWeight] = useState(50);

  const handleNewAttempt = () => {
    const lastAttempt =
      exerciseObject.attempts[exerciseObject.attempts.length - 1];

    if (lastAttempt?.length !== 0) {
      exerciseObject.attempts.push([]);

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
        id: exerciseObject.id,
        name: exerciseObject.name,
        attempts: attemptArray,
        order: exerciseObject.order,
      };

      const exerciseRef = doc(db, "exercises", exerciseObject.id);

      updateDoc(exerciseRef, newFirestoreDocData);
    }
  };

  const handleNewSet = (newSet: SetObject) => {
    exerciseObject.attempts[exerciseObject.attempts.length - 1].push(newSet);

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

  handleNewAttempt();
  // this seems like overkill, to always try mostly fail, just trying to always have a new attempt started when open an exercise, better way to always have an open blank last attempt?

  useEffect(() => {
    const arrayIndexForLastAttemptWithData = exerciseObject.attempts.length - 2;
    const lastAttemptWithData =
      exerciseObject.attempts[arrayIndexForLastAttemptWithData];

    const lastSetInAttempt =
      lastAttemptWithData[lastAttemptWithData.length - 1];

    setLastReps(lastSetInAttempt.reps);
    setLastWeight(lastSetInAttempt.weight);
  }, [exerciseObject.attempts]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="my-6 hidden text-center text-2xl font-black">
        {exerciseObject.name}
      </h1>

      <div className="flex-1 overflow-auto">
        {exerciseObject.attempts.map((item, index) => (
          <Attempt attempt={item} key={index} />
        ))}
      </div>
      <SetAdder
        handleNewSet={handleNewSet}
        previousReps={lastReps}
        previousWeight={lastWeight}
      />
    </div>
  );
}

export default Exercise;
