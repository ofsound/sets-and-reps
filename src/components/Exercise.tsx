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
  const scroller = useRef(null);

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

  const [lastReps, setLastReps] = useState(3);
  const [lastUnit, setLastUnit] = useState("");

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

    updateScroller();
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

    updateScroller();
  };

  handleNewAttempt();
  // this seems like overkill, to always try mostly fail, just trying to always have a new attempt started when open an exercise, better way to always have an open blank last attempt?

  useEffect(() => {
    console.log(exerciseObject.attempts);

    const arrayIndexForLastAttemptWithData = exerciseObject.attempts.length - 2;
    const lastAttemptWithData =
      exerciseObject.attempts[arrayIndexForLastAttemptWithData];

    const lastSetInAttempt =
      lastAttemptWithData[lastAttemptWithData.length - 1];

    setLastReps(lastSetInAttempt.reps);
    setLastUnit(lastSetInAttempt.unit);
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
