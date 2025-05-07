import { useEffect, useState } from "react";

type EndMessageProps = {
  numbersList: { id: number; number: number }[];
  numberToGuess: number;
};

function EndMessage({ numbersList, numberToGuess }: EndMessageProps) {
  const [win, setWin] = useState(0);

  useEffect(() => {
    for (let numberInList in numbersList) {
      if (
        numberToGuess != 0 &&
        numbersList[parseInt(numberInList)]["number"] === numberToGuess
      ) {
        setWin(1);
      }
    }
  }, [numbersList]);

  return (
    <>
      <div>{win === 1 ? "you win" : "you lose"}</div>
    </>
  );
}

export default EndMessage;
