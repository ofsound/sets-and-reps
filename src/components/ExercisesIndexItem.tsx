import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import { db } from "../firebase-config.ts";

type ExercisesIndexItemProps = {
  name: string;
  id: string;
};

function ExercisesIndexItem({ name, id }: ExercisesIndexItemProps) {
  const docRef = doc(db, "exercises", id);

  const [exerciseName, setExerciseName] = useState(name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
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
        console.log("Document successfully renamed!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    } else {
      console.log("Deletion cancelled.");
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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className=""
      ></input>
      <input type="checkbox" value="optionValue" className="ml-auto"></input>
      <button onClick={deleteExercise} className="ml-10">
        ❌
      </button>
    </div>
  );
}

export default ExercisesIndexItem;
