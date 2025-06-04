import { useEffect, useState } from "react";

type EndMessageProps = {
  gameStatus: string;
};

function EndMessage({ gameStatus }: EndMessageProps) {
  const [closeBtnClicked, setCloseBtnClicked] = useState(false);

  function handleClosingBtn() {
    setCloseBtnClicked(true);
  }
  return (
    <>
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          closeBtnClicked ? "hidden" : ""
        }`}
        id="my-modal"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-[#242424] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg max-w-sm w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-white"
                id="modal-headline"
              >
                {gameStatus === "won" ? "You Won" : ""}
                {gameStatus === "lost" ? "You lost" : ""}
              </h3>
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-base font-medium text-white sm:text-sm border-1 border-transparent hover:border-gray-700"
                onClick={() => handleClosingBtn()}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EndMessage;
