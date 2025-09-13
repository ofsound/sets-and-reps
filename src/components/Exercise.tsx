import Attempt from "../components/Attempt.tsx";

interface innerRowObject {
  reps: number;
  weight: string;
  note: string;
  date: string;
}

interface rowObject {
  name: string;
  attempts: innerRowObject[][];
}

type inputProps = {
  data: rowObject;
};

function Exercise({ data }: inputProps) {
  console.log(data.attempts);

  return (
    <div>
      <h1>{data.name}</h1>
      {data.attempts.map((item, index) => (
        <Attempt attempt={item} key={index} />
      ))}
    </div>
  );
}

export default Exercise;
