import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent, PointerEvent } from "react";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

type ExercisesIndexItemProps = {
  name: string;
  id: string;
  isCurrent: boolean;
};

function ExercisesIndexItem({ name, id, isCurrent }: ExercisesIndexItemProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const nameInputElementRef = useRef<HTMLInputElement>(null);

  const nameInputIsActive = useRef(false);

  const mouseDownStartTime = useRef(0);

  const docRef = doc(db, "exercises", id);

  const [exerciseName, setExerciseName] = useState(name);

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  const handleIsCurrentCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleExerciseIsCurrent(e.target.checked);
  };

  const deleteExercise = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this Exercise?`,
    );

    if (confirmed) {
      try {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    } else {
      console.log("Deletion cancelled.");
    }
  };

  const renameExercise = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to rename this Exercise?`,
    );

    if (confirmed) {
      try {
        updateDoc(docRef, { name: exerciseName });

        if (nameInputElementRef.current) {
          nameInputElementRef.current.blur();
          nameInputIsActive.current = false;
        }
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      console.log("Deletion cancelled.");
    }
  };

  const toggleExerciseIsCurrent = async (newIsCurrentValue: boolean) => {
    try {
      updateDoc(docRef, { isCurrent: newIsCurrentValue });
      console.log("Document successfully updated!" + newIsCurrentValue);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      renameExercise();
    }
  };

  const handleMouseDown = (event: PointerEvent) => {
    event.preventDefault();
    mouseDownStartTime.current = Date.now();
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    if (isMouseDown) {
      const handleDuringMouseDown = () => {
        const timeSinceMouseDown = Date.now() - mouseDownStartTime.current;

        if (timeSinceMouseDown > 700) {
          console.log("long press");
          clearInterval(interval);
          if (nameInputElementRef.current) {
            nameInputElementRef.current.focus();
            nameInputIsActive.current = true;
          }
        }
      };

      const interval = setInterval(handleDuringMouseDown, 80);
      return () => clearInterval(interval);
    }
  }, [isMouseDown]);

  useEffect(() => {
    if (isMouseDown) {
      window.addEventListener("pointerup", handleMouseUp);
    } else {
      window.removeEventListener("pointerup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, [isMouseDown]);

  return (
    <div
      className={
        "mx-auto mb-3 flex w-9/10 cursor-pointer rounded-lg bg-linear-to-b from-slate-400 via-gray-500 to-neutral-500 px-2 py-1 text-white"
      }
    >
      <input
        type="text"
        value={exerciseName}
        ref={nameInputElementRef}
        onChange={handleNameInputChange}
        onPointerDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        className="w-full px-1 focus:bg-white focus:text-black"
      ></input>
      {/* <button className="ml-2 flex h-6 w-9 cursor-pointer justify-center rounded-sm py-1 text-sm text-white">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"
          />
        </svg>
      </button> */}
      {nameInputIsActive.current && (
        <button onClick={renameExercise} className="mx-4">
          <svg
            className="relative top-1 -left-px"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.29 4.29L12 12.59 7.71 8.29" />
            <path
              d="M20.29 4.29L12 12.59 7.71 8.29"
              strokeDasharray="7 7"
              strokeDashoffset="7"
            />
          </svg>
        </button>
      )}
      <input
        type="checkbox"
        checked={isCurrent}
        onChange={handleIsCurrentCheckboxChange}
        className="ml-auto"
      ></input>

      <button onClick={deleteExercise} className="ml-2">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default ExercisesIndexItem;
