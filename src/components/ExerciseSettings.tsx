import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config.ts";
import type { ExerciseObject } from "../interfaces.ts";

function ExerciseSettings({ exercise }: { exercise: ExerciseObject }) {
  const [settings, setSettings] = useState(exercise.settings ?? "");
  const [saveFailed, setSaveFailed] = useState(false);

  const saveSettings = async () => {
    if (settings === (exercise.settings ?? "")) return;

    setSaveFailed(false);
    try {
      await updateDoc(doc(db, "exercises", exercise.id), { settings });
    } catch (error) {
      console.error("Could not save exercise settings:", error);
      setSaveFailed(true);
    }
  };

  return (
    <div className="relative min-w-0">
      <input
        aria-label={`Equipment settings for ${exercise.name}`}
        title="Equipment settings — saved when you finish editing"
        placeholder="Settings…"
        type="text"
        enterKeyHint="done"
        autoComplete="off"
        value={settings}
        onChange={(event) => setSettings(event.target.value)}
        onBlur={() => void saveSettings()}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.nativeEvent.isComposing) {
            event.currentTarget.blur();
          }
        }}
        className="block w-full min-w-0 rounded-sm border border-gray-400/60 bg-gray-100 px-1 py-px text-sm text-black placeholder:text-gray-500 focus:border-gray-600 focus:text-base focus:outline-none"
      />
      {saveFailed && (
        <button
          role="alert"
          onClick={() => void saveSettings()}
          className="absolute top-full left-0 z-300 rounded-sm bg-red-100 px-1 text-xs text-red-800"
        >
          Couldn't save. Retry
        </button>
      )}
    </div>
  );
}

export default ExerciseSettings;
