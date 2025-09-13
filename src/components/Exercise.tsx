import { useRef } from "react";
import Attempt from "../components/Attempt.tsx";

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

type inputProps = {
  data: rowObject;
  newAttempt: () => void;
  newSet: (set: setObject) => void;
  isActive: boolean;
};

function Exercise({ data, newAttempt, newSet, isActive }: inputProps) {
  const isToggled = useRef(false);

  const handleAddSet = (set: setObject) => {
    newSet(set);
  };

  if (isActive && !isToggled.current) {
    newAttempt();
    isToggled.current = true;
  }

  if (!isActive) {
    isToggled.current = false;
  }

  return (
    <div className={`${isActive ? "block" : "hidden"} mb-4`}>
      <h1 className="mb-2 font-black">{data.name}</h1>

      <div className={`${isActive ? "block" : "hidden"}`}>
        {data.attempts.map((item, index) => (
          <Attempt
            attempt={item}
            key={index}
            addSet={handleAddSet}
            isActive={index === data.attempts.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Exercise;
