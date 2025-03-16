import { useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs";

function App() {
  const numbers = [6, 45, 2, 6, 63, 10];
  const [numbersList, setNumbersList] = useState<
    { id: number; number: number }[]
  >(
    [...numbers]
      .sort(function (a, b) {
        return a - b;
      })
      .map((number, index) => ({ id: index + 1, number: number }))
  );

  function handleNumbersLeft(data: { id: number; number: number }[]) {
    setNumbersList(data);
  }

  return (
    <>
      <Inputs numbersList={numbersList} numbersLeft={handleNumbersLeft} />
    </>
  );
}

export default App;
