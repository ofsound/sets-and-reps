import type { ChangeEvent } from "react";
import { useState } from "react";

import Set from "../components/Set.tsx";

interface setObject {
  reps: number;
  weight: string;
  notes: string;
  date: number;
}

type inputProps = {
  attempt: setObject[];
  addSet: (row: setObject) => void;
  isActive: boolean;
};

function Attempt({ attempt, addSet, isActive }: inputProps) {
  const [reps, setReps] = useState(3);
  const [weight, setWeight] = useState("15lbs");
  const [notes, setNotes] = useState("great job");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const theInput = event.target as HTMLInputElement;
    const newValue = parseInt(theInput.value, 10);

    switch (theInput.id) {
      case "reps":
        setReps(newValue);
        break;
      case "weight":
        setWeight(theInput.value);
        break;
      case "notes":
        setNotes(theInput.value);
        break;
    }
  };

  const trySetReps = (newValue: number) => {
    if (newValue >= 0 && newValue <= 99) {
      setReps(newValue);
    }
  };

  // const trySetSoundEffectIndex = (newValue: number) => {
  //   if (newValue >= 1 && newValue <= 3) {
  //     setSoundEffectIndex(newValue);
  //     onSoundChange(newValue);
  //   }
  // };

  // const trySetColorThemeIndex = (newValue: number) => {
  //   if (newValue >= 1 && newValue <= 1) {
  //     setColorThemeIndex(newValue);
  //   }
  // };

  return (
    <>
      <div className="mb-2 border-1 p-2">
        {attempt.map((item, index) => (
          <Set set={item} key={index} />
        ))}
      </div>
      <div className={`${isActive ? "flex" : "hidden"}`}>
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex w-full border-t-1 border-gray-400 bg-blue-200 px-2 py-3 grayscale-70">
              <div className="flex max-h-max">
                <div className="flex-col">
                  <div className="text-md mt-[34px] w-12 pr-4 text-right">
                    Reps
                  </div>
                  <div className="flex">
                    <input
                      id="reps"
                      type="text"
                      className="mt-4 mr-6 ml-auto h-10 w-12 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-xl font-bold tabular-nums"
                      value={reps}
                      onChange={handleChange}
                    />

                    <div className="flex flex-col gap-3">
                      <button
                        className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                        onClick={() => trySetReps(reps + 1)}
                      >
                        <div className="relative -top-[2px]">+</div>
                      </button>
                      <button
                        className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                        onClick={() => trySetReps(reps - 1)}
                      >
                        <div className="relative -top-[1px]">–</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center border-t-1 border-gray-400 bg-blue-200 px-2 py-3 grayscale-70">
              <div className="flex max-h-max flex-col self-center-safe">
                <div className="text-md mt-[34px] w-16 pr-4 text-right">
                  Weight
                </div>
                <div className="flex">
                  <input
                    id="weight"
                    type="text"
                    className="mt-4 mr-6 ml-auto h-10 w-15 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-xl font-bold tabular-nums"
                    value={weight}
                    onChange={handleChange}
                  />
                  <div className="flex flex-col gap-3">
                    <button
                      className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                      // onClick={() => trySetCountInTime(countInTime + 1)}
                    >
                      <div className="relative -top-[2px]">+</div>
                    </button>
                    <button
                      className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                      // onClick={() => trySetCountInTime(countInTime - 1)}
                    >
                      <div className="relative -top-[1px]">–</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center border-t-1 border-gray-400 bg-blue-200 px-2 py-3 grayscale-70">
            <div className="flex max-h-max w-full self-center-safe">
              <div className="text-md mt-[34px] w-12 pr-4 text-right">
                Notes
              </div>
              <textarea
                id="notes"
                className="mt-4 mr-2 ml-auto h-full w-full rounded-md border-1 border-dotted bg-gray-100 p-3 text-left text-base font-bold tabular-nums"
                value={notes}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className={` ${!isActive && "hidden"} m-4 block h-12 w-full rounded-md border-1 bg-green-600 font-black text-white`}
            onClick={() => {
              addSet({
                reps: reps,
                weight: weight,
                notes: notes,
                date: Date.now(),
              });
            }}
          >
            Add Set
          </button>
        </div>
      </div>
    </>
  );
}

export default Attempt;
