import { useEffect, useState } from "react";

type RestTimerProps = {
  lastSetLoggedAt: number | null;
};

const formatElapsedTime = (elapsedSeconds: number) => {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

function RestTimer({ lastSetLoggedAt }: RestTimerProps) {
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    if (lastSetLoggedAt === null) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [lastSetLoggedAt]);

  if (lastSetLoggedAt === null) {
    return null;
  }

  const elapsedSeconds = Math.max(
    0,
    Math.floor((currentTime - lastSetLoggedAt) / 1000),
  );

  return (
    <div className="absolute top-2 right-4 rounded-sm bg-gray-300 px-2 py-px text-sm font-bold text-black tabular-nums">
      Rest {formatElapsedTime(elapsedSeconds)}
    </div>
  );
}

export default RestTimer;
