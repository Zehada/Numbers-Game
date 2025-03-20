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
        ("hello");
        setWin(1);
      }
    }
  }, [numbersList]);

  console.log(win);
  return (
    <>
      <div>{win === 1 ? "you win" : "you lose"}</div>
    </>
  );
}

export default EndMessage;
