import { useEffect, useRef, useState } from "react";

type TimerProps = {
  gameIsReady: boolean;
  handleTimerEnd: (data: boolean) => void;
  gameHasEnded: boolean;
};

function Timer({ gameIsReady, handleTimerEnd, gameHasEnded }: TimerProps) {
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameIsReady && timerRef.current !== null) {
      let timeLeft = 10;
      const intervalId = setInterval(() => {
        if (timerRef.current !== null) {
          timeLeft--;
          timerRef.current.innerText = `00:${
            timeLeft < 10 ? "0" : ""
          }${timeLeft.toString()}`;
        }
        if (timeLeft === 0 || gameHasEnded) {
          handleTimerEnd(true);
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameIsReady, gameHasEnded]);

  return (
    <>
      <div ref={timerRef} className="text-6xl sm:text-9xl">
        01:00
      </div>
    </>
  );
}

export default Timer;
