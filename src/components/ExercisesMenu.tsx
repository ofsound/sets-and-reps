import type { ExerciseObject, SetObject } from "../interfaces.ts";

type ExercisesMenuProps = {
  exercises: ExerciseObject[];
  setCurrentExercise: (exercise: ExerciseObject) => void;
};

const getLastDateFromExercise = (exercise: ExerciseObject): number | null => {
  let lastDate: number | null = null;

  exercise.attempts.forEach((attempt: SetObject[]) => {
    attempt.forEach((set) => {
      if (lastDate === null || set.date > lastDate) {
        lastDate = set.date;
      }
    });
  });

  return lastDate;
};

const formatExerciseDate = (dateNumber: number | null) => {
  if (dateNumber === null) {
    return "";
  }

  return new Date(dateNumber)
    .toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    })
    .toLocaleLowerCase()
    .replace(/ (\s*)pm/g, "pm")
    .replace(/ (\s*)am/g, "am");
};

const isSameCalendarDate = (firstDate: number, secondDate: number) => {
  const first = new Date(firstDate);
  const second = new Date(secondDate);

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

function ExercisesMenu({ exercises, setCurrentExercise }: ExercisesMenuProps) {
  const currentExercises = exercises.filter((item) => item.isCurrent === true);
  const mostRecentDate = currentExercises.reduce<number | null>(
    (latestDate, exercise) => {
      const exerciseDate = getLastDateFromExercise(exercise);

      if (
        exerciseDate !== null &&
        (latestDate === null || exerciseDate > latestDate)
      ) {
        return exerciseDate;
      }

      return latestDate;
    },
    null,
  );

  return (
    <div className="w-full flex-1 overflow-auto bg-gray-200 pt-3">
      {currentExercises.map((item) => {
        const exerciseDate = getLastDateFromExercise(item);
        const isMostRecentDate =
          exerciseDate !== null &&
          mostRecentDate !== null &&
          isSameCalendarDate(exerciseDate, mostRecentDate);

        return (
          <button
            key={item.id}
            className="relative mx-auto mb-3 flex w-9/10 cursor-pointer items-baseline justify-center rounded-lg bg-linear-to-b from-slate-400 via-gray-500 to-neutral-500 py-1 text-white"
            onClick={() => {
              setCurrentExercise(item);
            }}
          >
            <div
              className={`absolute top-[9px] right-3 ml-4 text-xs ${isMostRecentDate ? "rounded-md bg-amber-300 px-2 py-0.5 font-bold text-gray-900 shadow-sm" : "text-zinc-300"}`}
            >
              {formatExerciseDate(exerciseDate)}
            </div>

            <div className="relative w-max">
              <span className="text-shadow-md">{item.name}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ExercisesMenu;
