import { useRef, useState } from "react";

export default function Inputs() {
  const numbers = [6, 45, 2, 45, 63, 10];
  // const [sortedNumbers, setSortedNumbers] = useState(
  //   [...numbers].sort(function (a, b) {
  //     return a - b;
  //   })
  // );

  const sortedNumbers = [...numbers]
    .sort(function (a, b) {
      return a - b;
    })
    .map((number, index) => ({ id: index + 1, number: number }));

  const [listOption, setListOption] = useState(sortedNumbers);
  const [listOption2, setListOption2] = useState(sortedNumbers);
  const [listOption3, setListOption3] = useState(sortedNumbers);

  const [selectedNumber, setSelectedNumber] = useState({
    id: 0,
    number: 0,
  });
  const selectedNumberAsNumber = selectedNumber.number;

  const [secondSelectedNumber, setSecondSelectedNumber] = useState({
    id: 0,
    number: 0,
  });

  const secondSelectedNumberAsNumber = secondSelectedNumber.number;

  const [selectedSymbol, setSelectedSymbol] = useState("+");

  const [calculationResult, setCalculationResult] = useState<number | string>();

  let count = 0;

  function calculation(symbol: string) {
    let calculationNumber: number | string = 0;
    if (selectedNumberAsNumber !== 0 && secondSelectedNumberAsNumber !== 0) {
      if (symbol === "+") {
        calculationNumber =
          selectedNumberAsNumber + secondSelectedNumberAsNumber;
      } else if (symbol === "−") {
        calculationNumber =
          selectedNumberAsNumber - secondSelectedNumberAsNumber;
      } else if (symbol === "×") {
        calculationNumber =
          selectedNumberAsNumber * secondSelectedNumberAsNumber;
      } else if (symbol === "÷") {
        calculationNumber =
          selectedNumberAsNumber / secondSelectedNumberAsNumber;
      }

      if (calculationNumber <= 0) {
        calculationNumber = "Result must be a positive number";
      } else if (!Number.isInteger(calculationNumber)) {
        calculationNumber = "Result must be an integer";
      }
    } else {
      calculationNumber = "Select numbers";
    }
    setCalculationResult(calculationNumber);

    if (typeof calculationNumber === "number" && count === 0) {
      count = 1;
      setListOption3(
        sortedNumbers.filter(
          (entry) =>
            entry.id !== selectedNumber.id &&
            entry.id !== secondSelectedNumber.id
        )
      );
    } else {
      setListOption3(sortedNumbers);
      count = 0;
    }
  }

  function handleCalculation() {
    calculation(selectedSymbol);
  }

  function handleChangingNumber(
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) {
    e.preventDefault();

    if (i === 1) {
      setSelectedNumber(sortedNumbers[parseInt(e.target.value) - 1]);
      setListOption2(
        sortedNumbers.filter((entry) => entry.id !== parseInt(e.target.value))
      );
    } else if (i === 2) {
      setSecondSelectedNumber(sortedNumbers[parseInt(e.target.value) - 1]);
      setListOption(
        sortedNumbers.filter((entry) => entry.id !== parseInt(e.target.value))
      );
    }
  }
  console.log(listOption3);
  return (
    <>
      <select defaultValue={0} onChange={(e) => handleChangingNumber(e, 1)}>
        <option disabled value={0}></option>
        {listOption.map((entry) => (
          <option value={entry.id} key={entry.id}>
            {entry.number}
          </option>
        ))}
      </select>
      <div>
        {selectedNumber.number}
        {selectedSymbol}
        {secondSelectedNumber.number}
      </div>
      <select onChange={(e) => setSelectedSymbol(e.target.value)}>
        <option value="+">+</option>
        <option value="−">−</option>
        <option value="×">×</option>
        <option value="÷">÷</option>
      </select>
      <select defaultValue={0} onChange={(e) => handleChangingNumber(e, 2)}>
        <option disabled value={0}></option>
        {listOption2.map((entry) => (
          <option value={entry.id} key={entry.id}>
            {entry.number}
          </option>
        ))}
      </select>
      <button onClick={handleCalculation}>=</button>
      <div>{calculationResult}</div>
    </>
  );
}
