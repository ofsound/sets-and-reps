import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

type ExercisesIndexItemProps = {
  name: string;
  id: string;
  isCurrent: boolean;
};

function ExercisesIndexItem({ name, id, isCurrent }: ExercisesIndexItemProps) {
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

  return (
    <div
      className={
        "my-3 flex rounded-md border-1 border-white bg-gray-500 px-3 py-1 text-lg text-white"
      }
    >
      <input
        type="text"
        value={exerciseName}
        onChange={handleNameInputChange}
        onKeyDown={handleKeyDown}
        className=""
      ></input>
      <input
        type="checkbox"
        checked={isCurrent}
        onChange={handleIsCurrentCheckboxChange}
        className="ml-auto"
      ></input>
      <button onClick={deleteExercise} className="ml-10">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default ExercisesIndexItem;
