import { useEffect, useRef, useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs";
import NumbersToPlayWith from "./components/NumbersToPlayWith";
import NumberToGuess from "./components/NumberToGuess";
import EndMessage from "./components/EndMessage";
import WinCalculation from "./components/WinCalculation";
import StartButton from "./components/StartButton";
import Timer from "./components/Timer";

function App() {
  // const numbers = [6, 45, 2, 6, 63, 10];
  const [numbers, setNumbers] = useState<number[]>([]);

  const [numbersList, setNumbersList] = useState<
    { id: number; number: number }[]
  >([]);

  const [numberToGuess, setNumberToGuess] = useState(0);

  // const [numbersList, setNumbersList] = useState<
  //   { id: number; number: number }[]
  // >(
  //   [...numbers]
  //     .sort(function (a, b) {
  //       return a - b;
  //     })
  //     .map((number, index) => ({ id: index + 1, number: number }))
  // );

  const [started, setStarted] = useState(false);
  const [numbersDropped, setNumbersDropped] = useState(false);
  const [numberToGuessDone, setNumberToGuessDone] = useState(false);
  const [numbersTransitionDone, setNumbersTransitionDone] = useState(false);
  const [bodyIsTransitionReady, setBodyIsTransitionReady] = useState(false);
  const [gameIsReady, setGameIsReady] = useState(false);

  useEffect(() => {
    setNumbersList(
      [...numbers]
        .sort(function (a, b) {
          return a - b;
        })
        .map((number, index) => ({ id: index + 1, number: number }))
    );
  }, [numbers]);

  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [timerHasEnded, setTimerHasEnded] = useState(false);

  const [closestNumberUp, setClosestNumberUp] = useState<number>();
  const [closestNumberDown, setClosestNumberDown] = useState<number>();

  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    numbersList.map((number) => {
      if (
        (number.number === numberToGuess ||
          number.number === closestNumberUp ||
          number.number === closestNumberDown) &&
        timerHasEnded === false
      ) {
        setGameHasEnded(true);
        setGameStatus("won");
      } else if (timerHasEnded === true) {
        setGameStatus("lost");
      }
    });
  }, [numbersList, timerHasEnded]);

  function handleNumberToGuess(data: number): void {
    setNumberToGuess(data);
  }

  function handleNumbers(data: number[]): void {
    setNumbers(data);
  }

  function handleNumbersLeft(data: { id: number; number: number }[]): void {
    setNumbersList(data);
  }

  function handleStart(data: boolean): void {
    setStarted(data);
  }

  function handleClosestNumberUp(data: number): void {
    setClosestNumberUp(data);
  }
  function handleClosestNumberDown(data: number): void {
    setClosestNumberDown(data);
  }

  function handleTimerEnd(data: boolean): void {
    setTimerHasEnded(data);
  }

  useEffect(() => {
    if (started) {
      const timeoutId = setTimeout(() => {
        setNumbersDropped(true);
      }, 4200);

      return () => clearTimeout(timeoutId);
    }
  }, [started]);

  useEffect(() => {
    if (numbersDropped) {
      const timeoutId = setTimeout(() => {
        setNumberToGuessDone(true);
      }, 2820);

      return () => clearTimeout(timeoutId);
    }
  }, [numbersDropped]);

  useEffect(() => {
    if (numberToGuessDone) {
      const timeoutId = setTimeout(() => {
        setNumbersTransitionDone(true);
      }, 700);

      return () => clearTimeout(timeoutId);
    }
  }, [numberToGuessDone]);

  useEffect(() => {
    if (numbersTransitionDone) {
      const timeoutId = setTimeout(() => {
        setBodyIsTransitionReady(true);
      }, 20);

      return () => clearTimeout(timeoutId);
    }
  }, [numbersTransitionDone]);

  useEffect(() => {
    if (bodyIsTransitionReady) {
      const timeoutId = setTimeout(() => {
        setGameIsReady(true);
      }, 700);

      return () => clearTimeout(timeoutId);
    }
  }, [bodyIsTransitionReady]);

  return (
    <>
      <div
        className={`-z-1 opacity-5 fixed ${gameIsReady ? "block" : "hidden"}`}
      >
        <Timer
          gameIsReady={gameIsReady}
          handleTimerEnd={handleTimerEnd}
          gameHasEnded={gameHasEnded}
        />
      </div>
      {started ? (
        <main
          className={`w-2/3 flex flex-col transition-all duration-700 ease-in-out ${
            !bodyIsTransitionReady ? "justify-between" : ""
          } ${!numberToGuessDone ? "h-[calc(50%+5.5rem)]" : "h-full"}`}
        >
          <div
            className={`flex justify-center items-end mb-4 transition-all duration-700 ease-in-out ${
              numberToGuessDone
                ? "h-[7.5rem] xxs:h-[2.5rem] xs:h-[3.5rem]"
                : "h-1/2"
            }`}
          >
            <NumbersToPlayWith
              randomNumbers={handleNumbers}
              numbers={numbers}
              started={started}
              numbersDropped={numbersDropped}
            />
          </div>
          <div
            className={`transition-opacity duration-700 ease-in-out ${
              numbersTransitionDone ? "block" : "hidden"
            } ${bodyIsTransitionReady ? "opacity-100 grow" : "opacity-0"}`}
          >
            <Inputs
              numbersList={numbersList}
              numbersLeft={handleNumbersLeft}
              gameHasEnded={gameHasEnded}
            />
          </div>
          <WinCalculation
            numbers={numbers}
            numberToGuess={numberToGuess}
            handleClosestNumberUp={handleClosestNumberUp}
            handleClosestNumberDown={handleClosestNumberDown}
          />

          {gameStatus !== "playing" ? (
            <EndMessage gameStatus={gameStatus} />
          ) : (
            ""
          )}

          <div className={`${numbersDropped ? "opacity-100" : "opacity-0"}`}>
            <NumberToGuess
              numbersDropped={numbersDropped}
              handleNumberToGuess={handleNumberToGuess}
              numberToGuess={numberToGuess}
            />
          </div>
        </main>
      ) : (
        <div className="w-full h-screen">
          <StartButton start={handleStart} />
        </div>
      )}
    </>
  );
}

export default App;
