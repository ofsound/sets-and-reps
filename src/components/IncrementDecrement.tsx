type IncrementDecrementProps = {
  value: number;
  trySetValue: (newValue: number) => void;
};

function IncrementDecrement({ value, trySetValue }: IncrementDecrementProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
        onClick={() => trySetValue(value + 1)}
      >
        <div className="relative -top-0.5">+</div>
      </button>
      <button
        className="block h-10 w-10 rounded-sm border border-gray-900 bg-gray-100 text-xl font-bold shadow-md"
        onClick={() => trySetValue(value - 1)}
      >
        <div className="relative -top-px">–</div>
      </button>
    </div>
  );
}

export default IncrementDecrement;
