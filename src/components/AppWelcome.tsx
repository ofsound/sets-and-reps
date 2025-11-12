import type { ExerciseObject } from "../interfaces.ts";

type AppWelcomeProps = {
  exercises: ExerciseObject[];
};

function AppWelcome({ exercises }: AppWelcomeProps) {
  return (
    <div className="flex h-full items-center">
      <div className="mx-auto rounded-lg bg-blue-400 p-10 text-center text-white">
        <div className="text-3xl font-bold">Sets and Reps</div>
        <div className="mt-2">{exercises.length} Exercises started.</div>
      </div>
    </div>
  );
}

export default AppWelcome;
