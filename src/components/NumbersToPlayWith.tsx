import { useEffect } from "react";

type NumbersToPlayWithProps = {
  randomNumbers: (data: number[]) => void;
  numbers: number[];
};

function NumbersToPlayWith({ randomNumbers, numbers }: NumbersToPlayWithProps) {
  let listOfNumber = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 25, 50, 75,
    100,
  ];

  let selectedNumbers: number[] = [];
  let randomIndex = 0;

  for (let index = 0; index < 6; index++) {
    randomIndex = Math.floor(Math.random() * listOfNumber.length);
    selectedNumbers.push(listOfNumber[randomIndex]);
    listOfNumber.splice(randomIndex, 1);
  }

  useEffect(() => {
    randomNumbers(selectedNumbers);
  }, []);

  return (
    <>
      {numbers.map((number, index) => (
        <div key={index}>{number}</div>
      ))}
    </>
  );
}

export default NumbersToPlayWith;
