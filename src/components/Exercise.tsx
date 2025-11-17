import { useState, useEffect, useRef } from "react";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

import type { ExerciseObject, SetObject } from "../interfaces.ts";

import { arrayAttemptsToFirestoreMapAttempts } from "../utils/dataConversion.ts";

import Attempt from "../components/Attempt.tsx";
import SetAdder from "../components/SetAdder.tsx";

type ExerciseProps = {
  exercise: ExerciseObject;
};

function Exercise({ exercise }: ExerciseProps) {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [attemptIndexForEditMode, setAttemptIndexForEditMode] = useState(-1);

  const [lastReps, setLastReps] = useState(3);
  const [lastMeasurement, setLastMeasurement] = useState("20lbs");
  const [lastNotes, setLastNotes] = useState("");

  const [setToUpdate, setSetToUpdate] = useState<SetObject>();

  const scroller = useRef(null);

  const updateExerciseAttemptsInDatabase = (exercise: ExerciseObject) => {
    const exerciseDocRef = doc(db, "exercises", exercise.id);
    updateDoc(exerciseDocRef, {
      attempts: arrayAttemptsToFirestoreMapAttempts(exercise.attempts),
    });
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

  const updateArmedSet = (armedSet: SetObject) => {
    if (setToUpdate) {
      setToUpdate.reps = armedSet.reps;
      setToUpdate.measurement = armedSet.measurement;
      setToUpdate.notes = armedSet.notes;

      updateExerciseAttemptsInDatabase(exercise);
      updateScroller();
    }
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

  const deleteSetInAttempt = (attemptIndex: number, setIndex: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Set?`,
    );

    if (confirmed) {
      exercise.attempts[attemptIndex].splice(setIndex, 1);
      updateExerciseAttemptsInDatabase(exercise);
    } else {
      console.log("Deletion cancelled.");
    }
  };

  const armThisSetForUpdate = (armedSet: SetObject) => {
    setSetToUpdate(armedSet);

    setLastReps(armedSet.reps);
    setLastMeasurement(armedSet.measurement);
    setLastNotes(armedSet.notes);
  };

  useEffect(() => {
    if (exercise.attempts.length > 1) {
      const arrayIndexForLastAttemptWithData = exercise.attempts.length - 2;
      const lastAttemptWithData =
        exercise.attempts[arrayIndexForLastAttemptWithData];
      const lastSetInAttempt =
        lastAttemptWithData[lastAttemptWithData.length - 1];
      setLastReps(lastSetInAttempt.reps);
      setLastMeasurement(lastSetInAttempt.measurement);

      updateScroller();
    }
  }, [exercise.attempts]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-auto" ref={scroller}>
        {exercise.attempts.map((item, index) => (
          <Attempt
            attempt={item}
            key={index}
            {...{ index }}
            {...{ enterEditMode }}
            editModeEnabled={index === attemptIndexForEditMode}
            {...{ deleteAttempt }}
            {...{ deleteSetInAttempt }}
            {...{ armThisSetForUpdate }}
          />
        ))}
      </div>
      <SetAdder
        {...{ appendNewSet }}
        {...{ updateArmedSet }}
        {...{ editModeEnabled }}
        previousReps={lastReps}
        previousMeasurement={lastMeasurement}
        previousNotes={lastNotes}
      />
    </div>
  );
}

export default Exercise;
