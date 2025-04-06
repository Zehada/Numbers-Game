import { useEffect, useState } from "react";

type WinCalculationProps = {
  numbers: number[];
  numberToGuess: number;
};

function WinCalculation({ numbers, numberToGuess }: WinCalculationProps) {
  const [closestNumber, setClosestNumber] = useState(0);

  useEffect(() => {
    setClosestNumber(numberToGuess);
  }, [numberToGuess]);

  let secondList: { id: number; number: number }[] = [{ id: 0, number: 0 }];

  for (let i = 1; i <= numbers.length; i++) {
    secondList = [...secondList, { id: i, number: numbers[i - 1] }];
  }

  secondList.shift();

  let calculationNumbers: { id: number; number: number }[] = [...secondList];

  type WinningCalculations = {
    message: string;
    results: number[];
  }[];

  let winningCalculations: WinningCalculations = [{ message: "", results: [] }];

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

  let additionResult: number;
  let subtractionResult: number;
  let multiplicationResult: number;
  let divisionResult: number;

  let additionMessage: string;
  let subtractionMessage: string;
  let multiplicationMessage: string;
  let divisionMessage: string;

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
    fourthResult: { id: number; number: number },
    closestNumber: number
  ) {
    for (let i = 1; i <= calculationNumbers.length; i++) {
      for (let j = 1; j <= calculationNumbers.length - 1; j++) {
        subtractionResult =
          calculationNumbers[0]["number"] - calculationNumbers[j]["number"];
        divisionResult =
          calculationNumbers[0]["number"] / calculationNumbers[j]["number"];

        subtractionMessage =
          previousMessage +
          (previousMessage === "" ? "" : ", ") +
          `${calculationNumbers[0]["number"]} - ${calculationNumbers[j]["number"]} = ${subtractionResult}`;
        divisionMessage =
          previousMessage +
          (previousMessage === "" ? "" : ", ") +
          `${calculationNumbers[0]["number"]} / ${calculationNumbers[j]["number"]} = ${divisionResult}`;

        if (
          subtractionResult === closestNumber &&
          subtractionResult !== calculationNumbers[0]["number"] &&
          subtractionResult !== calculationNumbers[j]["number"] &&
          (calculationNumbers[0]["id"] === result["id"] ||
            calculationNumbers[j]["id"] === result["id"] ||
            thirdNumber["id"] === result["id"] ||
            fourthNumber["id"] === result["id"] ||
            fifthNumber["id"] === result["id"] ||
            sixthNumber["id"] === result["id"] ||
            seventhNumber["id"] === result["id"] ||
            eighthNumber["id"] === result["id"]) &&
          (calculationNumbers[0]["id"] === secondResult["id"] ||
            calculationNumbers[j]["id"] === secondResult["id"] ||
            fifthNumber["id"] === secondResult["id"] ||
            sixthNumber["id"] === secondResult["id"] ||
            seventhNumber["id"] === secondResult["id"] ||
            eighthNumber["id"] === secondResult["id"]) &&
          (calculationNumbers[0]["id"] === thirdResult["id"] ||
            calculationNumbers[j]["id"] === thirdResult["id"] ||
            seventhNumber["id"] === thirdResult["id"] ||
            eighthNumber["id"] === thirdResult["id"]) &&
          (calculationNumbers[0]["id"] === fourthResult["id"] ||
            calculationNumbers[j]["id"] === fourthResult["id"])
        ) {
          winningCalculations.push({
            message: subtractionMessage,
            results: [
              round !== 1 ? result["number"] : 0,
              round !== 2 ? secondResult["number"] : 0,
              round !== 3 ? thirdResult["number"] : 0,
              round !== 4 ? fourthResult["number"] : 0,
            ],
          });
        }
        if (
          divisionResult === closestNumber &&
          divisionResult !== calculationNumbers[0]["number"] &&
          divisionResult !== calculationNumbers[j]["number"] &&
          (calculationNumbers[0]["id"] === result["id"] ||
            calculationNumbers[j]["id"] === result["id"] ||
            thirdNumber["id"] === result["id"] ||
            fourthNumber["id"] === result["id"] ||
            fifthNumber["id"] === result["id"] ||
            sixthNumber["id"] === result["id"] ||
            seventhNumber["id"] === result["id"] ||
            eighthNumber["id"] === result["id"]) &&
          (calculationNumbers[0]["id"] === secondResult["id"] ||
            calculationNumbers[j]["id"] === secondResult["id"] ||
            fifthNumber["id"] === secondResult["id"] ||
            sixthNumber["id"] === secondResult["id"] ||
            seventhNumber["id"] === secondResult["id"] ||
            eighthNumber["id"] === secondResult["id"]) &&
          (calculationNumbers[0]["id"] === thirdResult["id"] ||
            calculationNumbers[j]["id"] === thirdResult["id"] ||
            seventhNumber["id"] === thirdResult["id"] ||
            eighthNumber["id"] === thirdResult["id"]) &&
          (calculationNumbers[0]["id"] === fourthResult["id"] ||
            calculationNumbers[j]["id"] === fourthResult["id"])
        ) {
          winningCalculations.push({
            message: divisionMessage,
            results: [
              round !== 1 ? result["number"] : 0,
              round !== 2 ? secondResult["number"] : 0,
              round !== 3 ? thirdResult["number"] : 0,
              round !== 4 ? fourthResult["number"] : 0,
            ],
          });
        }

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

            message: subtractionMessage,
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

            message: divisionMessage,
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

      additionMessage =
        previousMessage +
        (previousMessage === "" ? "" : ", ") +
        `${calculationNumbers[0]["number"]} + ${calculationNumbers[i]["number"]} = ${additionResult}`;

      multiplicationMessage =
        previousMessage +
        (previousMessage === "" ? "" : ", ") +
        `${calculationNumbers[0]["number"]} x ${calculationNumbers[i]["number"]} = ${multiplicationResult}`;

      if (
        additionResult === closestNumber &&
        (calculationNumbers[0]["id"] === result["id"] ||
          calculationNumbers[i]["id"] === result["id"] ||
          thirdNumber["id"] === result["id"] ||
          fourthNumber["id"] === result["id"] ||
          fifthNumber["id"] === result["id"] ||
          sixthNumber["id"] === result["id"] ||
          seventhNumber["id"] === result["id"] ||
          eighthNumber["id"] === result["id"]) &&
        (calculationNumbers[0]["id"] === secondResult["id"] ||
          calculationNumbers[i]["id"] === secondResult["id"] ||
          fifthNumber["id"] === secondResult["id"] ||
          sixthNumber["id"] === secondResult["id"] ||
          seventhNumber["id"] === secondResult["id"] ||
          eighthNumber["id"] === secondResult["id"]) &&
        (calculationNumbers[0]["id"] === thirdResult["id"] ||
          calculationNumbers[i]["id"] === thirdResult["id"] ||
          seventhNumber["id"] === thirdResult["id"] ||
          eighthNumber["id"] === thirdResult["id"]) &&
        (calculationNumbers[0]["id"] === fourthResult["id"] ||
          calculationNumbers[i]["id"] === fourthResult["id"])
      ) {
        winningCalculations.push({
          message: additionMessage,
          results: [
            round !== 1 ? result["number"] : 0,
            round !== 2 ? secondResult["number"] : 0,
            round !== 3 ? thirdResult["number"] : 0,
            round !== 4 ? fourthResult["number"] : 0,
          ],
        });
      }

      if (
        multiplicationResult === closestNumber &&
        multiplicationResult !== calculationNumbers[0]["number"] &&
        multiplicationResult !== calculationNumbers[i]["number"] &&
        (calculationNumbers[0]["id"] === result["id"] ||
          calculationNumbers[i]["id"] === result["id"] ||
          thirdNumber["id"] === result["id"] ||
          fourthNumber["id"] === result["id"] ||
          fifthNumber["id"] === result["id"] ||
          sixthNumber["id"] === result["id"] ||
          seventhNumber["id"] === result["id"] ||
          eighthNumber["id"] === result["id"]) &&
        (calculationNumbers[0]["id"] === secondResult["id"] ||
          calculationNumbers[i]["id"] === secondResult["id"] ||
          fifthNumber["id"] === secondResult["id"] ||
          sixthNumber["id"] === secondResult["id"] ||
          seventhNumber["id"] === secondResult["id"] ||
          eighthNumber["id"] === secondResult["id"]) &&
        (calculationNumbers[0]["id"] === thirdResult["id"] ||
          calculationNumbers[i]["id"] === thirdResult["id"] ||
          seventhNumber["id"] === thirdResult["id"] ||
          eighthNumber["id"] === thirdResult["id"]) &&
        (calculationNumbers[0]["id"] === fourthResult["id"] ||
          calculationNumbers[i]["id"] === fourthResult["id"])
      ) {
        winningCalculations.push({
          message: multiplicationMessage,
          results: [
            round !== 1 ? result["number"] : 0,
            round !== 2 ? secondResult["number"] : 0,
            round !== 3 ? thirdResult["number"] : 0,
            round !== 4 ? fourthResult["number"] : 0,
          ],
        });
      }

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

        message: additionMessage,
      });
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

          message: multiplicationMessage,
        });
      }
    }

    calculationNumbers = [...secondList];
  }

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
          { id: 0, number: 0 },
          closestNumber
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
          { id: 0, number: 0 },
          closestNumber
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
          { id: 0, number: 0 },
          closestNumber
        );
      } else if (
        results[resultIndex]["seventhNumber"]["number"] !== 0 &&
        results[resultIndex]["eighthNumber"]["number"] !== 0 &&
        round === 5
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
          results[resultIndex]["fifthNumber"] !==
            results[resultIndex]["secondResult"] &&
          results[resultIndex]["fifthNumber"] !== results[resultIndex]["result"]
        ) {
          calculationNumbers.splice(
            calculationNumbers.indexOf(
              results[resultIndex]["fifthNumber"] as {
                id: number;
                number: number;
              }
            ),
            1
          );
        }
        if (
          results[resultIndex]["sixthNumber"] !==
            results[resultIndex]["secondResult"] &&
          results[resultIndex]["sixthNumber"] !== results[resultIndex]["result"]
        ) {
          calculationNumbers.splice(
            calculationNumbers.indexOf(
              results[resultIndex]["sixthNumber"] as {
                id: number;
                number: number;
              }
            ),
            1
          );
        }

        if (
          results[resultIndex][number1] !==
            results[resultIndex]["thirdResult"] &&
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
            results[resultIndex]["thirdResult"] &&
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
          results[resultIndex]["fifthNumber"] !==
            results[resultIndex]["result"] &&
          results[resultIndex]["sixthNumber"] !==
            results[resultIndex]["result"] &&
          results[resultIndex][number1] !== results[resultIndex]["result"] &&
          results[resultIndex][number2] !== results[resultIndex]["result"]
        ) {
          calculationNumbers.push(results[resultIndex]["result"]);
        }

        if (
          results[resultIndex]["fifthNumber"] !==
            results[resultIndex]["secondResult"] &&
          results[resultIndex]["sixthNumber"] !==
            results[resultIndex]["secondResult"] &&
          results[resultIndex][number1] !==
            results[resultIndex]["secondResult"] &&
          results[resultIndex][number2] !== results[resultIndex]["secondResult"]
        ) {
          calculationNumbers.push(results[resultIndex]["secondResult"]);
        }

        if (
          results[resultIndex][number1] !==
            results[resultIndex]["thirdResult"] &&
          results[resultIndex][number2] !== results[resultIndex]["thirdResult"]
        ) {
          calculationNumbers.push(results[resultIndex]["thirdResult"]);
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
          results[resultIndex]["fifthNumber"],
          results[resultIndex]["sixthNumber"],
          results[resultIndex]["thirdResult"],
          results[resultIndex][number1] as { id: number; number: number },
          results[resultIndex][number2] as { id: number; number: number },
          results[resultIndex][result] as { id: number; number: number },
          closestNumber
        );
      }
    }
  }

  function sortResults(
    calculations: {
      message: string;
      results: number[];
    }[]
  ) {
    for (let i = calculations.length - 1; i >= 0; i--) {
      for (let j = calculations[i]["results"].length - 1; j >= 0; j--) {
        if (calculations[i]["results"][j] === 0) {
          calculations[i]["results"].splice(j, 1);
        }
      }

      calculations[i]["results"].sort(function (a, b) {
        return a - b;
      });
    }

    calculations.sort((a, b) => {
      const minLength = Math.min(a.results.length, b.results.length);

      for (let i = 0; i < minLength; i++) {
        if (a.results[i] !== b.results[i]) {
          return a.results[i] - b.results[i]; // Compare elements from left to right
        }
      }

      return a.results.length - b.results.length; // Shorter arrays come first
    });

    for (let i = calculations.length - 1; i >= 0; i--) {
      // let limit = winningCalculations[i]["results"].length - 1;
      if (
        i < calculations.length - 1 &&
        JSON.stringify(calculations[i]["results"]) ===
          JSON.stringify(calculations[i + 1]["results"])
      ) {
        calculations.splice(i + 1, 1);
      }

      // for (let j = 0; j < calculations[i]["results"].length; j++) {
      //   if (
      //     i < calculations.length - 1 &&
      //     calculations[i]["results"].indexOf(
      //       calculations[i + 1]["results"][j]
      //     ) !== -1
      //   ) {
      //     limit--;
      //   }

      //   if (limit === 0) {
      //     calculations.splice(i + 1, 1);
      //   }
      // }
    }
  }

  const [remove, setRemove] = useState(0);
  const [add, setAdd] = useState(0);

  const [closestCalculations, setClosestCalculations] = useState<
    { message: string; results: number[] }[]
  >([{ message: "", results: [] }]);

  const [finalCalculations, setFinalCalculations] = useState<
    { message: string; results: number[] }[]
  >([{ message: "", results: [] }]);

  useEffect(() => {
    if (closestNumber === 0) return;
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
      { id: 0, number: 0 },
      closestNumber
    );

    nextRoundCalculation(2, "firstNumber", "secondNumber", "result");
    nextRoundCalculation(3, "thirdNumber", "fourthNumber", "secondResult");
    nextRoundCalculation(4, "fifthNumber", "sixthNumber", "thirdResult");
    nextRoundCalculation(5, "seventhNumber", "eighthNumber", "fourthResult");

    sortResults(winningCalculations);

    setFinalCalculations(winningCalculations);

    const newMin = numberToGuess - (remove + 1);
    const newMax = numberToGuess + (add + 1);

    if (winningCalculations.length === 1 && remove > add && newMax !== 999) {
      setClosestNumber(newMax);
      setAdd((prev) => prev + 1);
      return;
    }

    if (winningCalculations.length === 1 && newMin !== 101) {
      setClosestNumber(newMin);
      setRemove((prev) => prev + 1);
      return;
    }

    if (
      winningCalculations.length > 1 &&
      remove > 0 &&
      add > 0 &&
      remove === add
    ) {
      setClosestCalculations((prev) => [...prev, ...winningCalculations]);
    } else if (
      winningCalculations.length > 1 &&
      remove > 0 &&
      remove === add + 1
    ) {
      setClosestCalculations([...winningCalculations]);
      if (newMax !== 999) {
        setClosestNumber(newMax);
        setAdd((prev) => prev + 1);
      }
    } else if (
      winningCalculations.length > 1 &&
      (remove > 0 || add > 0)

      // && (remove < add || remove > add)
    ) {
      setClosestCalculations([...winningCalculations]);
    }
  }, [closestNumber]);

  console.log(finalCalculations);
  console.log(closestCalculations);

  return (
    <>
      {closestCalculations.length === 1
        ? finalCalculations.map((calculation, index) => (
            <div key={index}>{calculation["message"]}</div>
          ))
        : closestCalculations.map((calculation, index) => (
            <div key={index}>{calculation["message"]}</div>
          ))}
    </>
  );
}

export default WinCalculation;
