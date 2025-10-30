import { useRef } from "react";
import type { ExerciseObject } from "../interfaces.ts";

import Attempt from "../components/Attempt.tsx";

type ExerciseProps = {
  data: ExerciseObject;
  newAttempt: () => void;
  isActive: boolean;
};

function Exercise({ data, newAttempt, isActive }: ExerciseProps) {
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
      <h1 className="my-6 hidden text-center text-2xl font-black">
        {data.name}
      </h1>

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
