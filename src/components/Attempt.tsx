import Set from "../components/Set.tsx";

interface setObject {
  reps: number;
  weight: number;
  notes: string;
  date: number;
}

type inputProps = {
  attempt: setObject[];
  isActive: boolean;
};

function Attempt({ attempt, isActive }: inputProps) {
  return (
    <div
      className={`${isActive ? "block" : "block"} mx-4 bg-white shadow-sm last:animate-pulse last:bg-blue-100`}
    >
      <div className="mb-2 min-h-13 rounded-md border-1 border-gray-500 p-2">
        {attempt.map((item, index) => (
          <Set set={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Attempt;
