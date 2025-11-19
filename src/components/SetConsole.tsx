import { useState } from "react";

import type { ChangeEvent } from "react";

import type { SetObject } from "../interfaces.ts";

import {
  numberFromMeasurement,
  unitFromMeasurement,
  isMeasurementAnInteger,
} from "../utils/dataConversions.ts";

import IncrementDecrement from "./IncrementDecrement.tsx";

type SetConsoleProps = {
  appendNewSet: (object: SetObject) => void;
  updateArmedSet: (object: SetObject) => void;
  globalEditModeEnabled: boolean;
  initialReps: number;
  initialMeasurement: string;
  initialNotes: string;
};

function SetConsole({
  appendNewSet,
  updateArmedSet,
  globalEditModeEnabled,
  initialReps,
  initialMeasurement,
  initialNotes,
}: SetConsoleProps) {
  const [reps, setReps] = useState(initialReps);
  const [measurement, setMeasurement] = useState(initialMeasurement);
  const [notes, setNotes] = useState(initialNotes);

  const handleMeasurementChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeasurement(event.target.value);
  };

  const handleRepsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReps(parseInt(event.target.value, 10));
  };

  const handleNotesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  const tryToSetReps = (newValue: number) => {
    if (newValue >= 1 && newValue <= 99) {
      setReps(newValue);
    }
  };

  let measurementUnit = unitFromMeasurement(measurement);
  let measurementLabel = "";

  if (measurementUnit === "lbs") {
    measurementLabel = "Weight";
  } else if (measurementUnit === "s") {
    measurementLabel = "Time";
  } else if (isMeasurementAnInteger(measurement)) {
    measurementLabel = "Setting";
  } else {
    measurementLabel = "Action";
  }

  const toggleMeasurement = () => {
    if (measurementLabel === "Weight") {
      measurementUnit = "s";
      measurementLabel = "Time";
      setMeasurement("10" + measurementUnit);
    } else if (measurementLabel === "Time") {
      measurementUnit = "";
      measurementLabel = "Setting";
      setMeasurement("10");
    } else if (measurementLabel === "Setting") {
      measurementUnit = "";
      measurementLabel = "Action";
      setMeasurement("");
    } else if (measurementLabel === "Action") {
      measurementUnit = "lbs";
      measurementLabel = "Weight";
      setMeasurement("10" + measurementUnit);
    }
  };

  const tryToSetMeasurement = (newValue: number) => {
    if (newValue >= 0 && newValue <= 300) {
      setMeasurement(newValue.toString() + measurementUnit);
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col bg-gray-500 pb-3">
      <div className="flex justify-center bg-linear-to-t from-gray-500 to-slate-400 pt-3">
        <div className="flex flex-1 flex-col">
          <div className="mb-1 h-8 text-center text-sm font-bold">
            <button
              onClick={toggleMeasurement}
              className="rounded-sm bg-gray-200/40 px-2 py-1"
            >
              {measurementLabel} ⏷
            </button>
          </div>
          <div
            className={`mt-2 flex gap-7 pl-3 ${measurementLabel === "Action" && "opacity-60 blur-sm brightness-70"}`}
          >
            <IncrementDecrement
              value={numberFromMeasurement(measurement)}
              trySetValue={tryToSetMeasurement}
            />
            <input
              disabled
              type="text"
              className={`mt-7 h-8 w-20.5 rounded-md border border-dotted bg-gray-100 pr-2.5 text-right text-xl font-bold tabular-nums`}
              value={measurement}
              onChange={handleMeasurementChange}
            />
          </div>
        </div>
        <div className="relative top-[10%] h-8/10 w-px bg-gray-200/30"></div>
        <div className="flex w-full flex-1 flex-col">
          <div className="mb-1 flex h-8 items-center text-center text-sm font-bold">
            <div className="w-full text-center">Reps</div>
          </div>
          <div className="mt-2 flex justify-end gap-7 pr-3">
            <input
              disabled
              type="text"
              className="mt-7 h-8 w-11 rounded-md border border-dotted bg-gray-100 pr-2.5 text-right text-xl font-bold tabular-nums"
              value={reps}
              onChange={handleRepsChange}
            />
            <IncrementDecrement value={reps} trySetValue={tryToSetReps} />
          </div>
        </div>
      </div>
      <div className="flex max-h-max w-full self-center-safe px-6 pt-4 pb-1">
        <div className="mt-[5px] w-12 text-sm font-bold">Notes</div>
        <input
          type="text"
          className="ml-3 h-full w-full rounded-md border border-dotted bg-gray-100 px-2 py-1 text-left text-sm tabular-nums"
          value={notes}
          onChange={handleNotesChange}
        />
      </div>
      <div className="px-6 pt-2">
        {!globalEditModeEnabled && (
          <button
            className="mx-auto block h-9 w-full rounded-md border border-gray-500 bg-green-600 font-bold text-white shadow-md"
            onClick={() => {
              appendNewSet({
                reps: reps,
                measurement: measurement,
                notes: notes,
                date: Date.now(),
              });
              setNotes("");
            }}
          >
            Add Set
          </button>
        )}
        {globalEditModeEnabled && (
          <button
            className="mx-auto block h-9 w-full rounded-md border border-gray-500 bg-green-600 font-bold text-white shadow-md"
            onClick={() => {
              updateArmedSet({
                reps: reps,
                measurement: measurement,
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

export default SetConsole;
