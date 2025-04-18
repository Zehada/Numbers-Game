import { useState } from "react";

type StartButtonProps = {
  start: (data: boolean) => void;
  started: boolean;
};

function StartButton({ start, started }: StartButtonProps) {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(false);
    setTimeout(() => {
      start(true);
    }, 1000);
  };

  return (
    <>
      <div
        className={`relative transition-all duration-800 ease-in-out translate-y-[-50%]
            ${visible ? "top-[40%] opacity-100" : "top-[15%] opacity-0"}
          `}
      >
        Find the number or get as close as possible
      </div>
      <button
        onClick={handleClick}
        className={`relative transition-all duration-800 ease-in-out translate-y-[-50%]
            ${visible ? "top-[50%] opacity-100" : "top-[85%] opacity-0"}
          `}
      >
        Start
      </button>
    </>
  );
}

export default StartButton;
