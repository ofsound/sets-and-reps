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

const getCalendarDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

const pastDateColors = ["bg-neutral-200", "bg-neutral-300", "bg-neutral-400"];

function ExercisesMenu({ exercises, setCurrentExercise }: ExercisesMenuProps) {
  const currentExercises = exercises.filter((item) => item.isCurrent === true);
  const exercisesWithDates = currentExercises.map((exercise) => ({
    exercise,
    lastDate: getLastDateFromExercise(exercise),
  }));
  const dates = [
    ...new Set(
      exercisesWithDates.flatMap(({ lastDate }) =>
        lastDate === null ? [] : [getCalendarDate(lastDate)],
      ),
    ),
  ].sort((a, b) => b - a);
  const dateColors = new Map(
    dates.map((date, index) => [
      date,
      index === 0
        ? "bg-amber-300"
        : pastDateColors[(index - 1) % pastDateColors.length],
    ]),
  );

  return (
    <div className="w-full flex-1 overflow-auto bg-gray-200 pt-3">
      {exercisesWithDates.map(({ exercise: item, lastDate: exerciseDate }) => {
        return (
          <button
            key={item.id}
            className="relative mx-auto mb-3 flex w-9/10 cursor-pointer items-baseline justify-center rounded-lg bg-linear-to-b from-slate-400 via-gray-500 to-neutral-500 py-1 text-white"
            onClick={() => {
              setCurrentExercise(item);
            }}
          >
            {exerciseDate !== null && (
              <div
                className={`absolute top-[9px] right-3 ml-4 rounded-md px-2 py-0.5 text-xs font-bold text-gray-900 shadow-sm ${dateColors.get(getCalendarDate(exerciseDate))}`}
              >
                {formatExerciseDate(exerciseDate)}
              </div>
            )}

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
