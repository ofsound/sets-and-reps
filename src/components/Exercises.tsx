import { useState, useEffect, useRef } from "react";

import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase-config.ts";

import type { ExerciseObject, SetObject, Dictionary } from "../interfaces.ts";

import Exercise from "../components/Exercise.tsx";
import SetAdder from "../components/SetAdder.tsx";

type ExercisesProps = {
  currentExerciseID: string;
};

function Exercises({ currentExerciseID }: ExercisesProps) {
  const scroller = useRef(null);

  const [exercises, setExercises] = useState<Array<ExerciseObject>>([]);

  const [lastReps, setLastReps] = useState(3);
  const [lastWeight, setLastWeight] = useState(50);

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

  const handleNewAttempt = () => {
    const newExercises = [...exercises];

    const currentExercise = newExercises.find(
      (item) => item.id === currentExerciseID,
    );

    if (currentExercise) {
      const lastAttempt =
        currentExercise.attempts[currentExercise.attempts.length - 1];

      if (lastAttempt?.length !== 0) {
        currentExercise.attempts.push([]);

        const attemptArray: Dictionary[] = [];

        currentExercise.attempts.forEach((attempt) => {
          const myObject: Dictionary = {};

          attempt.forEach((value, index) => {
            const indexString = index.toString();
            myObject[indexString] = value;
          });

          attemptArray.push(myObject);
        });

        const newFirestoreDocData = {
          id: currentExercise.id,
          name: currentExercise.name,
          attempts: attemptArray,
          order: currentExercise.order,
        };

        const exerciseRef = doc(db, "exercises", currentExercise.id);

        updateDoc(exerciseRef, newFirestoreDocData);
      }
    }
  };

  const handleNewSet = (newSet: SetObject) => {
    const newExercises = [...exercises];

    const currentExercise = newExercises.find(
      (item) => item.id === currentExerciseID,
    );

    if (currentExercise) {
      currentExercise.attempts[currentExercise.attempts.length - 1].push(
        newSet,
      );

      const attemptArray: Dictionary[] = [];

      currentExercise.attempts.forEach((attempt) => {
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

      const exerciseRef = doc(db, "exercises", currentExercise.id);

      updateDoc(exerciseRef, newFirestoreDocData);
      // should this have some async promise wait going on?
      updateScroller();
    }
  };

  useEffect(() => {
    updateScroller();

    const currentExercise = exercises.find(
      (item) => item.id === currentExerciseID,
    );

    if (currentExercise?.attempts.length) {
      const arrayIndex = currentExercise?.attempts.length - 2;

      const lastAttemptWithData = currentExercise?.attempts[arrayIndex];

      const lastSetInAttempt =
        lastAttemptWithData[lastAttemptWithData.length - 1];

      setLastReps(lastSetInAttempt.reps);
      setLastWeight(lastSetInAttempt.weight);
    }
  }, [currentExerciseID, exercises]);

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

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scroller}
        className="[&>*]:last]:animate-pulse max-h-full flex-1 overflow-y-auto"
      >
        {exercises
          .filter((item) => item.id === currentExerciseID)
          .map((item, index) => (
            <Exercise
              data={item}
              key={index}
              newAttempt={() => {
                handleNewAttempt();
              }}
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

export default Exercises;
