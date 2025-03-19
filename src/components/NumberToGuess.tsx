type NumbersToPlayWithProps = {
  randomNumbers: any;
  numbers: number[];
};

function NumberToGuess() {
  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const numberToGuess = randomIntFromInterval(101, 999);
  console.log(numberToGuess);

  return (
    <>
      <div>{numberToGuess}</div>
    </>
  );
}

export default NumberToGuess;
