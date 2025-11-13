import { useState, useEffect } from "react";

import type { ChangeEvent } from "react";

import type { SetObject } from "../interfaces.ts";

import {
  unitNumericValueFromUnit,
  unitTypeFromUnit,
  isUnitAnInteger,
} from "../utils/dataConversion.ts";

type SetAdderProps = {
  appendNewSet: (object: SetObject) => void;
  updateArmedSet: (object: SetObject) => void;
  editModeEnabled: boolean;
  previousReps: number;
  previousUnit: string;
  previousNotes: string;
};

function SetAdder({
  appendNewSet,
  updateArmedSet,
  editModeEnabled,
  previousReps,
  previousUnit,
  previousNotes,
}: SetAdderProps) {
  const [reps, setReps] = useState(3);
  const [unit, setUnit] = useState("");
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
      case "unit":
        setUnit(thisInput.value);
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

  let unitType = unitTypeFromUnit(unit);
  let unitLabel = "";
  let unitInputValue = "";

  if (unitType === "lbs") {
    unitInputValue = unitNumericValueFromUnit(unit) + "lbs";
    unitLabel = "Weight";
  } else if (unitType === "s") {
    unitInputValue = unitNumericValueFromUnit(unit) + "s";
    unitLabel = "Time";
  } else if (isUnitAnInteger(unit)) {
    unitInputValue = unitNumericValueFromUnit(unit) + "";
    unitLabel = "Setting";
  } else {
    unitLabel = "Action";
  }

  const toggleUnit = () => {
    if (unitLabel === "Weight") {
      unitType = "s";
      unitLabel = "Time";
      setUnit("10" + unitType);
    } else if (unitLabel === "Time") {
      unitType = "";
      unitLabel = "Setting";
      setUnit("10");
    } else if (unitLabel === "Setting") {
      unitType = "";
      unitLabel = "Action";
      setUnit("");
    } else if (unitLabel === "Action") {
      unitType = "lbs";
      unitLabel = "Weight";
      setUnit("10" + unitType);
    }
  };

  const trySetUnitFromIncDec = (newValue: number) => {
    if (newValue >= 0 && newValue <= 300) {
      setUnit(newValue.toString() + unitType);
    }
  };

  // do these have to be "watching?", what if this component is
  // being re-rendered at the same time as these values changing?
  // try these without useEffect
  useEffect(() => {
    setUnit(previousUnit);
  }, [previousUnit]);

  useEffect(() => {
    setReps(previousReps);
  }, [previousReps]);

  useEffect(() => {
    setNotes(previousNotes);
  }, [previousNotes]);

  return (
    <div className="border-torder-white mx-auto flex w-full flex-col bg-gray-500 py-2">
      <div className="flex justify-center pt-1 pb-3">
        <div className="flex flex-1 flex-col pr-4">
          <div className="mb-1 text-center text-sm font-bold">
            <button
              onClick={toggleUnit}
              className="rounded-sm bg-gray-200/40 px-2 py-1"
            >
              {unitLabel} ⏷
            </button>
          </div>
          <div className="flex">
            <div
              className={`flex flex-col gap-2 ${unitLabel === "Action" && "opacity-60 blur-sm brightness-70"}`}
            >
              <button
                className="borderorder-gray-900 block h-10 w-10 rounded-sm bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => {
                  trySetUnitFromIncDec(unitNumericValueFromUnit(unit) + 1);
                }}
              >
                <div className="relative -top-0.5">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => {
                  trySetUnitFromIncDec(unitNumericValueFromUnit(unit) - 1);
                }}
              >
                <div className="relative -top-px">–</div>
              </button>
            </div>
            <input
              id="unit"
              type="text"
              className={`borderorder-dotted mt-4 mr-6 ml-auto h-10 w-26 rounded-md bg-gray-100 pr-5 text-right text-xl font-bold tabular-nums ${unitLabel === "Action" && "opacity-60 blur-sm brightness-70"}`}
              value={unitInputValue}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mr-4 h-full w-px bg-gray-200/30"></div>
        <div className="flex w-full flex-1 flex-col pl-4">
          <div className="mb-1 text-center text-sm font-bold">Reps</div>
          <div className="flex w-full">
            <input
              id="reps"
              type="text"
              className="borderorder-dotted mt-4 ml-6 h-10 w-12 rounded-md bg-gray-100 pr-3 text-right text-xl font-bold tabular-nums"
              value={reps}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-2">
              <button
                className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => trySetReps(reps + 1)}
              >
                <div className="relative -top-0.5">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
                onClick={() => trySetReps(reps - 1)}
              >
                <div className="relative -top-px">–</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-h-max w-full self-center-safe px-6 py-3">
        <div className="mt-1 w-12 pr-4 text-sm font-bold">Notes</div>
        <input
          type="text"
          id="notes"
          className="ml-1 h-full w-full rounded-md border border-dotted bg-gray-100 px-2 py-1 text-left text-sm font-bold tabular-nums"
          value={notes}
          onChange={handleChange}
        />
      </div>
      <div className="px-6 pt-2">
        {!editModeEnabled && (
          <button
            className="mx-auto block h-9 w-full rounded-md border border-gray-500 bg-green-600 font-black text-white shadow-md"
            onClick={() => {
              appendNewSet({
                reps: reps,
                unit: unit,
                notes: notes,
                date: Date.now(),
              });
            }}
          >
            Add Set
          </button>
        )}
        {editModeEnabled && (
          <button
            className="mx-auto block h-9 w-full rounded-md border border-gray-500 bg-green-600 font-black text-white shadow-md"
            onClick={() => {
              updateArmedSet({
                reps: reps,
                unit: unit,
                notes: notes,
                date: Date.now(),
              });
            }}
          >
            Update Set
          </button>
        )}
      </div>
    </div>
  );
}

export default SetAdder;
