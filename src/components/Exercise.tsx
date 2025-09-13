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
  toggleVisibility: () => void;
  newSet: (set: setObject) => void;
  isActive: boolean;
};

function Exercise({
  data,
  newAttempt,
  toggleVisibility,
  newSet,
  isActive,
}: inputProps) {
  const handleAddSet = (set: setObject) => {
    newSet(set);
  };

  return (
    <div className="mb-4">
      <h1 onClick={toggleVisibility} className="mb-2 font-black">
        {data.name}
      </h1>

      <div className={`${isActive ? "block" : "hidden"}`}>
        <button className="block rounded-md border-1 p-2" onClick={newAttempt}>
          Add Attempt
        </button>

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
