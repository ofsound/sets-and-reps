import { useState, useEffect } from "react";

import type { ChangeEvent } from "react";

import type { SetObject } from "../interfaces.ts";

type SetAdderProps = {
  handleNewSet: (object: SetObject) => void;
  previousReps: number;
  previousWeight: number;
};

function SetAdder({
  handleNewSet,
  previousReps,
  previousWeight,
}: SetAdderProps) {
  const [reps, setReps] = useState(3);
  const [weight, setWeight] = useState(50);
  const [notes, setNotes] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const thisInput = event.target as HTMLInputElement;
    const newValue = parseInt(thisInput.value, 10);

    switch (thisInput.id) {
      case "reps":
        setReps(newValue);
        break;
      case "weight":
        setWeight(newValue);
        break;
      case "notes":
        setNotes(thisInput.value);
        break;
    }
  };

  const trySetReps = (newValue: number) => {
    if (newValue >= 1 && newValue <= 99) {
      setReps(newValue);
    }
  };

  const trySetWeight = (newValue: number) => {
    if (newValue >= 0 && newValue <= 300) {
      setWeight(newValue);
    }
  };

  useEffect(() => {
    setWeight(previousWeight);
  }, [previousWeight]);

  useEffect(() => {
    setReps(previousReps);
  }, [previousReps]);

  return (
    <div className="mx-auto flex w-full flex-col border-t-1 border-white bg-gray-500 py-2">
      <div className="flex justify-center pt-3 pb-3">
        <div className="flex w-full flex-1 flex-col pl-4">
          <div className="mb-3 text-center text-sm font-bold">Reps</div>
          <div className="flex w-full">
            <div className="flex flex-col gap-2">
              <button
                className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => trySetReps(reps + 1)}
              >
                <div className="relative -top-[2px]">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => trySetReps(reps - 1)}
              >
                <div className="relative -top-[1px]">–</div>
              </button>
            </div>
            <input
              id="reps"
              type="text"
              className="mt-4 ml-6 h-10 w-12 rounded-md border-1 border-dotted bg-gray-100 pr-3 text-right text-xl font-bold tabular-nums"
              value={reps}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="h-full w-0.5 bg-gray-200"></div>
        <div className="flex flex-1 flex-col border-gray-300 pr-4">
          <div className="mb-3 text-center text-sm font-bold">Weight</div>
          <div className="flex">
            <input
              id="weight"
              type="text"
              className="mt-4 mr-6 ml-auto h-10 w-26 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-xl font-bold tabular-nums"
              value={weight + "lbs"}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-2">
              <button
                className="block h-10 w-10 rounded-sm border-1 border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => trySetWeight(weight + 1)}
              >
                <div className="relative -top-[2px]">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border-1 border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => trySetWeight(weight - 1)}
              >
                <div className="relative -top-[1px]">–</div>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden p-4">
          <button
            className={`block h-full w-25 flex-1 shrink-0 rounded-md border-1 border-gray-500 bg-green-600 font-black text-white shadow-md`}
            onClick={() => {
              handleNewSet({
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
      <div className="flex border-t-1 border-gray-400 px-6 py-3">
        <div className="flex max-h-max w-full self-center-safe">
          <div className="mt-3 w-12 pr-4 text-sm font-bold">Notes</div>
          <input
            type="text"
            id="notes"
            className="ml-4 h-full w-full rounded-md border-1 border-dotted bg-gray-100 p-3 text-left text-base font-bold tabular-nums"
            value={notes}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="border-t-1 border-gray-400 px-6 pt-2">
        <button
          className="mx-auto block h-9 w-full rounded-md border-1 border-gray-500 bg-green-600 font-black text-white shadow-md"
          onClick={() => {
            handleNewSet({
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
  );
}

export default SetAdder;
