import { useState, useEffect } from "react";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

import type { ExerciseObject, SetObject, Dictionary } from "../interfaces.ts";

import Attempt from "../components/Attempt.tsx";
import SetAdder from "../components/SetAdder.tsx";

type ExerciseProps = {
  exerciseData: ExerciseObject;
};

function Exercise({ exerciseData }: ExerciseProps) {
  const [lastReps, setLastReps] = useState(3);
  const [lastWeight, setLastWeight] = useState(50);

  const handleNewAttempt = () => {
    console.log("try");

    const lastAttempt = exerciseData.attempts[exerciseData.attempts.length - 1];

    if (lastAttempt?.length !== 0) {
      console.log("pass");

      exerciseData.attempts.push([]);

      const attemptArray: Dictionary[] = [];

      exerciseData.attempts.forEach((attempt) => {
        const myObject: Dictionary = {};

        attempt.forEach((value, index) => {
          const indexString = index.toString();
          myObject[indexString] = value;
        });

        attemptArray.push(myObject);
      });

      const newFirestoreDocData = {
        id: exerciseData.id,
        name: exerciseData.name,
        attempts: attemptArray,
        order: exerciseData.order,
      };

      const exerciseRef = doc(db, "exercises", exerciseData.id);

      updateDoc(exerciseRef, newFirestoreDocData);
    } else {
      console.log("failed");
    }
  };

  const handleNewSet = (newSet: SetObject) => {
    exerciseData.attempts[exerciseData.attempts.length - 1].push(newSet);

    const attemptArray: Dictionary[] = [];

    exerciseData.attempts.forEach((attempt) => {
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

    const exerciseRef = doc(db, "exercises", exerciseData.id);

    updateDoc(exerciseRef, newFirestoreDocData);
  };

  handleNewAttempt();
  // this seems like overkill, to always try mostly fail, just trying to have a new attempt stared when open an exercise

  useEffect(() => {
    const arrayIndexForLastAttemptWithData = exerciseData.attempts.length - 2;
    const lastAttemptWithData =
      exerciseData.attempts[arrayIndexForLastAttemptWithData];

    const lastSetInAttempt =
      lastAttemptWithData[lastAttemptWithData.length - 1];

    setLastReps(lastSetInAttempt.reps);
    setLastWeight(lastSetInAttempt.weight);
  }, [exerciseData.attempts]);

  return (
    <div className={`mb-4 overflow-hidden`}>
      <h1 className="my-6 hidden text-center text-2xl font-black">
        {exerciseData.name}
      </h1>

      <div>
        {exerciseData.attempts.map((item, index) => (
          <Attempt
            attempt={item}
            key={index}
            isActive={index === exerciseData.attempts.length - 1}
          />
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
