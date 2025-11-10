import type { SetObject } from "../interfaces.ts";

import Set from "../components/Set.tsx";

type AttemptProps = {
  attempt: SetObject[];
};

function Attempt({ attempt }: AttemptProps) {
  return (
    <div className="mx-4 my-2 min-h-13 rounded-md border-1 border-gray-500 bg-white p-2 shadow-sm last:animate-pulse last:bg-blue-100">
      {attempt.map((item, index) => (
        <Set set={item} key={index} />
      ))}
    </div>
  );
}

export default Attempt;
