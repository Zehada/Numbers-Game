type WinCalculationProps = {
  numbers: number[];
};

function WinCalculation({ numbers }: WinCalculationProps) {
  let secondList: { id: number; number: number }[] = [{ id: 0, number: 0 }];

  for (let i = 1; i <= numbers.length; i++) {
    secondList = [...secondList, { id: i, number: numbers[i - 1] }];
  }

  secondList.shift();

  let calculationNumbers: { id: number; number: number }[] = [...secondList];

  type Results = [
    {
      [key: string]: { id: number; number: number } | string;
      firstNumber: { id: number; number: number };
      secondNumber: { id: number; number: number };
      result: { id: number; number: number };
      thirdNumber: { id: number; number: number };
      fourthNumber: { id: number; number: number };
      secondResult: { id: number; number: number };
      fifthNumber: { id: number; number: number };
      sixthNumber: { id: number; number: number };
      thirdResult: { id: number; number: number };
      seventhNumber: { id: number; number: number };
      eighthNumber: { id: number; number: number };
      fourthResult: { id: number; number: number };
      ninthNumber: { id: number; number: number };
      tenthNumber: { id: number; number: number };
      fifthResult: { id: number; number: number };
      message: string;
    }
  ];

  // interface Results {
  //   [key: string]: number | string; // Allow dynamic keys with number values
  // }

  let results: Results = [
    {
      firstNumber: { id: 0, number: 0 },
      secondNumber: { id: 0, number: 0 },
      result: { id: 0, number: 0 },
      thirdNumber: { id: 0, number: 0 },
      fourthNumber: { id: 0, number: 0 },
      secondResult: { id: 0, number: 0 },
      fifthNumber: { id: 0, number: 0 },
      sixthNumber: { id: 0, number: 0 },
      thirdResult: { id: 0, number: 0 },
      seventhNumber: { id: 0, number: 0 },
      eighthNumber: { id: 0, number: 0 },
      fourthResult: { id: 0, number: 0 },
      ninthNumber: { id: 0, number: 0 },
      tenthNumber: { id: 0, number: 0 },
      fifthResult: { id: 0, number: 0 },
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
    firstNumber: { id: number; number: number },
    secondNumber: { id: number; number: number },
    result: { id: number; number: number },
    thirdNumber: { id: number; number: number },
    fourthNumber: { id: number; number: number },
    secondResult: { id: number; number: number },
    fifthNumber: { id: number; number: number },
    sixthNumber: { id: number; number: number },
    thirdResult: { id: number; number: number },
    seventhNumber: { id: number; number: number },
    eighthNumber: { id: number; number: number },
    fourthResult: { id: number; number: number }
    // ninthNumber: number,
    // tenthNumber: number,
    // fifthResult: number,
  ) {
    for (let i = 1; i <= calculationNumbers.length; i++) {
      for (let j = 1; j <= calculationNumbers.length - 1; j++) {
        if (round === 4) {
          console.log(calculationNumbers.length);
        }
        subtractionResult =
          calculationNumbers[0]["number"] - calculationNumbers[j]["number"];
        divisionResult =
          calculationNumbers[0]["number"] / calculationNumbers[j]["number"];

        if (
          Number.isInteger(subtractionResult) &&
          subtractionResult !== 0 &&
          subtractionResult > 0 &&
          subtractionResult !== calculationNumbers[0]["number"] &&
          subtractionResult !== calculationNumbers[j]["number"]
        ) {
          results.push({
            firstNumber: round === 1 ? calculationNumbers[0] : firstNumber,
            secondNumber: round === 1 ? calculationNumbers[j] : secondNumber,
            result: round === 1 ? { id: 7, number: subtractionResult } : result,
            thirdNumber: round === 2 ? calculationNumbers[0] : thirdNumber,
            fourthNumber: round === 2 ? calculationNumbers[j] : fourthNumber,
            secondResult:
              round === 2 ? { id: 8, number: subtractionResult } : secondResult,
            fifthNumber: round === 3 ? calculationNumbers[0] : fifthNumber,
            sixthNumber: round === 3 ? calculationNumbers[j] : sixthNumber,
            thirdResult:
              round === 3 ? { id: 9, number: subtractionResult } : thirdResult,
            seventhNumber: round === 4 ? calculationNumbers[0] : seventhNumber,
            eighthNumber: round === 4 ? calculationNumbers[j] : eighthNumber,
            fourthResult:
              round === 4
                ? { id: 10, number: subtractionResult }
                : fourthResult,
            ninthNumber:
              round === 5 ? calculationNumbers[0] : { id: 0, number: 0 },
            tenthNumber:
              round === 5 ? calculationNumbers[j] : { id: 0, number: 0 },
            fifthResult:
              round === 5
                ? { id: 11, number: subtractionResult }
                : { id: 0, number: 0 },

            message:
              previousMessage +
              `, ${calculationNumbers[0]["number"]} - ${calculationNumbers[j]["number"]} = ${subtractionResult}`,
          });
        }

        if (
          Number.isInteger(divisionResult) &&
          divisionResult !== 0 &&
          divisionResult > 0 &&
          divisionResult !== calculationNumbers[0]["number"] &&
          divisionResult !== calculationNumbers[j]["number"]
        ) {
          results.push({
            firstNumber: round === 1 ? calculationNumbers[0] : firstNumber,
            secondNumber: round === 1 ? calculationNumbers[j] : secondNumber,
            result: round === 1 ? { id: 7, number: divisionResult } : result,
            thirdNumber: round === 2 ? calculationNumbers[0] : thirdNumber,
            fourthNumber: round === 2 ? calculationNumbers[j] : fourthNumber,
            secondResult:
              round === 2 ? { id: 8, number: divisionResult } : secondResult,
            fifthNumber: round === 3 ? calculationNumbers[0] : fifthNumber,
            sixthNumber: round === 3 ? calculationNumbers[j] : sixthNumber,
            thirdResult:
              round === 3 ? { id: 9, number: divisionResult } : thirdResult,
            seventhNumber: round === 4 ? calculationNumbers[0] : seventhNumber,
            eighthNumber: round === 4 ? calculationNumbers[j] : eighthNumber,
            fourthResult:
              round === 4 ? { id: 10, number: divisionResult } : fourthResult,
            ninthNumber:
              round === 5 ? calculationNumbers[0] : { id: 0, number: 0 },
            tenthNumber:
              round === 5 ? calculationNumbers[j] : { id: 0, number: 0 },
            fifthResult:
              round === 5
                ? { id: 11, number: divisionResult }
                : { id: 0, number: 0 },

            message:
              previousMessage +
              `, ${calculationNumbers[0]["number"]} / ${calculationNumbers[j]["number"]} = ${divisionResult}`,
          });
        }
      }

      calculationNumbers.push(calculationNumbers[0]);
      calculationNumbers.shift();
    }

    for (let i = 1; i <= calculationNumbers.length - 1; i++) {
      additionResult =
        calculationNumbers[0]["number"] + calculationNumbers[i]["number"];
      multiplicationResult =
        calculationNumbers[0]["number"] * calculationNumbers[i]["number"];

      // if (calculationNumbers[0] !== 0 && calculationNumbers[i] !== 0) {
      results.push({
        firstNumber: round === 1 ? calculationNumbers[0] : firstNumber,
        secondNumber: round === 1 ? calculationNumbers[i] : secondNumber,
        result: round === 1 ? { id: 7, number: additionResult } : result,
        thirdNumber: round === 2 ? calculationNumbers[0] : thirdNumber,
        fourthNumber: round === 2 ? calculationNumbers[i] : fourthNumber,
        secondResult:
          round === 2 ? { id: 8, number: additionResult } : secondResult,
        fifthNumber: round === 3 ? calculationNumbers[0] : fifthNumber,
        sixthNumber: round === 3 ? calculationNumbers[i] : sixthNumber,
        thirdResult:
          round === 3 ? { id: 9, number: additionResult } : thirdResult,
        seventhNumber: round === 4 ? calculationNumbers[0] : seventhNumber,
        eighthNumber: round === 4 ? calculationNumbers[i] : eighthNumber,
        fourthResult:
          round === 4 ? { id: 10, number: additionResult } : fourthResult,
        ninthNumber: round === 5 ? calculationNumbers[0] : { id: 0, number: 0 },
        tenthNumber: round === 5 ? calculationNumbers[i] : { id: 0, number: 0 },
        fifthResult:
          round === 5
            ? { id: 11, number: additionResult }
            : { id: 0, number: 0 },

        message:
          previousMessage +
          `, ${calculationNumbers[0]["number"]} + ${calculationNumbers[i]["number"]} = ${additionResult}`,
      });
      // }
      if (
        multiplicationResult !== calculationNumbers[0]["number"] &&
        multiplicationResult !== calculationNumbers[i]["number"]
      ) {
        results.push({
          firstNumber: round === 1 ? calculationNumbers[0] : firstNumber,
          secondNumber: round === 1 ? calculationNumbers[i] : secondNumber,
          result:
            round === 1 ? { id: 7, number: multiplicationResult } : result,
          thirdNumber: round === 2 ? calculationNumbers[0] : thirdNumber,
          fourthNumber: round === 2 ? calculationNumbers[i] : fourthNumber,
          secondResult:
            round === 2
              ? { id: 8, number: multiplicationResult }
              : secondResult,
          fifthNumber: round === 3 ? calculationNumbers[0] : fifthNumber,
          sixthNumber: round === 3 ? calculationNumbers[i] : sixthNumber,
          thirdResult:
            round === 3 ? { id: 9, number: multiplicationResult } : thirdResult,
          seventhNumber: round === 4 ? calculationNumbers[0] : seventhNumber,
          eighthNumber: round === 4 ? calculationNumbers[i] : eighthNumber,
          fourthResult:
            round === 4
              ? { id: 10, number: multiplicationResult }
              : fourthResult,
          ninthNumber:
            round === 5 ? calculationNumbers[0] : { id: 0, number: 0 },
          tenthNumber:
            round === 5 ? calculationNumbers[i] : { id: 0, number: 0 },
          fifthResult:
            round === 5
              ? { id: 11, number: multiplicationResult }
              : { id: 0, number: 0 },

          message:
            previousMessage +
            `, ${calculationNumbers[0]} x ${calculationNumbers[i]} = ${multiplicationResult}`,
        });
      }
    }

    calculationNumbers = [...secondList];
  }

  calculation(
    "",
    1,
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 },
    { id: 0, number: 0 }
  );

  function nextRoundCalculation(
    round: number,
    number1: string,
    number2: string,
    result: string
  ) {
    for (let resultIndex in results) {
      if (
        results[resultIndex]["firstNumber"]["number"] !== 0 &&
        results[resultIndex]["secondNumber"]["number"] !== 0 &&
        round === 2
      ) {
        calculationNumbers.splice(
          calculationNumbers.indexOf(
            results[resultIndex][number1] as { id: number; number: number }
          ),
          1
        );
        // ****
        calculationNumbers.splice(
          calculationNumbers.indexOf(
            results[resultIndex][number2] as { id: number; number: number }
          ),
          1
        );

        calculationNumbers.push(
          results[resultIndex][result] as { id: number; number: number }
        );

        calculation(
          results[resultIndex]["message"],
          round,
          results[resultIndex][number1] as { id: number; number: number },
          results[resultIndex][number2] as { id: number; number: number },
          results[resultIndex][result] as { id: number; number: number },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 }
        );
      } else if (
        results[resultIndex]["thirdNumber"]["number"] !== 0 &&
        results[resultIndex]["fourthNumber"]["number"] !== 0 &&
        round === 3
      ) {
        calculationNumbers.splice(
          calculationNumbers.indexOf(results[resultIndex]["firstNumber"]),
          1
        );
        calculationNumbers.splice(
          calculationNumbers.indexOf(results[resultIndex]["secondNumber"]),
          1
        );

        if (results[resultIndex][number1] !== results[resultIndex]["result"]) {
          calculationNumbers.splice(
            calculationNumbers.indexOf(
              results[resultIndex][number1] as { id: number; number: number }
            ),
            1
          );
        }
        if (results[resultIndex][number2] !== results[resultIndex]["result"]) {
          calculationNumbers.splice(
            calculationNumbers.indexOf(
              results[resultIndex][number2] as { id: number; number: number }
            ),
            1
          );
        }
        if (
          results[resultIndex][number1] !== results[resultIndex]["result"] &&
          results[resultIndex][number2] !== results[resultIndex]["result"]
        ) {
          calculationNumbers.push(results[resultIndex]["result"]);
        }

        calculationNumbers.push(
          results[resultIndex][result] as { id: number; number: number }
        );

        calculation(
          results[resultIndex]["message"],
          round,
          results[resultIndex]["firstNumber"],
          results[resultIndex]["secondNumber"],
          results[resultIndex]["result"],
          results[resultIndex][number1] as { id: number; number: number },
          results[resultIndex][number2] as { id: number; number: number },
          results[resultIndex][result] as { id: number; number: number },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 }
        );
      } else if (
        results[resultIndex]["fifthNumber"]["number"] !== 0 &&
        results[resultIndex]["sixthNumber"]["number"] !== 0 &&
        round === 4
      ) {
        calculationNumbers.splice(
          calculationNumbers.indexOf(results[resultIndex]["firstNumber"]),
          1
        );
        calculationNumbers.splice(
          calculationNumbers.indexOf(results[resultIndex]["secondNumber"]),
          1
        );

        if (
          results[resultIndex]["thirdNumber"] !== results[resultIndex]["result"]
        ) {
          calculationNumbers.splice(
            calculationNumbers.indexOf(results[resultIndex]["thirdNumber"]),
            1
          );
        }
        if (
          results[resultIndex]["fourthNumber"] !==
          results[resultIndex]["result"]
        ) {
          calculationNumbers.splice(
            calculationNumbers.indexOf(results[resultIndex]["fourthNumber"]),
            1
          );
        }

        if (
          results[resultIndex][number1] !==
            results[resultIndex]["secondResult"] &&
          results[resultIndex][number1] !== results[resultIndex]["result"]
        ) {
          calculationNumbers.splice(
            calculationNumbers.indexOf(
              results[resultIndex][number1] as { id: number; number: number }
            ),
            1
          );
        }
        if (
          results[resultIndex][number2] !==
            results[resultIndex]["secondResult"] &&
          results[resultIndex][number2] !== results[resultIndex]["result"]
        ) {
          calculationNumbers.splice(
            calculationNumbers.indexOf(
              results[resultIndex][number2] as { id: number; number: number }
            ),
            1
          );
        }

        if (
          results[resultIndex]["thirdNumber"] !==
            results[resultIndex]["result"] &&
          results[resultIndex]["fourthNumber"] !==
            results[resultIndex]["result"] &&
          results[resultIndex][number1] !== results[resultIndex]["result"] &&
          results[resultIndex][number2] !== results[resultIndex]["result"]
        ) {
          calculationNumbers.push(results[resultIndex]["result"]);
        }

        if (
          results[resultIndex][number1] !==
            results[resultIndex]["secondResult"] &&
          results[resultIndex][number2] !== results[resultIndex]["secondResult"]
        ) {
          calculationNumbers.push(results[resultIndex]["secondResult"]);
        }

        calculationNumbers.push(
          results[resultIndex][result] as { id: number; number: number }
        );

        calculation(
          results[resultIndex]["message"],
          round,
          results[resultIndex]["firstNumber"],
          results[resultIndex]["secondNumber"],
          results[resultIndex]["result"],
          results[resultIndex]["thirdNumber"],
          results[resultIndex]["fourthNumber"],
          results[resultIndex]["secondResult"],
          results[resultIndex][number1] as { id: number; number: number },
          results[resultIndex][number2] as { id: number; number: number },
          results[resultIndex][result] as { id: number; number: number },
          { id: 0, number: 0 },
          { id: 0, number: 0 },
          { id: 0, number: 0 }
        );
      }

      // else if (
      //   results[resultIndex]["seventhNumber"] !== 0 &&
      //   results[resultIndex]["eighthNumber"] !== 0 &&
      //   round === 5
      // ) {
      //   calculationNumbers.splice(
      //     calculationNumbers.indexOf(results[resultIndex]["firstNumber"]),
      //     1
      //   );
      //   calculationNumbers.splice(
      //     calculationNumbers.indexOf(results[resultIndex]["secondNumber"]),
      //     1
      //   );

      //   calculationNumbers.splice(
      //     calculationNumbers.indexOf(results[resultIndex]["thirdNumber"]),
      //     1
      //   );
      //   calculationNumbers.splice(
      //     calculationNumbers.indexOf(results[resultIndex]["fourthNumber"]),
      //     1
      //   );

      //   calculationNumbers.splice(
      //     calculationNumbers.indexOf(results[resultIndex]["fifthNumber"]),
      //     1
      //   );
      //   calculationNumbers.splice(
      //     calculationNumbers.indexOf(results[resultIndex]["sixthNumber"]),
      //     1
      //   );

      //   calculationNumbers.splice(
      //     calculationNumbers.indexOf(results[resultIndex][number1] as number),
      //     1
      //   );
      //   calculationNumbers.splice(
      //     calculationNumbers.indexOf(results[resultIndex][number2] as number),
      //     1
      //   );

      //   if (
      //     results[resultIndex]["thirdNumber"] !==
      //       results[resultIndex]["result"] &&
      //     results[resultIndex]["fourthNumber"] !==
      //       results[resultIndex]["result"] &&
      //     results[resultIndex][number1] !== results[resultIndex]["result"] &&
      //     results[resultIndex][number2] !== results[resultIndex]["result"]
      //   ) {
      //     calculationNumbers.push(results[resultIndex]["result"]);
      //   }

      //   if (
      //     results[resultIndex]["fifthNumber"] !==
      //       results[resultIndex]["secondResult"] &&
      //     results[resultIndex]["sixthNumber"] !==
      //       results[resultIndex]["secondResult"] &&
      //     results[resultIndex][number1] !==
      //       results[resultIndex]["secondResult"] &&
      //     results[resultIndex][number2] !== results[resultIndex]["secondResult"]
      //   ) {
      //     calculationNumbers.push(results[resultIndex]["secondResult"]);
      //   }

      //   if (
      //     results[resultIndex][number1] !==
      //       results[resultIndex]["thirdResult"] &&
      //     results[resultIndex][number2] !== results[resultIndex]["thirdResult"]
      //   ) {
      //     calculationNumbers.push(results[resultIndex]["thirdResult"]);
      //   }

      //   calculationNumbers.push(results[resultIndex][result] as number);

      //   calculation(
      //     results[resultIndex]["message"],
      //     round,
      //     results[resultIndex]["firstNumber"],
      //     results[resultIndex]["secondNumber"],
      //     results[resultIndex]["result"],
      //     results[resultIndex]["thirdNumber"],
      //     results[resultIndex]["fourthNumber"],
      //     results[resultIndex]["secondResult"],
      //     results[resultIndex]["fifthNumber"],
      //     results[resultIndex]["sixthNumber"],
      //     results[resultIndex]["thirdResult"],
      //     results[resultIndex][number1] as number,
      //     results[resultIndex][number2] as number,
      //     results[resultIndex][result] as number
      //   );
      // }
    }
  }

  nextRoundCalculation(2, "firstNumber", "secondNumber", "result");
  nextRoundCalculation(3, "thirdNumber", "fourthNumber", "secondResult");
  nextRoundCalculation(4, "fifthNumber", "sixthNumber", "thirdResult");
  // nextRoundCalculation(5, "seventhNumber", "eighthNumber", "fourthResult");

  console.log(results);

  return <></>;
}

export default WinCalculation;
