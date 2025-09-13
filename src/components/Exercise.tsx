import Attempt from "../components/Attempt.tsx";

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
      {data.attempts.map((item, index) => (
        <Attempt attempt={item} key={index} addSet={handleAddSet} />
      ))}
      <button onClick={newAttempt}>addAtttempt()</button>
    </div>
  );
}

export default Exercise;
