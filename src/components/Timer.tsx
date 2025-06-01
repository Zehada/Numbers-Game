import { useEffect, useRef, useState } from "react";

type TimerProps = {
  gameIsReady: boolean;
};

function Timer({ gameIsReady }: TimerProps) {
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameIsReady && timerRef.current !== null) {
      let timeLeft = 60;
      const intervalId = setInterval(() => {
        if (timerRef.current !== null) {
          timeLeft--;
          timerRef.current.innerText = `00:${
            timeLeft < 10 ? "0" : ""
          }${timeLeft.toString()}`;
        }
        if (timeLeft === 0) {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameIsReady]);

  return (
    <>
      <div ref={timerRef} className="text-6xl sm:text-9xl">
        01:00
      </div>
    </>
  );
}

export default Timer;
