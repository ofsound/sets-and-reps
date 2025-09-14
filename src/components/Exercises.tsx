import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";

import { v4 as uuidv4 } from "uuid";

import Exercise from "../components/Exercise.tsx";

interface setObject {
  reps: number;
  weight: number;
  notes: string;
  date: number;
}

interface rowObject {
  id: string;
  name: string;
  attempts: setObject[][];
}

function Exercises() {
  const scroller = useRef(null);

  const [newName, setNewName] = useState("");

  const [exerciseIndex, setExerciseIndex] = useState(0);

  const [isActiveArray, setIsActiveArray] = useState<Array<boolean>>([]);

  const [exercises, setExercises] = useState<Array<rowObject>>(() => {
    try {
      const storedExercises = localStorage.getItem("exercises");
      return storedExercises ? JSON.parse(storedExercises) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  const handleNewAttempt = (index: number) => {
    const newExercises = [...exercises];

    const lastAttempt =
      newExercises[index].attempts[newExercises[index].attempts.length - 1];

    if (lastAttempt.length !== 0) {
      newExercises[index].attempts.push([]);
      localStorage.setItem("exercises", JSON.stringify(newExercises));
      setExercises(newExercises);
    }
  };

  const handleNewExercise = () => {
    const newExercise = {
      id: uuidv4(),
      name: newName,
      attempts: [],
    };

    const newExercises = [...exercises];
    newExercises.push(newExercise);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
    setExercises(newExercises);
  };

  const handleNewSet = (index: number, newSet: setObject) => {
    const newExercises = [...exercises];
    newExercises[index].attempts[newExercises[index].attempts.length - 1].push(
      newSet,
    );
    localStorage.setItem("exercises", JSON.stringify(newExercises));
    setExercises(newExercises);

    updateScroller();
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

  const handleToggleVisibility = (index: number) => {
    const tempIsActiveArray = [];

    for (let i = 0; i < exercises.length; i++) {
      tempIsActiveArray[i] = false;

      if (index === i) {
        tempIsActiveArray[i] = true;
      }
    }

    setIsActiveArray(tempIsActiveArray);
    updateScroller();
  };

  useEffect(() => {
    // const newExercises = [
    //   {
    //     name: "Lateral Raises",
    //     attempts: [
    //       [
    //         { reps: 3, weight: 35, notes: "no belt", date: 9823498938 },
    //         { reps: 4, weight: 25, notes: "no belt", date: 9823498938 },
    //       ],
    //       [
    //         { reps: 2, weight: 15, notes: "no belt", date: 9823498938 },
    //         { reps: 2, weight: 15, notes: "no belt", date: 9823498938 },
    //       ],
    //     ],
    //   },
    //   {
    //     name: "Pec Fly",
    //     attempts: [
    //       [
    //         { reps: 3, weight: 35, notes: "no belt", date: 9823498938 },
    //         { reps: 4, weight: 25, notes: "no belt", date: 9823498938 },
    //       ],
    //       [
    //         { reps: 3, weight: 35, notes: "no belt", date: 9823498938 },
    //         { reps: 4, weight: 25, notes: "no belt", date: 9823498938 },
    //       ],
    //     ],
    //   },
    // ];
    // localStorage.setItem("exercises", JSON.stringify(newExercises));
    // setExercises(newExercises);
  }, []);

  const [reps, setReps] = useState(3);
  const [weight, setWeight] = useState(50);
  const [notes, setNotes] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const theInput = event.target as HTMLInputElement;
    const newValue = parseInt(theInput.value, 10);

    switch (theInput.id) {
      case "reps":
        setReps(newValue);
        break;
      case "weight":
        setWeight(newValue);
        break;
      case "notes":
        setNotes(theInput.value);
        break;
      case "name":
        setNewName(theInput.value);
        break;
    }
  };

  const trySetReps = (newValue: number) => {
    if (newValue >= 0 && newValue <= 99) {
      setReps(newValue);
    }
  };

  const trySetWeight = (newValue: number) => {
    if (newValue >= 0 && newValue <= 300) {
      setWeight(newValue);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex bg-gray-300 p-4 shadow-md">
        <input
          id="name"
          type="text"
          className="mr-10 ml-auto h-10 w-full rounded-md border-1 border-dotted bg-gray-100 p-3 text-left text-xl font-bold tabular-nums"
          onChange={handleChange}
        />

        <button
          className="block h-10 rounded-md border-1 p-2"
          onClick={handleNewExercise}
        >
          Add&nbsp;Exercise
        </button>
      </div>

      <div className="mb-4 bg-gray-500 p-4">
        {exercises.map((item, index) => (
          <button
            key={index}
            className="mr-2 rounded-sm border-1 border-white px-2 text-white"
            onClick={() => {
              setExerciseIndex(index);
              handleToggleVisibility(index);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

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
      <div className="mx-auto mt-4 flex w-full flex-col border-t-1 border-white bg-gray-400 py-4">
        <div className="flex justify-center gap-12 pt-3 pb-6">
          <div className="flex h-full">
            <div className="flex-col">
              <div className="mb-6 text-center text-sm font-bold">Reps</div>
              <div className="flex">
                <div className="flex flex-col gap-3">
                  <button
                    className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                    onClick={() => trySetReps(reps + 1)}
                  >
                    <div className="relative -top-[2px]">+</div>
                  </button>
                  <button
                    className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                    onClick={() => trySetReps(reps - 1)}
                  >
                    <div className="relative -top-[1px]">–</div>
                  </button>
                </div>

                <input
                  id="reps"
                  type="text"
                  className="mt-4 ml-6 h-10 w-12 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-xl font-bold tabular-nums"
                  value={reps}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-r-1 border-l-1 border-gray-300 px-12 font-bold">
            <div className="mb-6 text-center text-sm">Weight</div>
            <div className="flex">
              <input
                id="weight"
                type="text"
                className="mt-4 mr-6 ml-auto h-10 w-26 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-xl font-bold tabular-nums"
                value={weight + "lbs"}
                onChange={handleChange}
              />
              <div className="flex flex-col gap-3">
                <button
                  className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                  onClick={() => trySetWeight(weight + 1)}
                >
                  <div className="relative -top-[2px]">+</div>
                </button>
                <button
                  className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                  onClick={() => trySetWeight(weight - 1)}
                >
                  <div className="relative -top-[1px]">–</div>
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <button
              className={`block h-full w-25 flex-1 shrink-0 rounded-md border-1 border-gray-600 bg-green-600 font-black text-white shadow-md`}
              onClick={() => {
                handleNewSet(exerciseIndex, {
                  reps: reps,
                  weight: weight,
                  notes: notes,
                  date: Date.now(),
                });
              }}
            >
              Add Set
            </button>
          </div>
        </div>
        <div className="flex border-t-1 border-gray-400 px-6 py-4 grayscale-70">
          <div className="flex max-h-max w-full self-center-safe">
            <div className="mt-3 w-12 pr-4 text-sm font-bold">Notes</div>
            <input
              type="text"
              id="notes"
              className="ml-4 h-full w-full rounded-md border-1 border-dotted bg-gray-100 p-3 text-left text-base font-bold tabular-nums"
              value={notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exercises;
