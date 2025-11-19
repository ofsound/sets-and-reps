import type { SetObject } from "../interfaces.ts";

type SetProps = {
  set: SetObject;
  index: number;
  editModeEnabledOnAttempt: boolean;
  deleteSet: (set: SetObject) => void;
  duplicateSet: (set: SetObject) => void;
  armSetForUpdate: (set: SetObject) => void;
  isArmedSet: boolean;
};

function Set({
  set,
  editModeEnabledOnAttempt,
  deleteSet,
  duplicateSet,
  armSetForUpdate,
  isArmedSet,
}: SetProps) {
  const dateToTime = (dateNumber: number): string => {
    const date = new Date(dateNumber);
    return date
      .toLocaleDateString("en-US", {
        // year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
      })
      .toLocaleLowerCase()
      .replace(/ (\s*)pm/g, "pm");
  };

  return (
    <div
      className={`my-1 flex items-baseline border border-transparent px-1 ${editModeEnabledOnAttempt && "cursor-pointer"} ${editModeEnabledOnAttempt && isArmedSet && "border border-gray-300 bg-white shadow-sm"}`}
    >
      <div
        onClick={() => {
          if (editModeEnabledOnAttempt) {
            armSetForUpdate(set);
          }
        }}
        className={`flex flex-1`}
      >
        <div className="text-base font-bold">{set.measurement}</div>
        {set.measurement !== "" && (
          <div className="relative top-0.5 text-sm font-semibold">
            &nbsp;x&nbsp;
          </div>
        )}
        <div className="text-base font-bold">{set.reps}</div>
        <div className="ml-4 flex-1 text-sm italic">{set.notes}</div>
      </div>
      <div
        className={`ml-auto text-xs ${editModeEnabledOnAttempt && "hidden"}`}
      >
        {dateToTime(set.date)}
      </div>
      {editModeEnabledOnAttempt && (
        <div>
          <button
            onClick={() => duplicateSet(set)}
            className="text-sm text-black"
          >
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="duplicate">
                <g id="duplicate_2">
                  <path
                    id="Combined Shape"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.2827 4.88487C28.7191 4.31826 27.954 4 27.1556 4H14.9996C13.3433 4 11.9996 5.34372 11.9996 7V37C11.9996 38.6563 13.3433 40 14.9996 40H31.9992V41C31.9992 41.5526 31.5521 42 30.9992 42H10.9992C10.4475 42 9.99921 41.5517 9.99921 41V9C9.99921 8.44772 9.55149 8 8.99921 8C8.44692 8 7.99921 8.44772 7.99921 9V41C7.99921 42.6563 9.34292 44 10.9992 44H30.9992C32.657 44 33.9992 42.6568 33.9992 41V40H34.9996C36.6574 40 37.9996 38.6568 37.9996 37V17.0162H39.0226C39.5749 17.0162 40.0226 16.5685 40.0226 16.0162C40.0226 15.4639 39.5749 15.0162 39.0226 15.0162H37.9996V14.888C37.9996 14.0969 37.6859 13.3381 37.1285 12.7747L29.2827 4.88487ZM27.0266 15.0162H35.9996V14.888C35.9996 14.6251 35.8947 14.3713 35.7085 14.1831L27.8646 6.29523C27.6764 6.10599 27.4216 6 27.1556 6H14.9996C14.4479 6 13.9996 6.44828 13.9996 7V37C13.9996 37.5517 14.4479 38 14.9996 38H34.9996C35.5525 38 35.9996 37.5526 35.9996 37V17.0162H26.2286C25.5662 17.0162 25.0266 16.4803 25.0266 15.8162V8.9482C25.0266 8.39592 25.4743 7.9482 26.0266 7.9482C26.5789 7.9482 27.0266 8.39592 27.0266 8.9482V15.0162Z"
                    fill="#000000"
                  />
                </g>
              </g>
            </svg>
          </button>
          <button onClick={() => deleteSet(set)} className="ml-3 text-sm">
            <svg
              className="h-5 w-5"
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
      )}
    </div>
  );
}

export default Set;
