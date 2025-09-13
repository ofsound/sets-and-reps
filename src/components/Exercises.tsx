import { useState, useEffect } from "react";

import Exercise from "../components/Exercise.tsx";

interface setObject {
  reps: number;
  weight: string;
  note: string;
  date: string;
}

interface rowObject {
  name: string;
  attempts: setObject[][];
}

function Exercises() {
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
    newExercises[index].attempts.push([]);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
    setExercises(newExercises);
  };

  const handleNewSet = (index: number, newSet: setObject) => {
    const newExercises = [...exercises];
    newExercises[index].attempts[0].push(newSet);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
    setExercises(newExercises);
  };

  useEffect(() => {
    // const newExercises = [
    //   {
    //     name: "Lateral Raises",
    //     attempts: [
    //       [
    //         { reps: 3, weight: "35lbs", note: "no belt", date: "stamped" },
    //         { reps: 4, weight: "25lbs", note: "no belt", date: "stamped" },
    //       ],
    //       [
    //         { reps: 2, weight: "15lbs", note: "no belt", date: "stamped" },
    //         { reps: 2, weight: "15lbs", note: "no belt", date: "stamped" },
    //       ],
    //     ],
    //   },
    //   {
    //     name: "Pec Fly",
    //     attempts: [
    //       [
    //         { reps: 3, weight: "35lbs", note: "no belt", date: "stamped" },
    //         { reps: 4, weight: "25lbs", note: "no belt", date: "stamped" },
    //       ],
    //       [
    //         { reps: 3, weight: "35lbs", note: "no belt", date: "stamped" },
    //         { reps: 4, weight: "25lbs", note: "no belt", date: "stamped" },
    //       ],
    //     ],
    //   },
    // ];
    // localStorage.setItem("exercises", JSON.stringify(newExercises));
    // setExercises(newExercises);
  }, []);

  return (
    <div>
      {exercises.map((item, index) => (
        <Exercise
          data={item}
          key={index}
          newAttempt={() => {
            handleNewAttempt(index);
          }}
          newSet={(set) => {
            handleNewSet(index, set);
          }}
        />
      ))}
    </div>
  );
}

export default Exercises;
