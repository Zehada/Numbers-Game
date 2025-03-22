import { useEffect } from "react";

type WinCalculationProps = {
  numbers: number[];
};

function WinCalculation({ numbers }: WinCalculationProps) {
  let calculationNumbers = [...numbers];
  let results = [
    {
      firstNumber: 0,
      secondNumber: 0,
      result: 0,
      thirdNumber: 0,
      fourthNumber: 0,
      secondResult: 0,
      fifthNumber: 0,
      sixthNumber: 0,
      thirdResult: 0,
      message: "",
    },
  ];

  let additionResult;
  let subtractionResult;
  let multiplicationResult;
  let divisionResult;

  function calculation(
    previousMessage: string,
    round: number,
    firstNumber: number,
    secondNumber: number,
    result: number
  ) {
    for (let i = 1; i <= calculationNumbers.length; i++) {
      for (let j = 1; j <= calculationNumbers.length - 1; j++) {
        subtractionResult = calculationNumbers[0] - calculationNumbers[j];
        divisionResult = calculationNumbers[0] / calculationNumbers[j];

        if (
          Number.isInteger(subtractionResult) &&
          subtractionResult != 0 &&
          subtractionResult > 0 &&
          subtractionResult != calculationNumbers[0] &&
          subtractionResult != calculationNumbers[j]
        ) {
          results.push({
            firstNumber: round === 1 ? calculationNumbers[0] : firstNumber,
            secondNumber: round === 1 ? calculationNumbers[j] : secondNumber,
            result: round === 1 ? subtractionResult : result,
            thirdNumber: round === 2 ? calculationNumbers[0] : 0,
            fourthNumber: round === 2 ? calculationNumbers[j] : 0,
            secondResult: round === 2 ? subtractionResult : 0,
            fifthNumber: 0,
            sixthNumber: 0,
            thirdResult: 0,
            message:
              previousMessage +
              `, ${calculationNumbers[0]} - ${calculationNumbers[j]} = ${subtractionResult}`,
          });
        }

        if (
          Number.isInteger(divisionResult) &&
          divisionResult != 0 &&
          divisionResult > 0 &&
          divisionResult != calculationNumbers[0] &&
          divisionResult != calculationNumbers[j]
        ) {
          results.push({
            firstNumber: round === 1 ? calculationNumbers[0] : firstNumber,
            secondNumber: round === 1 ? calculationNumbers[j] : secondNumber,
            result: round === 1 ? divisionResult : result,
            thirdNumber: round === 2 ? calculationNumbers[0] : 0,
            fourthNumber: round === 2 ? calculationNumbers[j] : 0,
            secondResult: round === 2 ? divisionResult : 0,
            fifthNumber: 0,
            sixthNumber: 0,
            thirdResult: 0,
            message:
              previousMessage +
              `, ${calculationNumbers[0]} / ${calculationNumbers[j]} = ${divisionResult}`,
          });
        }
      }

      calculationNumbers.push(calculationNumbers[0]);
      calculationNumbers.shift();
    }

    for (let i = 1; i <= calculationNumbers.length - 1; i++) {
      additionResult = calculationNumbers[0] + calculationNumbers[i];
      multiplicationResult = calculationNumbers[0] * calculationNumbers[i];

      results.push({
        firstNumber: round === 1 ? calculationNumbers[0] : firstNumber,
        secondNumber: round === 1 ? calculationNumbers[i] : secondNumber,
        result: round === 1 ? additionResult : result,
        thirdNumber: round === 2 ? calculationNumbers[0] : 0,
        fourthNumber: round === 2 ? calculationNumbers[i] : 0,
        secondResult: round === 2 ? additionResult : 0,
        fifthNumber: 0,
        sixthNumber: 0,
        thirdResult: 0,
        message:
          previousMessage +
          `, ${calculationNumbers[0]} + ${calculationNumbers[i]} = ${additionResult}`,
      });

      if (
        multiplicationResult != calculationNumbers[0] &&
        multiplicationResult != calculationNumbers[i]
      ) {
        results.push({
          firstNumber: round === 1 ? calculationNumbers[0] : firstNumber,
          secondNumber: round === 1 ? calculationNumbers[i] : secondNumber,
          result: round === 1 ? multiplicationResult : result,
          thirdNumber: round === 2 ? calculationNumbers[0] : 0,
          fourthNumber: round === 2 ? calculationNumbers[i] : 0,
          secondResult: round === 2 ? multiplicationResult : 0,
          fifthNumber: 0,
          sixthNumber: 0,
          thirdResult: 0,
          message:
            previousMessage +
            `, ${calculationNumbers[0]} x ${calculationNumbers[i]} = ${multiplicationResult}`,
        });
      }
    }

    calculationNumbers = [...numbers];
  }

  calculation("", 1, 0, 0, 0);

  for (let resultIndex in results) {
    calculationNumbers.splice(
      calculationNumbers.indexOf(results[resultIndex]["firstNumber"]),
      1
    );
    calculationNumbers.splice(
      calculationNumbers.indexOf(results[resultIndex]["secondNumber"]),
      1
    );
    calculationNumbers.push(results[resultIndex]["result"]);
    calculation(
      results[resultIndex]["message"],
      2,
      results[resultIndex]["firstNumber"],
      results[resultIndex]["secondNumber"],
      results[resultIndex]["result"]
    );
  }

  console.log(numbers);
  console.log(results);
  console.log(calculationNumbers);

  return <></>;
}

export default WinCalculation;
