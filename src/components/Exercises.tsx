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

import type {
  ExerciseObject,
  SetObject,
  LastValuesFromExercise,
  Dictionary,
} from "../interfaces.ts";

import Exercise from "../components/Exercise.tsx";
import SetAdder from "../components/SetAdder.tsx";
// import ExercisesMenu from "./ExercisesMenu.tsx";
// import ExercisesManager from "./ExercisesManager.tsx";

function Exercises() {
  const exercisesTotalRef = useRef(0);

  const lastValuesFromExercises = useRef<LastValuesFromExercise[]>([]);

  const scroller = useRef(null);

  const [exerciseIndex, setExerciseIndex] = useState(-1);

  const [isActiveArray, setIsActiveArray] = useState<Array<boolean>>([]);

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

  const handleNewAttempt = (index: number) => {
    const newExercises = [...exercises];

    const lastAttempt =
      newExercises[index].attempts[newExercises[index].attempts.length - 1];

    if (lastAttempt?.length !== 0) {
      newExercises[index].attempts.push([]);

      const attemptArray: Dictionary[] = [];

      newExercises[index].attempts.forEach((attempt) => {
        const myObject: Dictionary = {};

        attempt.forEach((value, index) => {
          const indexString = index.toString();
          myObject[indexString] = value;
        });

        attemptArray.push(myObject);
      });

      const newFirestoreDocData = {
        id: newExercises[index].id,
        name: newExercises[index].name,
        attempts: attemptArray,
        order: newExercises[index].order,
      };

      const exerciseRef = doc(db, "exercises", newExercises[index].id);

      updateDoc(exerciseRef, newFirestoreDocData);
    }
  };

  const handleNewSet = (newSet: SetObject) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].attempts[
      newExercises[exerciseIndex].attempts.length - 1
    ].push(newSet);

    const attemptArray: Dictionary[] = [];

    newExercises[exerciseIndex].attempts.forEach((attempt) => {
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

    const exerciseRef = doc(db, "exercises", newExercises[exerciseIndex].id);

    updateDoc(exerciseRef, newFirestoreDocData);
    updateScroller();
  };

  useEffect(() => {
    const tempIsActiveArray = new Array(exercisesTotalRef.current).fill(false);
    tempIsActiveArray[exerciseIndex] = true;
    setIsActiveArray(tempIsActiveArray);
    updateScroller();
    if (lastValuesFromExercises.current[exerciseIndex]) {
      // why would this not be true?
      setLastReps(lastValuesFromExercises.current[exerciseIndex].reps);
      setLastWeight(lastValuesFromExercises.current[exerciseIndex].weight);
    }
  }, [exerciseIndex]);

  useEffect(() => {
    const q = query(collection(db, "exercises"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dataFromFirestore: ExerciseObject[] = [];

      querySnapshot.forEach((doc) => {
        const thisExerciseAttempts: Array<Array<SetObject>> = [];

        const thisExercise = doc.data();

        let lastExerciseReps = 0;
        let lastExerciseWeight = 0;

        thisExercise.attempts.forEach(
          (attempt: { [s: string]: unknown } | ArrayLike<unknown>) => {
            const valuesArray = Object.values(attempt) as SetObject[];

            if (valuesArray[0]) {
              lastExerciseReps = valuesArray[0].reps;
              lastExerciseWeight = valuesArray[0].weight;
            }

            thisExerciseAttempts.push(valuesArray);
          },
        );

        const lastExercisesObject: LastValuesFromExercise = {
          reps: lastExerciseReps,
          weight: lastExerciseWeight,
        };

        lastValuesFromExercises.current.push(lastExercisesObject);

        const rowFromFirestore: ExerciseObject = {
          id: thisExercise.id,
          name: thisExercise.name,
          attempts: thisExerciseAttempts,
          order: thisExercise.order,
        };

        dataFromFirestore.push(rowFromFirestore);
      });

      setExercises(dataFromFirestore);

      if (dataFromFirestore.length - exercisesTotalRef.current === 1) {
        setExerciseIndex(exercisesTotalRef.current);
      }
      exercisesTotalRef.current = dataFromFirestore.length;
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scroller}
        className="[&>*]:last]:animate-pulse max-h-full flex-1 overflow-y-auto"
      >
        {exercises.map((item, index) => (
          <Exercise
            data={item}
            key={index}
            isActive={isActiveArray[index]}
            newAttempt={() => {
              handleNewAttempt(index);
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
