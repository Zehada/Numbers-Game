import { useEffect, useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs";
import NumbersToPlayWith from "./components/NumbersToPlayWith";
import NumberToGuess from "./components/NumberToGuess";
import EndMessage from "./components/EndMessage";
import WinCalculation from "./components/WinCalculation";

function App() {
  // const numbers = [6, 45, 2, 6, 63, 10];
  const [numbers, setNumbers] = useState<number[]>([]);

  const [numbersList, setNumbersList] = useState([{ id: 0, number: 0 }]);

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

  useEffect(() => {
    setNumbersList(
      [...numbers]
        .sort(function (a, b) {
          return a - b;
        })
        .map((number, index) => ({ id: index + 1, number: number }))
    );
  }, [numbers]);

  function handleNumberToGuess(data: number) {
    setNumberToGuess(data);
  }

  function handleNumbers(data: number[]) {
    setNumbers(data);
  }

  function handleNumbersLeft(data: { id: number; number: number }[]) {
    setNumbersList(data);
  }

  return (
    <>
      <NumbersToPlayWith randomNumbers={handleNumbers} numbers={numbers} />

      <Inputs numbersList={numbersList} numbersLeft={handleNumbersLeft} />

      <NumberToGuess
        handleNumberToGuess={handleNumberToGuess}
        numberToGuess={numberToGuess}
      />

      <WinCalculation numbers={numbers} numberToGuess={numberToGuess} />

      <EndMessage numbersList={numbersList} numberToGuess={numberToGuess} />
    </>
  );
}

export default App;
