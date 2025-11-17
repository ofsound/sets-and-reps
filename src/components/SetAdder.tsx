import { useState, useEffect } from "react";

import type { ChangeEvent } from "react";

import type { SetObject } from "../interfaces.ts";

import {
  measurementNumericValueFromMeasurement,
  measurementUnitFromMeasurement,
  isMeasurementAnInteger,
} from "../utils/dataConversion.ts";

import IncrementDecrement from "./IncrementDecrement.tsx";

type SetAdderProps = {
  appendNewSet: (object: SetObject) => void;
  updateArmedSet: (object: SetObject) => void;
  editModeEnabled: boolean;
  previousReps: number;
  previousMeasurement: string;
  previousNotes: string;
};

function SetAdder({
  appendNewSet,
  updateArmedSet,
  editModeEnabled,
  previousReps,
  previousMeasurement,
  previousNotes,
}: SetAdderProps) {
  const [reps, setReps] = useState(3);
  const [measurement, setMeasurement] = useState("");
  const [notes, setNotes] = useState("");

  const handleMeasurementChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeasurement(event.target.value);
  };

  const handleRepsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReps(parseInt(event.target.value, 10));
  };

  const handleNotesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  const trySetReps = (newValue: number) => {
    if (newValue >= 1 && newValue <= 99) {
      setReps(newValue);
    }
  };

  let measurementUnit = measurementUnitFromMeasurement(measurement);
  let measurementLabel = "";
  let measurementInputValue = "";

  if (measurementUnit === "lbs") {
    measurementInputValue =
      measurementNumericValueFromMeasurement(measurement) + "lbs";
    measurementLabel = "Weight";
  } else if (measurementUnit === "s") {
    measurementInputValue =
      measurementNumericValueFromMeasurement(measurement) + "s";
    measurementLabel = "Time";
  } else if (isMeasurementAnInteger(measurement)) {
    measurementInputValue =
      measurementNumericValueFromMeasurement(measurement) + "";
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

  const trySetMeasurementFromIncDec = (newValue: number) => {
    console.log(newValue);

    if (newValue >= 0 && newValue <= 300) {
      setMeasurement(newValue.toString() + measurementUnit);
    }
  };

  // do these have to be "watching"?, what if this component is
  // already being re-rendered every single time these values change?
  useEffect(() => {
    setMeasurement(previousMeasurement);
  }, [previousMeasurement]);

  useEffect(() => {
    setReps(previousReps);
  }, [previousReps]);

  useEffect(() => {
    setNotes(previousNotes);
  }, [previousNotes]);

  return (
    <div className="mx-auto flex w-full flex-col border-t border-white bg-gray-500 py-2">
      <div className="flex justify-center bg-amber-200 pt-1 pb-3">
        <div className="flex flex-1 flex-col bg-blue-200">
          <div className="mb-1 text-center text-sm font-bold">
            <button
              onClick={toggleMeasurement}
              className="rounded-sm bg-gray-200/40 px-2 py-1"
            >
              {measurementLabel} ⏷
            </button>
          </div>
          <div className="flex">
            <IncrementDecrement
              value={measurementNumericValueFromMeasurement(measurement)}
              trySetValue={trySetMeasurementFromIncDec}
            />
            <input
              type="text"
              className={`mt-4 ml-auto h-10 w-26 rounded-md border border-dotted bg-gray-100 pr-5 text-right text-xl font-bold tabular-nums ${measurementLabel === "Action" && "opacity-60 blur-sm brightness-70"}`}
              value={measurementInputValue}
              onChange={handleMeasurementChange}
            />
          </div>
        </div>
        <div className="mx-4 h-full w-px bg-gray-200/30"></div>
        <div className="flex w-full flex-1 flex-col bg-red-50">
          <div className="mb-1 text-center text-sm font-bold">Reps</div>
          <div className="flex w-full">
            <input
              type="text"
              className="mt-4 mr-auto h-10 w-12 rounded-md border border-dotted bg-gray-100 text-right text-xl font-bold tabular-nums"
              value={reps}
              onChange={handleRepsChange}
            />
            <IncrementDecrement value={reps} trySetValue={trySetReps} />
          </div>
        </div>
      </div>
      <div className="flex max-h-max w-full self-center-safe px-6 py-3">
        <div className="mt-1 w-12 pr-4 text-sm font-bold">Notes</div>
        <input
          type="text"
          className="ml-1 h-full w-full rounded-md border border-dotted bg-gray-100 px-2 py-1 text-left text-sm font-bold tabular-nums"
          value={notes}
          onChange={handleNotesChange}
        />
      </div>
      <div className="px-6 pt-2">
        s
        {!editModeEnabled && (
          <button
            className="mx-auto block h-9 w-full rounded-md border border-gray-500 bg-green-600 font-black text-white shadow-md"
            onClick={() => {
              appendNewSet({
                reps: reps,
                measurement: measurement,
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

export default SetAdder;
