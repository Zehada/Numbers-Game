import { useEffect, useRef, useState } from "react";

type InputsProps = {
  numbersList: { id: number; number: number }[];
  numbersLeft: (data: { id: number; number: number }[]) => void;
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

  const [selectedSymbol, setSelectedSymbol] = useState("");

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

  function handleChangingNumber(selectedId: number, i: number) {
    if (selectedId !== 0) {
      const selectedNumber = numbersList.filter(
        (entry) => entry.id === selectedId
      )[0];
      const filteredList = numbersList.filter(
        (entry) => entry.id !== selectedId
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
    if (
      selectedNumberAsNumber !== 0 &&
      secondSelectedNumberAsNumber !== 0 &&
      selectedSymbol !== ""
    ) {
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
    } else if (
      selectedNumberAsNumber === 0 ||
      secondSelectedNumberAsNumber === 0 ||
      selectedSymbol === ""
    ) {
      setResultMessage("Select numbers and symbol");
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

      numbersLeft(
        [
          ...numbersList.filter(
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
      setSelectedSymbol("");
    }
  }

  type CalculationToDelete = {
    number1: number;
    number1Id: number;
    number2: number;
    number2Id: number;
    resultId: number;
  };

  const [calculationsToDelete, setCalculationsToDelete] = useState<
    CalculationToDelete[]
  >([]);

  const [deleteRound, setDeleteRound] = useState<number>(0);

  function handleDelete(
    number1: number,
    number1Id: number,
    number2: number,
    number2Id: number,
    resultId: number
  ) {
    setCalculationsToDelete((prev) => [
      ...prev,
      {
        number1: number1,
        number1Id: number1Id,
        number2: number2,
        number2Id: number2Id,
        resultId: resultId,
      },
    ]);
  }

  useEffect(() => {
    if (calculationsToDelete.length === 0) return;
    // if (deleteRound >= calculationsToDelete.length) return;
    const calculationToDelete = calculationsToDelete[deleteRound];

    const dependent = calculationResults.filter(
      (calc) =>
        calc.number1Id === calculationToDelete.resultId ||
        calc.number2Id === calculationToDelete.resultId
    );

    const dependentNumber1 = calculationsToDelete.filter(
      (calc) => calc.resultId === calculationToDelete.number1Id
    );

    const dependentNumber2 = calculationsToDelete.filter(
      (calc) => calc.resultId === calculationToDelete.number2Id
    );

    const newDelete = dependent.map((calc) => ({
      number1: calc.number1,
      number1Id: calc.number1Id,
      number2: calc.number2,
      number2Id: calc.number2Id,
      resultId: calc.resultId,
    }));

    setCalculationResults((previousResults) =>
      previousResults.filter(
        (entry) => entry.resultId !== calculationToDelete.resultId
      )
    );

    numbersLeft(
      [
        ...numbersList.filter(
          (entry) => entry.id !== calculationToDelete.resultId
        ),
        ...(dependentNumber1.length === 0
          ? [
              {
                id: calculationToDelete.number1Id,
                number: calculationToDelete.number1,
              },
            ]
          : []),
        ...(dependentNumber2.length === 0
          ? [
              {
                id: calculationToDelete.number2Id,
                number: calculationToDelete.number2,
              },
            ]
          : []),
      ].sort(function (a, b) {
        return a.number - b.number;
      })
    );

    console.log(deleteRound);
    console.log(calculationsToDelete);

    if (dependent.length === 0) {
      setCalculationsToDelete([]);
      setDeleteRound(0);
    } else {
      setCalculationsToDelete((prev) => [...prev, ...newDelete]);
      setDeleteRound((prev) => prev + 1);
    }
  }, [calculationsToDelete, deleteRound]);

  function clearSelectedNumbers(
    ref1: React.RefObject<HTMLDivElement>,
    ref2: React.RefObject<HTMLDivElement>,
    ref3: React.RefObject<HTMLDivElement>,
    ref4: React.RefObject<HTMLButtonElement>
  ) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: MouseEvent) {
        if (
          ref1.current &&
          !ref1.current.contains(event.target as Node) &&
          ref2.current &&
          !ref2.current.contains(event.target as Node) &&
          ref3.current &&
          !ref3.current.contains(event.target as Node) &&
          ref4.current &&
          !ref4.current.contains(event.target as Node)
        ) {
          setSelectedNumber({
            id: 0,
            number: 0,
          });
          setSecondSelectedNumber({
            id: 0,
            number: 0,
          });
          setSelectedSymbol("");

          setListOption(numbersList);
          setListOption2(numbersList);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref1, ref2, ref3, ref4, numbersList]);
  }

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLButtonElement>(null);
  clearSelectedNumbers(ref1, ref2, ref3, ref4);

  useEffect(() => {}, [numbersList]);

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div className="flex justify-center gap-10 w-full flex-wrap sm:flex-nowrap max-w-150">
          <div
            ref={ref1}
            className="flex flex-col justify-center min-h-48 rounded-lg w-full p-2.5 inset-shadow-sm/40 max-w-75"
          >
            {listOption.map((entry) => (
              <div
                onClick={() => handleChangingNumber(entry.id, 1)}
                key={entry.id}
                className={`cursor-pointer border-1 border-transparent rounded-sm hover:border-gray-700  ${
                  selectedNumber.id === entry.id ? "inset-shadow-sm/40 " : ""
                }`}
              >
                {entry.number}
              </div>
            ))}
          </div>
          <div
            ref={ref3}
            className="flex flex-col justify-center min-h-48 rounded-lg w-full p-2.5 inset-shadow-sm/40 max-w-75"
          >
            <div
              onClick={() => setSelectedSymbol("+")}
              className={`cursor-pointer border-1 border-transparent rounded-sm hover:border-gray-700  ${
                selectedSymbol === "+" ? "inset-shadow-sm/40 " : ""
              }`}
            >
              +
            </div>
            <div
              onClick={() => setSelectedSymbol("−")}
              className={`cursor-pointer border-1 border-transparent rounded-sm hover:border-gray-700  ${
                selectedSymbol === "−" ? "inset-shadow-sm/40 " : ""
              }`}
            >
              −
            </div>
            <div
              onClick={() => setSelectedSymbol("×")}
              className={`cursor-pointer border-1 border-transparent rounded-sm hover:border-gray-700  ${
                selectedSymbol === "×" ? "inset-shadow-sm/40 " : ""
              }`}
            >
              ×
            </div>
            <div
              onClick={() => setSelectedSymbol("÷")}
              className={`cursor-pointer border-1 border-transparent rounded-sm hover:border-gray-700  ${
                selectedSymbol === "÷" ? "inset-shadow-sm/40 " : ""
              }`}
            >
              ÷
            </div>
          </div>

          <div
            ref={ref2}
            className="flex flex-col justify-center min-h-48 rounded-lg w-full p-2.5 inset-shadow-sm/40 max-w-75"
          >
            {listOption2.map((entry) => (
              <div
                onClick={() => handleChangingNumber(entry.id, 2)}
                key={entry.id}
                className={`cursor-pointer border-1 border-transparent rounded-sm hover:border-gray-700  ${
                  secondSelectedNumber.id === entry.id
                    ? "inset-shadow-sm/40 "
                    : ""
                }`}
              >
                {entry.number}
              </div>
            ))}
          </div>
        </div>
        <button
          ref={ref4}
          onClick={handleCalculation}
          className="flex items-center max-h-10 border-1 border-transparent hover:border-gray-700"
        >
          =
        </button>
      </div>
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
                  calculation.number1,
                  calculation.number1Id,
                  calculation.number2,
                  calculation.number2Id,
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
