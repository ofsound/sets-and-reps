import { useState, useRef } from "react";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

import type { ExerciseObject, SetObject } from "../interfaces.ts";

import { arrayAttemptsToFirestoreMapAttempts } from "../utils/dataConversions.ts";

import { deleteSetFromAttempts } from "../utils/arrayFunctions.ts";

import Attempt from "../components/Attempt.tsx";
import SetConsole from "../components/SetConsole.tsx";

type ExerciseProps = {
  exercise: ExerciseObject;
};

function Exercise({ exercise }: ExerciseProps) {
  const [setAdderKey, setSetConsoleKey] = useState(0);

  let repsDefault = 3;
  let measurementDefault = "20lbs";

  if (exercise.attempts.length > 1) {
    const lastAttemptWithData = exercise.attempts[exercise.attempts.length - 2];
    const lastSetInAttempt =
      lastAttemptWithData[lastAttemptWithData.length - 1];

    repsDefault = lastSetInAttempt.reps;
    measurementDefault = lastSetInAttempt.measurement;
  }

  const [initialReps, setInitialReps] = useState(repsDefault);
  const [initialMeasurement, setInitialMeasurement] =
    useState(measurementDefault);
  const [initialNotes, setInitialNotes] = useState("");

  const [setToUpdate, setSetToUpdate] = useState<SetObject>();

  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [attemptIndexForEditMode, setAttemptIndexForEditMode] = useState(-1);

  const scroller = useRef<HTMLInputElement>(null);

  const updateExerciseAttemptsInDatabase = (exercise: ExerciseObject) => {
    const exerciseDocRef = doc(db, "exercises", exercise.id);
    updateDoc(exerciseDocRef, {
      attempts: arrayAttemptsToFirestoreMapAttempts(exercise.attempts),
    });
  };

  const updateScroller = () => {
    const thisScroller = scroller.current;
    if (thisScroller) {
      thisScroller.scrollTop = thisScroller.scrollHeight;
    }
  };

  const isFirstRenderRef = useRef(true);

  if (isFirstRenderRef.current) {
    const lastAttempt = exercise.attempts[exercise.attempts.length - 1];

    // When switching to an Exercise, create an empty attempt – except if it already exists
    if (lastAttempt?.length !== 0) {
      exercise.attempts.push([]);
      updateExerciseAttemptsInDatabase(exercise);
    }
    isFirstRenderRef.current = false;

    updateScroller();
  }

  const enterEditMode = (attemptIndex: number) => {
    if (attemptIndex === -1) {
      setEditModeEnabled(false);
    } else {
      setEditModeEnabled(true);
    }
    setAttemptIndexForEditMode(attemptIndex);
  };

  const appendNewSet = (newSet: SetObject) => {
    exercise.attempts[exercise.attempts.length - 1].push(newSet);
    updateExerciseAttemptsInDatabase(exercise);
    updateScroller();
  };

  const deleteAttempt = (attemptIndex: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Attempt?`,
    );

    if (confirmed) {
      exercise.attempts.splice(attemptIndex, 1);
      updateExerciseAttemptsInDatabase(exercise);
    } else {
      console.log("Deletion cancelled.");
    }
  };

  const deleteSet = (set: SetObject) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Set?`,
    );

    if (confirmed) {
      deleteSetFromAttempts(exercise.attempts, set);
      updateExerciseAttemptsInDatabase(exercise);
    } else {
      console.log("Deletion cancelled.");
    }
  };

  const armThisSetForUpdate = (armedSet: SetObject) => {
    setSetConsoleKey((prevKey) => prevKey + 1);
    setSetToUpdate(armedSet);
    setInitialReps(armedSet.reps);
    setInitialMeasurement(armedSet.measurement);
    setInitialNotes(armedSet.notes);
  };

  const updateArmedSet = (armedSet: SetObject) => {
    if (setToUpdate) {
      setToUpdate.reps = armedSet.reps;
      setToUpdate.measurement = armedSet.measurement;
      setToUpdate.notes = armedSet.notes;

      updateExerciseAttemptsInDatabase(exercise);
      updateScroller();
    }
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="absolute -top-4.5 z-100 h-5 w-full bg-gray-200 blur-xs"></div>
      <div className="flex-1 overflow-auto" ref={scroller}>
        {exercise.attempts.map((item, index) => (
          <Attempt
            attempt={item}
            key={index}
            {...{ index }}
            {...{ enterEditMode }}
            editModeEnabled={index === attemptIndexForEditMode}
            {...{ deleteAttempt }}
            {...{ deleteSet }}
            {...{ armThisSetForUpdate }}
          />
        ))}
      </div>
      <SetConsole
        key={setAdderKey}
        {...{ appendNewSet }}
        {...{ updateArmedSet }}
        {...{ editModeEnabled }}
        {...{ initialReps }}
        {...{ initialMeasurement }}
        {...{ initialNotes }}
      />
    </div>
  );
}

export default Exercise;
