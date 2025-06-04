import { useState } from "react";

type StartButtonProps = {
  start: (data: boolean) => void;
};

function StartButton({ start }: StartButtonProps) {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(false);
    setTimeout(() => {
      start(true);
    }, 1000);
  };

  return (
    <div className="h-full relative">
      <div
        className={`absolute transition-all duration-800 ease-in-out left-[50%] translate-x-[-50%]
            ${visible ? "top-[35%] opacity-100" : "top-[15%] opacity-0"}
          `}
      >
        Find the number or get as close as possible with the given numbers
      </div>
      <button
        onClick={handleClick}
        className={`absolute border-1 border-transparent hover:border-gray-700 transition-[top,opacity] duration-800 ease-in-out lg:translate-y-[-50%] left-[50%] translate-x-[-50%] top-[85%]
            ${visible ? "lg:top-[50%] opacity-100" : "lg:top-[85%] opacity-0"}
          `}
      >
        Start
      </button>
    </div>
  );
}

export default StartButton;
