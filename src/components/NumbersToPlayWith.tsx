import { useEffect, useState } from "react";

type NumbersToPlayWithProps = {
  randomNumbers: (data: number[]) => void;
  numbers: number[];
  started: boolean;
  numbersDropped: boolean;
};

function NumbersToPlayWith({
  randomNumbers,
  numbers,
  started,
  numbersDropped,
}: NumbersToPlayWithProps) {
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

  const [visible, setVisible] = useState<boolean[]>([]);
  useEffect(() => {
    if (started && !numbersDropped) {
      // On part de 0
      setVisible(Array(numbers.length).fill(false));

      const timeouts = numbers.map((_, index) =>
        setTimeout(() => {
          setVisible((prev) => {
            const updated = [...prev];
            updated[index] = true; // on active juste l'index voulu
            return updated;
          });
        }, 20 + index * 700)
      );

      return () => {
        timeouts.forEach(clearTimeout);
      };
    } else {
      setVisible([]); // Reset visible si started repasse à false
    }
  }, [started, numbers]);

  useEffect(() => {
    randomNumbers(selectedNumbers);
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-2">
          {numbers.map((number, index) => (
            <div
              key={index}
              className={`flex justify-center items-center text-lg font-bold rounded-lg w-[3.5rem] h-[3.5rem] xxs:text-sm xxs:w-[2.5rem] xxs:h-[2.5rem] xs:text-lg xs:w-[3.5rem] xs:h-[3.5rem] bg-[#1a1a1a] relative transition-all duration-700 ease-in-out ${
                numbersDropped
                  ? "bottom-0 opacity-100"
                  : visible[index]
                  ? "bottom-0 opacity-100"
                  : "bottom-12 opacity-0"
              }`}
            >
              {number}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NumbersToPlayWith;
