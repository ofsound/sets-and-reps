import { useState, useEffect } from "react";

import type { ChangeEvent } from "react";

import type { SetObject } from "../interfaces.ts";

type SetAdderProps = {
  handleNewSet: (object: SetObject) => void;
  previousReps: number;
  previousUnit: string;
};

function SetAdder({ handleNewSet, previousReps, previousUnit }: SetAdderProps) {
  const [reps, setReps] = useState(3);
  const [unit, setUnit] = useState("");
  const [notes, setNotes] = useState("");

  const [unitType, setUnitType] = useState("lbs");

  let unitLabel = "";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const thisInput = event.target as HTMLInputElement;
    const newValue = parseInt(thisInput.value, 10);

    switch (thisInput.id) {
      case "reps":
        setReps(newValue);
        break;
      case "unit":
        setUnit(thisInput.value);
        break;
      case "notes":
        setNotes(thisInput.value);
        break;
    }
  };

  const thisUnitType = unit.replace(/[0-9]/g, "");
  let unitInputValue = "";

  if (thisUnitType === "lbs") {
    unitInputValue = unit.replace(/\D/g, "") + "lbs";
    unitLabel = "Weight";
  } else if (thisUnitType === "s") {
    unitInputValue = unit.replace(/\D/g, "") + "s";
    unitLabel = "Time";
  } else {
    unitLabel = "Action";
  }

  const trySetReps = (newValue: number) => {
    if (newValue >= 1 && newValue <= 99) {
      setReps(newValue);
    }
  };

  const trySetUnitFromIncDec = (newValue: number) => {
    if (newValue >= 0 && newValue <= 300) {
      setUnit(newValue.toString() + unitType);
    }
  };

  const toggleUnit = () => {
    let newUnitType = "";

    if (unitType === "lbs") {
      newUnitType = "s";
    } else if (unitType === "s") {
      newUnitType = "";
    } else if (unitType === "") {
      newUnitType = "lbs";
    }

    setUnitType(newUnitType);

    if (newUnitType === "") {
      setUnit("");
    } else {
      setUnit("10" + newUnitType);
    }

    if (unitLabel === "Weight") {
      unitLabel = "Time";
    } else if (unitLabel === "Time") {
      unitLabel = "Action";
    } else if (unitLabel === "Action") {
      unitLabel = "Weight";
    }
  };

  useEffect(() => {
    setUnit(previousUnit);
  }, [previousUnit]);

  useEffect(() => {
    setReps(previousReps);
  }, [previousReps]);

  return (
    <div className="mx-auto flex w-full flex-col border-t-1 border-white bg-gray-500 py-2">
      <div className="flex justify-center pt-1 pb-3">
        <div className="flex w-full flex-1 flex-col pl-4">
          <div className="mb-1 text-center text-sm font-bold">Reps</div>
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
        <div className="mr-4 h-full w-px bg-gray-200/30"></div>
        <div className="flex flex-1 flex-col border-gray-300 pr-4">
          <div className="mb-1 text-center text-sm font-bold">
            <button
              onClick={toggleUnit}
              className="rounded-sm bg-gray-200/40 px-2 py-1"
            >
              {unitLabel} ⏷
            </button>
          </div>
          <div className="flex">
            <input
              id="unit"
              type="text"
              className={`mt-4 mr-6 ml-auto h-10 w-26 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-xl font-bold tabular-nums ${unitInputValue === "" && "opacity-60 blur-sm brightness-70"}`}
              value={unitInputValue}
              onChange={handleChange}
            />
            <div
              className={`flex flex-col gap-2 ${unitInputValue === "" && "opacity-60 blur-sm brightness-70"}`}
            >
              <button
                className="block h-10 w-10 rounded-sm border-1 border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => {
                  const numericString = parseInt(unit.replace(/\D/g, ""));
                  trySetUnitFromIncDec(numericString + 1);
                }}
              >
                <div className="relative -top-[2px]">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border-1 border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => {
                  const numericString = parseInt(unit.replace(/\D/g, ""));
                  trySetUnitFromIncDec(numericString - 1);
                }}
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
                unit: unit,
                notes: notes,
                date: Date.now(),
              });
            }}
          >
            Add Set
          </button>
        </div>
      </div>
      <div className="flex max-h-max w-full self-center-safe px-6 py-3">
        <div className="mt-1 w-12 pr-4 text-sm font-bold">Notes</div>
        <input
          type="text"
          id="notes"
          className="ml-1 h-full w-full rounded-md border-1 border-dotted bg-gray-100 px-2 py-1 text-left text-sm font-bold tabular-nums"
          value={notes}
          onChange={handleChange}
        />
      </div>
      <div className="px-6 pt-2">
        <button
          className="mx-auto block h-9 w-full rounded-md border-1 border-gray-500 bg-green-600 font-black text-white shadow-md"
          onClick={() => {
            handleNewSet({
              reps: reps,
              unit: unit,
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
