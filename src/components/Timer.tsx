import { useEffect, useRef, useState } from "react";

type TimerProps = {
  gameIsReady: boolean;
  handleTimerEnd: (data: boolean) => void;
  gameHasEnded: boolean;
};

function Timer({ gameIsReady, handleTimerEnd, gameHasEnded }: TimerProps) {
  const timerRef = useRef<HTMLDivElement>(null);

  const [lastTimerState, setLastTimerState] = useState<number>(0);

  useEffect(() => {
    if (gameIsReady && timerRef.current !== null) {
      let timeLeft = 10;
      const intervalId = setInterval(() => {
        if (timerRef.current !== null && !gameHasEnded) {
          timeLeft--;
          setLastTimerState(timeLeft);
          timerRef.current.innerText = `00:${
            timeLeft < 10 ? "0" : ""
          }${timeLeft.toString()}`;
        }
        if (timeLeft === 0) {
          handleTimerEnd(true);
          clearInterval(intervalId);
        } else if (gameHasEnded && timerRef.current !== null) {
          timerRef.current.innerText = `00:${
            lastTimerState < 10 ? "0" : ""
          }${lastTimerState.toString()}`;

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
