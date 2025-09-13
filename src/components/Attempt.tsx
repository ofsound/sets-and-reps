import Set from "../components/Set.tsx";

interface setObject {
  reps: number;
  weight: string;
  note: string;
  date: string;
}

type inputProps = {
  attempt: setObject[];
  addSet: (row: setObject) => void;
};

function Attempt({ attempt, addSet }: inputProps) {
  return (
    <>
      <div className="mb-2 border-1 p-2">
        {attempt.map((item, index) => (
          <Set set={item} key={index} />
        ))}
      </div>
      <div className="flex">
        <div className="flex w-full justify-center border-t-1 border-gray-400 bg-blue-100 px-11 py-3 grayscale-70 even:bg-blue-200">
          <div className="flex max-h-max self-center-safe">
            <div className="text-md mt-[34px] w-30 pr-4 text-right">Reps</div>
            <input
              id="countInTime"
              type="text"
              className="pointer-events-none mt-4 mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-2xl font-bold tabular-nums"
              // value={countInTime}
              // onChange={handleChange}
            />

            <div className="flex flex-col gap-3">
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
                // onClick={() => trySetCountInTime(countInTime + 1)}
              >
                <div className="relative -top-[2px]">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
                // onClick={() => trySetCountInTime(countInTime - 1)}
              >
                <div className="relative -top-[1px]">–</div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center border-t-1 border-gray-400 bg-blue-100 px-11 py-3 grayscale-70 even:bg-blue-200">
          <div className="flex max-h-max self-center-safe">
            <div className="text-md mt-[34px] w-30 pr-4 text-right">Weight</div>
            <input
              id="countInTime"
              type="text"
              className="pointer-events-none mt-4 mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-2xl font-bold tabular-nums"
              // value={countInTime}
              // onChange={handleChange}
            />

            <div className="flex flex-col gap-3">
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
                // onClick={() => trySetCountInTime(countInTime + 1)}
              >
                <div className="relative -top-[2px]">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
                // onClick={() => trySetCountInTime(countInTime - 1)}
              >
                <div className="relative -top-[1px]">–</div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center border-t-1 border-gray-400 bg-blue-100 px-11 py-3 grayscale-70 even:bg-blue-200">
          <div className="flex max-h-max self-center-safe">
            <div className="text-md mt-[34px] w-30 pr-4 text-right">Notes</div>
            <input
              id="countInTime"
              type="text"
              className="pointer-events-none mt-4 mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-2xl font-bold tabular-nums"
              // value={countInTime}
              // onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          addSet({
            reps: 3,
            weight: "35lbs",
            note: "no belt",
            date: "stamped",
          });
        }}
      >
        Add Set
      </button>
    </>
  );
}

export default Attempt;
