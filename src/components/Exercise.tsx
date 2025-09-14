import { useRef } from "react";
import Attempt from "../components/Attempt.tsx";

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

type inputProps = {
  data: rowObject;
  newAttempt: () => void;
  isActive: boolean;
};

function Exercise({ data, newAttempt, isActive }: inputProps) {
  const isToggled = useRef(false);

  if (isActive && !isToggled.current) {
    isToggled.current = true;

    newAttempt();
  }

  if (!isActive) {
    isToggled.current = false;
  }

  return (
    <div className={`${isActive ? "block" : "hidden"} mb-4 overflow-hidden`}>
      <h1 className="my-6 text-center text-2xl font-black">{data.name}</h1>

      <div id="help" className={`${isActive ? "block" : "hidden"}`}>
        {data.attempts.map((item, index) => (
          <Attempt
            attempt={item}
            key={index}
            isActive={index === data.attempts.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Exercise;
