import type { ExerciseObject, SetObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExercise: (exercise: ExerciseObject) => void;
};

const getLastDateFromExercise = (exercise: ExerciseObject) => {
  let lastDate: number = 0;

  exercise.attempts.forEach((attempt: SetObject[]) => {
    attempt.forEach((set) => {
      lastDate = set.date;
    });
  });

  const date = new Date(lastDate);
  return date
    .toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    })
    .toLocaleLowerCase()
    .replace(/ (\s*)pm/g, "pm")
    .replace(/ (\s*)am/g, "am");
};

function ExercisesMenu({ exercises, setCurrentExercise }: ExercisesMenuProps) {
  return (
    <div className="w-full flex-1 overflow-auto bg-gray-200 pt-3">
      {exercises
        .filter((item) => item.isCurrent === true)
        .map((item) => (
          <button
            key={item.id}
            className="relative mx-auto mb-3 flex w-9/10 cursor-pointer items-baseline justify-center rounded-lg bg-linear-to-b from-slate-400 via-gray-500 to-neutral-500 py-1 text-white"
            onClick={() => {
              setCurrentExercise(item);
            }}
          >
            <div className="absolute top-[9px] right-3 ml-4 text-xs text-zinc-300">
              {getLastDateFromExercise(item)}
            </div>

            <div className="relative w-max">
              <span className="text-shadow-md">{item.name}</span>
            </div>
          </button>
        ))}
    </div>
  );
}

export default ExercisesMenu;
