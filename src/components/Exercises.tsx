import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

import { v4 as uuidv4 } from "uuid";

import Exercise from "../components/Exercise.tsx";

interface setObject {
  reps: number;
  weight: string;
  notes: string;
  date: number;
}

interface rowObject {
  id: string;
  name: string;
  attempts: setObject[][];
}

function Exercises() {
  const [newName, setNewName] = useState("");

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

    if (
      newExercises[index].attempts[newExercises[index].attempts.length - 1]
        .length !== 0
    ) {
      newExercises[index].attempts.push([]);
      localStorage.setItem("exercises", JSON.stringify(newExercises));
      setExercises(newExercises);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const theInput = event.target as HTMLInputElement;

    switch (theInput.id) {
      case "name":
        setNewName(theInput.value);
        break;
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
    setExercises(newExercises);
  };

  const handleNewSet = (index: number, newSet: setObject) => {
    const newExercises = [...exercises];
    newExercises[index].attempts[newExercises[index].attempts.length - 1].push(
      newSet,
    );
    localStorage.setItem("exercises", JSON.stringify(newExercises));
    setExercises(newExercises);
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
  };

  useEffect(() => {
    // const newExercises = [
    //   {
    //     name: "Lateral Raises",
    //     attempts: [
    //       [
    //         { reps: 3, weight: "35lbs", notes: "no belt", date: 9823498938 },
    //         { reps: 4, weight: "25lbs", notes: "no belt", date: 9823498938 },
    //       ],
    //       [
    //         { reps: 2, weight: "15lbs", notes: "no belt", date: 9823498938 },
    //         { reps: 2, weight: "15lbs", notes: "no belt", date: 9823498938 },
    //       ],
    //     ],
    //   },
    //   {
    //     name: "Pec Fly",
    //     attempts: [
    //       [
    //         { reps: 3, weight: "35lbs", notes: "no belt", date: 9823498938 },
    //         { reps: 4, weight: "25lbs", notes: "no belt", date: 9823498938 },
    //       ],
    //       [
    //         { reps: 3, weight: "35lbs", notes: "no belt", date: 9823498938 },
    //         { reps: 4, weight: "25lbs", notes: "no belt", date: 9823498938 },
    //       ],
    //     ],
    //   },
    // ];
    // localStorage.setItem("exercises", JSON.stringify(newExercises));
    // setExercises(newExercises);
  }, []);

  return (
    <div>
      <div className="mb-8 hidden bg-gray-300 p-4 shadow-md">
        <input
          id="name"
          type="text"
          className="mr-10 ml-auto h-14 w-full rounded-md border-1 border-dotted bg-gray-100 p-3 text-left text-xl font-bold tabular-nums"
          onChange={handleChange}
        />

        <button
          className="block h-14 rounded-md border-1 p-2"
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
              handleToggleVisibility(index);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      {exercises.map((item, index) => (
        <Exercise
          data={item}
          key={index}
          isActive={isActiveArray[index]}
          newAttempt={() => {
            handleNewAttempt(index);
          }}
          newSet={(set: setObject) => {
            handleNewSet(index, set);
          }}
        />
      ))}
    </div>
  );
}

export default Exercises;
