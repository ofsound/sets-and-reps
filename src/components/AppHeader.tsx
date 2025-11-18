type AppHeaderProps = {
  showManager: () => void;
  toggleMenu: () => void;
  appHeading: string;
  currentAppView: string;
};

function AppHeader({
  showManager,
  toggleMenu,
  appHeading,
  currentAppView,
}: AppHeaderProps) {
  return (
    <div>
      <div className="relative flex h-11 justify-between px-4 pt-2">
        {currentAppView !== "manager" && (
          <div
            onClick={() => {
              toggleMenu();
            }}
            className="relative z-200 flex-1 cursor-pointer font-bold text-black select-none"
          >
            <div className="mx-auto w-max rounded-sm bg-gray-300 px-3 py-px">
              {appHeading} ⏷
            </div>
          </div>
        )}
      </div>
      {currentAppView === "menu" && (
        <button
          onClick={showManager}
          className="absolute top-2 right-1/20 z-200 mx-auto flex h-6.5 w-9 cursor-pointer justify-center rounded-sm bg-gray-300 py-1 text-sm text-black"
        >
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
        </button>
      )}
      {currentAppView === "manager" && (
        <button
          onClick={toggleMenu}
          className="absolute top-2 right-1/20 z-200 mx-auto flex h-6.5 w-9 cursor-pointer justify-center rounded-sm bg-gray-300 pt-1 text-base font-black text-black"
        >
          <svg
            className="relative top-1 -left-px"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
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
    </div>
  );
}

export default AppHeader;
