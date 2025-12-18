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
  usedMagicHelp: boolean;
}
const Modal = ({ gameResult, data, closeModal, setCloseModal, onNewGame, usedMagicHelp }: Props) => {
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
        className={`z-50 fixed ${dsiplay} flex-col justify-start items-center w-full max-w-md mx-auto bottom-0 left-0 right-0 h-auto py-6 bg-white border-t border-brand-charcoal/10 rounded-t-3xl shadow-2xl p-6 text-brand-charcoal ${closeModal ? "animate-slide-out" : "animate-slide-in"
          }`}
      >
        <div className="cursor-pointer self-start mb-6 text-brand-charcoal/40 hover:text-brand-charcoal transition-colors" onClick={handleClick}>
          <Close />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-2 text-brand-charcoal">إحصائيات الجولة</h1>
          {usedMagicHelp && gameResult !== "idle" && (
            <p className="text-sm text-brand-charcoal/60 mb-4 bg-brand-sand/10 px-3 py-1 rounded-full">تم استخدام المساعدة السحرية ✨</p>
          )}
          <div className="mt-4 w-full flex flex-col justify-center items-center">
            {gameResult !== "idle" ? (
              data?.map((wordColors, index) => {
                let bool = false;
                let letterIndex = 0;
                wordColors.forEach((letterColor: string) => {
                  if (letterColor === letterRight) letterIndex++;
                });
                bool = letterIndex === 4 ? true : false; // Word length is 4
                return (
                  <div className="flex flex-row-reverse w-full items-center my-1" key={index}>
                    <span className="w-4 text-xs opacity-40">{index + 1}</span>
                    <div className={`mr-2 font-bold px-3 py-1 rounded ${bool && "w-full"} flex flex-row-reverse text-white ${bool ? "bg-brand-sage" : "bg-brand-taupe"}`}>
                      {bool ? "1" : "0"}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center w-full py-8">
                <div className="mb-4 text-5xl">🌎</div>
                <h2 className="text-xl font-bold mb-2">إحصائياتك</h2>
                <p className="text-brand-charcoal/60">لم تلعب أي لعبة بعد</p>
                <p className="text-xs text-brand-charcoal/40 mt-2">ابدأ اللعب لتظهر إحصائياتك هنا</p>
              </div>
            )}
          </div>
          {gameResult !== "idle" ? (
            <div className="flex flex-col w-full items-center mt-6 gap-3">
              <button onClick={handleShare} className="flex px-8 py-4 rounded-xl bg-brand-sage hover:opacity-90 text-white font-bold w-full justify-center shadow-lg transition-all items-center">
                <Share />
                <span className="mr-2">شارك نتيجتك</span>
                <Toast toastData={toastData} setToastData={setToastData} />
              </button>
              <button onClick={onNewGame} className="flex px-8 py-4 rounded-xl bg-brand-muted-blue hover:opacity-90 text-white font-bold w-full justify-center shadow-lg transition-all">
                ابدأ لعبة جديدة
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Modal;
