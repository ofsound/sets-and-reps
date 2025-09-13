import Attempt from "../components/Attempt.tsx";

interface setObject {
  reps: number;
  weight: string;
  notes: string;
  date: number;
}

interface rowObject {
  name: string;
  attempts: setObject[][];
}

type inputProps = {
  data: rowObject;
  newAttempt: () => void;
  newSet: (set: setObject) => void;
};

function Exercise({ data, newAttempt, newSet }: inputProps) {
  const handleAddSet = (set: setObject) => {
    console.log("handle", set);

    newSet(set);
  };

  return (
    <div className="mb-4">
      <h1 className="mb-2 font-black">{data.name}</h1>
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
  );
}

export default Exercise;
