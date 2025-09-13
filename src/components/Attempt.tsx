import Set from "../components/Set.tsx";

interface innerRowObject {
  reps: number;
  weight: string;
  note: string;
  date: string;
}

type inputProps = {
  attempt: innerRowObject[];
};

function Attempt({ attempt }: inputProps) {
  return (
    <div className="border-1 p-2">
      {attempt.map((item, index) => (
        <Set set={item} key={index} />
      ))}
    </div>
  );
}

export default Attempt;
