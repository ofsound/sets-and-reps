import { useEffect, useRef, useState } from "react";

type IncrementDecrementProps = {
  value: number;
  trySetValue: (newValue: number) => void;
};

function IncrementDecrement({ value, trySetValue }: IncrementDecrementProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseDownPlusOrMinus = useRef("minus");

  const handleMouseDownPlus = () => {
    mouseDownPlusOrMinus.current = "plus";
    mouseDownStartTime.current = Date.now();
    setIsMouseDown(true);
  };

  const handleMouseDownMinus = () => {
    mouseDownPlusOrMinus.current = "minus";
    mouseDownStartTime.current = Date.now();
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const mouseDownStartTime = useRef(0);

  useEffect(() => {
    if (isMouseDown) {
      const handleDuringMouseDown = () => {
        const timeSinceMouseDown = Date.now() - mouseDownStartTime.current;
        let delta = 1;

        if (timeSinceMouseDown > 1000) {
          delta = 2;
        }
        if (timeSinceMouseDown > 2000) {
          delta = 5;
        }
        if (timeSinceMouseDown > 3000) {
          delta = 10;
        }
        if (timeSinceMouseDown > 4000) {
          delta = 20;
        }
        if (timeSinceMouseDown > 5000) {
          delta = 30;
        }

        if (timeSinceMouseDown > 350) {
          if (mouseDownPlusOrMinus.current == "plus") {
            trySetValue(value + delta);
          } else {
            trySetValue(value - delta);
          }
        }
      };

      const interval = setInterval(handleDuringMouseDown, 80);
      return () => clearInterval(interval);
    }
  }, [isMouseDown, trySetValue]);

  useEffect(() => {
    if (isMouseDown) {
      window.addEventListener("pointerup", handleMouseUp);
    } else {
      window.removeEventListener("pointerup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, [isMouseDown]);

  return (
    <div className="no-select flex flex-col gap-2">
      <button
        className="block h-11 w-11 rounded-sm border border-gray-900 bg-gray-100 font-bold shadow-md"
        onClick={() => trySetValue(value + 1)}
        onPointerDown={handleMouseDownPlus}
      >
        <div className="pointer-events-none relative text-2xl">+</div>
      </button>
      <button
        className="block h-11 w-11 rounded-sm border border-gray-900 bg-gray-100 font-bold shadow-md"
        onClick={() => trySetValue(value - 1)}
        onPointerDown={handleMouseDownMinus}
      >
        <div className="pointer-events-none relative -top-0.5 text-2xl">–</div>
      </button>
    </div>
  );
}

export default IncrementDecrement;
