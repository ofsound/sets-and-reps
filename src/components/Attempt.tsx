import type { SetObject } from "../interfaces.ts";

import Set from "../components/Set.tsx";

type AttemptProps = {
  attempt: SetObject[];
  index: number;
  deleteAttempt: (attemptIndex: number) => void;
  deleteSetInAttempt: (attemptIndex: number, setIndex: number) => void;
  armSetInAttemptForUpdate: (attemptIndex: number, setIndex: number) => void;
};

function Attempt({
  attempt,
  index,
  deleteAttempt,
  deleteSetInAttempt,
  armSetInAttemptForUpdate,
}: AttemptProps) {
  const deleteSet = (setIndex: number) => {
    deleteSetInAttempt(index, setIndex);
  };

  const armSetForUpdate = (setIndex: number) => {
    armSetInAttemptForUpdate(index, setIndex);
  };

  return (
    <div className="relative mx-4 my-2 min-h-13 rounded-md border-1 border-gray-500 bg-white p-2 shadow-sm last:border-dashed last:bg-blue-100">
      <button
        onClick={() => deleteAttempt(index)}
        className="absolute top-0 right-1"
      >
        X
      </button>
      {attempt.map((item, index) => (
        <Set
          set={item}
          key={index}
          {...{ index }}
          {...{ deleteSet }}
          {...{ armSetForUpdate }}
        />
      ))}
    </div>
  );
}

export default Attempt;
