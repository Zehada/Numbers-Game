import { useEffect, useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs";
import NumbersToPlayWith from "./components/NumbersToPlayWith";
import NumberToGuess from "./components/NumberToGuess";
import EndMessage from "./components/EndMessage";
import WinCalculation from "./components/WinCalculation";
import StartButton from "./components/StartButton";

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

  useEffect(() => {
    setNumbersList(
      [...numbers]
        .sort(function (a, b) {
          return a - b;
        })
        .map((number, index) => ({ id: index + 1, number: number }))
    );
  }, [numbers]);

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

  return (
    <>
      {started ? (
        <main>
          <NumbersToPlayWith randomNumbers={handleNumbers} numbers={numbers} />

          <Inputs numbersList={numbersList} numbersLeft={handleNumbersLeft} />

          <NumberToGuess
            handleNumberToGuess={handleNumberToGuess}
            numberToGuess={numberToGuess}
          />

          <WinCalculation numbers={numbers} numberToGuess={numberToGuess} />

          <EndMessage numbersList={numbersList} numberToGuess={numberToGuess} />
        </main>
      ) : (
        <StartButton start={handleStart} started={started} />
      )}
    </>
  );
}

export default App;
