import { useEffect, useState } from "react";

type InputsProps = {
  numbersList: { id: number; number: number }[];
  numbersLeft: any;
};

function Inputs({ numbersList, numbersLeft }: InputsProps) {
  const [listOption, setListOption] = useState(numbersList);
  const [listOption2, setListOption2] = useState(numbersList);

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

  const [calculationResults, setCalculationResults] = useState([
    {
      number1: 0,
      number1Id: 0,
      symbol: "",
      number2: 0,
      number2Id: 0,
      result: 0,
      resultId: 0,
    },
  ]);

  const [newNumberIndex, setNewNumberIndex] = useState(7);

  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    setListOption(numbersList);
    setListOption2(numbersList);
  }, [numbersList]);

  useEffect(() => {
    setSelectedNumber({
      id: 0,
      number: 0,
    });

    setSecondSelectedNumber({
      id: 0,
      number: 0,
    });
  }, [calculationResults]);

  function handleChangingNumber(
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) {
    e.preventDefault();

    const selectedValue = parseInt(e.target.value);

    if (selectedValue !== 0) {
      // Filtrer l'élément sélectionné de `sortedNumbers`
      const selectedNumber = numbersList.filter(
        (entry) => entry.id === selectedValue
      )[0];
      const filteredList = numbersList.filter(
        (entry) => entry.id !== selectedValue
      );

      if (i === 1) {
        setSelectedNumber(selectedNumber);
        setListOption2(filteredList);
      } else if (i === 2) {
        setSecondSelectedNumber(selectedNumber);
        setListOption(filteredList);
      }
    } else {
      if (i === 1) {
        setListOption2(numbersList);
      } else if (i === 2) {
        setListOption(numbersList);
      }
    }
  }

  let calculationNumber: number = 0;

  function calculation(symbol: string) {
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
        setResultMessage("Result must be a positive number");
        calculationNumber = 0;
      } else if (!Number.isInteger(calculationNumber)) {
        setResultMessage("Result must be an integer");
        calculationNumber = 0;
      }
    } else {
      setResultMessage("Select numbers");
      // calculationNumber = 0;
    }

    if (calculationNumber > 0) {
      setResultMessage("");
      setCalculationResults([
        ...calculationResults,
        {
          number1: selectedNumberAsNumber,
          number1Id: selectedNumber.id,
          symbol: symbol,
          number2: secondSelectedNumberAsNumber,
          number2Id: secondSelectedNumber.id,
          result: calculationNumber,
          resultId: newNumberIndex,
        },
      ]);

      numbersLeft((previousList: { id: number; number: number }[]) =>
        [
          ...previousList.filter(
            (entry) =>
              entry.id !== selectedNumber.id &&
              entry.id !== secondSelectedNumber.id
          ),
          { id: newNumberIndex, number: calculationNumber },
        ].sort(function (a, b) {
          return a.number - b.number;
        })
      );

      setNewNumberIndex(newNumberIndex + 1);
    }
    return calculationNumber;
  }

  function handleCalculation() {
    calculation(selectedSymbol);

    if (calculationNumber != 0) {
      setSelectedNumber({
        id: 0,
        number: 0,
      });

      setSecondSelectedNumber({
        id: 0,
        number: 0,
      });
    }
  }

  console.log(calculationResults);
  console.log(secondSelectedNumber);

  function handleDelete(
    i: number,
    number1: number,
    number1Id: number,
    number2: number,
    number2Id: number,
    result: number,
    resultId: number
  ) {
    calculationResults.map((calculation) => {
      if (
        resultId === calculation.number1Id ||
        resultId === calculation.number2Id
      ) {
        setCalculationResults((previousResults) =>
          previousResults.filter((entry) => entry !== calculation)
        );

        numbersLeft((previousList: { id: number; number: number }[]) =>
          previousList.filter((entry) => entry.id !== calculation.resultId)
        );

        if (resultId === calculation.number1Id) {
          console.log("hello");
          numbersLeft((previousList: { id: number; number: number }[]) => [
            ...previousList,
            { id: calculation.number2Id, number: calculation.number2 },
          ]);
        } else if (resultId === calculation.number2Id) {
          numbersLeft((previousList: { id: number; number: number }[]) => [
            ...previousList,
            ,
            { id: calculation.number1Id, number: calculation.number1 },
          ]);
        }
      }
    });

    numbersLeft((previousList: { id: number; number: number }[]) =>
      [
        ...previousList.filter((entry) => entry.id !== resultId),
        { id: number1Id, number: number1 },
        { id: number2Id, number: number2 },
      ].sort(function (a, b) {
        return a.number - b.number;
      })
    );

    setCalculationResults((previousResults) =>
      previousResults.filter((entry) => entry !== calculationResults[i])
    );
  }

  return (
    <>
      <select defaultValue={0} onChange={(e) => handleChangingNumber(e, 1)}>
        <option value={0}></option>
        {listOption.map((entry) => (
          <option value={entry.id} key={entry.id}>
            {entry.number}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSelectedSymbol(e.target.value)}>
        <option value="+">+</option>
        <option value="−">−</option>
        <option value="×">×</option>
        <option value="÷">÷</option>
      </select>
      <select defaultValue={0} onChange={(e) => handleChangingNumber(e, 2)}>
        <option value={0}></option>
        {listOption2.map((entry) => (
          <option value={entry.id} key={entry.id}>
            {entry.number}
          </option>
        ))}
      </select>
      <button onClick={handleCalculation}>=</button>
      {resultMessage !== "" && <div>{resultMessage}</div>}

      {calculationResults.map((calculation, index) =>
        index != 0 ? (
          <div key={index}>
            <div>
              {calculation.number1} {calculation.symbol} {calculation.number2} ={" "}
              {calculation.result}
            </div>
            <button
              onClick={() =>
                handleDelete(
                  index,
                  calculation.number1,
                  calculation.number1Id,
                  calculation.number2,
                  calculation.number2Id,
                  calculation.result,
                  calculation.resultId
                )
              }
            >
              x
            </button>
          </div>
        ) : (
          ""
        )
      )}
    </>
  );
}

export default Inputs;
