import { useEffect } from "react";

type NumberToGuessProps = {
  handleNumberToGuess: any;
  numberToGuess: number;
};

function NumberToGuess({
  handleNumberToGuess,
  numberToGuess,
}: NumberToGuessProps) {
  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    handleNumberToGuess(randomIntFromInterval(101, 999));
  }, []);

  return (
    <>
      <div>{numberToGuess}</div>
    </>
  );
}

export default NumberToGuess;
