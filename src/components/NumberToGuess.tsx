import { useEffect, useRef, useState } from "react";

type NumberToGuessProps = {
  numbersDropped: boolean;
  handleNumberToGuess: (data: number) => void;
  numberToGuess: number;
};

function NumberToGuess({
  numbersDropped,
  handleNumberToGuess,
  numberToGuess,
}: NumberToGuessProps) {
  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    const randomNumber = randomIntFromInterval(101, 999);
    handleNumberToGuess(randomNumber);
  }, []);

  console.log(numberToGuess);

  const [arrayNumber, setArrayNumber] = useState([""]);

  const counterRef1 = useRef<HTMLSpanElement>(null);
  const counterRef2 = useRef<HTMLSpanElement>(null);
  const counterRef3 = useRef<HTMLSpanElement>(null);

  const [activeDigits, setActiveDigits] = useState(3);

  const counterNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const counterSpans = [counterRef1, counterRef2, counterRef3];

  let cancelled = false;

  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const defilement = async () => {
    while (!cancelled) {
      for (const digit of counterNumbers) {
        if (cancelled) return;
        await sleep(20);
        for (let i = 0; i < activeDigits; i++) {
          const span = counterSpans[i].current;
          if (span) {
            span.innerText = digit;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (numbersDropped) {
      defilement();
    }
    return () => {
      cancelled = true;
    };
  }, [numbersDropped, activeDigits]);

  useEffect(() => {
    const padded = numberToGuess.toString().padStart(3, "");
    setArrayNumber(padded.split(""));
  }, [numberToGuess]);

  useEffect(() => {
    if (numbersDropped) {
      console.log(arrayNumber);
      const timeouts = [
        setTimeout(() => {
          setActiveDigits(2);
          if (counterRef3.current) {
            counterRef3.current.innerText = arrayNumber[2];
          }
        }, 700),
        setTimeout(() => {
          if (counterRef3.current) {
            counterRef3.current.innerText = arrayNumber[2];
          }
        }, 720),
        setTimeout(() => {
          setActiveDigits(1);
        }, 1400),
        setTimeout(() => {
          if (counterRef2.current) {
            counterRef2.current.innerText = arrayNumber[1];
          }
        }, 1420),
        setTimeout(() => {
          setActiveDigits(0);
        }, 2100),
        setTimeout(() => {
          if (counterRef1.current) {
            counterRef1.current.innerText = arrayNumber[0];
          }
        }, 2120),
      ];

      return () => timeouts.forEach(clearTimeout);
    }
  }, [numbersDropped]);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2">
        <p>Number to find: </p>
        <div
          id="counter"
          className="flex justify-center items-center text-lg font-bold rounded-lg w-[3.5rem] h-[3.5rem] bg-gray-800"
        >
          <span ref={counterRef1}></span>
          <span ref={counterRef2}></span>
          <span ref={counterRef3}></span>
        </div>
      </div>
    </>
  );
}

export default NumberToGuess;
