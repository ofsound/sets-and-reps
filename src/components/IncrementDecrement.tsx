import { useEffect, useRef, useState } from "react";

import type { MouseEvent } from "react";

type IncrementDecrementProps = {
  value: number;
  trySetValue: (newValue: number) => void;
};

function IncrementDecrement({ value, trySetValue }: IncrementDecrementProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseDownPlusOrMinus = useRef("minus");

  const plusElementRef = useRef(null);
  const minusElementRef = useRef(null);

  const handleMouseDownPlus = (event: MouseEvent) => {
    mouseDownPlusOrMinus.current = "plus";
    mouseDownStartTime.current = Date.now();
    setIsMouseDown(true);
  };

  const handleMouseDownMinus = (event: MouseEvent) => {
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
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDown]);

  return (
    <div className="flex flex-col gap-2">
      <button
        ref={plusElementRef}
        className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
        onClick={() => trySetValue(value + 1)}
        onMouseDown={handleMouseDownPlus}
      >
        <div className="pointer-events-none relative -top-0.5">+</div>
      </button>
      <button
        ref={minusElementRef}
        className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
        onClick={() => trySetValue(value - 1)}
        onMouseDown={handleMouseDownMinus}
      >
        <div className="pointer-events-none relative -top-px">–</div>
      </button>
    </div>
  );
}

export default IncrementDecrement;
