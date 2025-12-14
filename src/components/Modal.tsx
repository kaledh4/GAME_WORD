import { useState, useEffect } from "react";
import Toast from "./Toast";
import Close from "./icons/Close";
import Share from "./icons/Share";
import { letterColors } from "../data/letters-list";
import { day } from "../data/words-list";

interface Props {
  data: any[];
  closeModal: boolean;
  gameResult: string;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  onNewGame: () => void;
}
const Modal = ({ gameResult, data, closeModal, setCloseModal, onNewGame }: Props) => {
  const [dsiplay, setDisplay] = useState<string>("hidden");
  const [toastData, setToastData] = useState<Array<any>>([]);
  const { letterAbsent, letterExist, letterRight } = letterColors;
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCloseModal(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setDisplay(closeModal ? "hidden" : "flex");
    }, 180);
  }, [closeModal]);

  const handleShare = () => {
    const guessPosition = gameResult === "win" ? `${data?.length}/6` : "0/6";
    const title = `كلمة ${day()} ${guessPosition}`;
    const clipBoard = data
      ?.map((wordColors: string[]) => {
        return wordColors
          .map((color: string) => {
            if (color === letterAbsent) return "⬜";
            else if (color === letterExist) return "🟨";
            return "🟩";
          })
          .join("");
      })
      .join("\n");
    navigator.clipboard.writeText(`${title}\n\n${clipBoard} `).then(() => setToastData([...toastData, "نسخت !"]));
  };
  return (
    <>
      <div
        className={`${closeModal ? "hidden" : "flex"
          }  flex-nowrap justify-center items-center absolute p-0 m-0 top-0 right-0 bottom-0 w-full h-full bg-black/80 z-30 backdrop-blur-sm`}
        onClick={handleClick}
      ></div>
      <div
        className={` z-50 absolute ${dsiplay} flex-col justify-center items-center w-11/12 max-w-md h-auto py-6 bg-game-bg border border-tile-border rounded-xl shadow-2xl p-4 text-white ${closeModal ? " animate-slide-out" : "animate-slide-in"
          }`}
      >
        <div className="cursor-pointer self-start w-100 mb-7" onClick={handleClick}>
          <Close />
        </div>
        <div className="w-2/3 h-full flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold">توزيع التخمينات</h1>
          <div className="mt-5 w-full flex flex-col justify-center items-center">
            {gameResult !== "idle" ? (
              data?.map((wordColors, index) => {
                let bool = false;
                let letterIndex = 0;
                wordColors.forEach((letterColor: string) => {
                  if (letterColor === letterRight) letterIndex++;
                });
                bool = letterIndex === 5 ? true : false;
                return (
                  <div className="flex flex-row-reverse w-full items-center my-[2px]">
                    {index + 1}
                    <div className={`ml-2 font-bold px-2 ${bool && "w-full"} flex flex-row-reverse text-white ${bool ? letterRight : letterAbsent}`}>
                      {bool ? "1" : "0"}
                    </div>
                  </div>
                );
              })
            ) : (
              <h2> لا توجد بيانات</h2>
            )}
          </div>
          {gameResult !== "idle" ? (
            <div className="flex flex-col w-full items-center">
              <button onClick={handleShare} className={`mt-5 mb-2 flex px-8 py-4 rounded-md ${letterRight} hover:opacity-90 text-white font-bold w-full justify-center shadow-lg transition-all`}>
                <Share />
                <span className="mr-2">شارك</span>
                <Toast toastData={toastData} setToastData={setToastData} />
              </button>
              <button onClick={onNewGame} className="mt-2 mb-5 flex px-8 py-4 rounded-md bg-key-enter hover:opacity-90 text-white font-bold w-full justify-center shadow-lg transition-all">
                لعبة جديدة
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Modal;
