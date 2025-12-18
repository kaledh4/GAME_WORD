import { useState, useEffect } from "react";
import Toast from "./Toast";
import Close from "./icons/Close";
import Share from "./icons/Share";
import { letterColors } from "../data/letters-list";
import { day } from "../data/words-list";
import { getStats, GameStats } from "../utils/stats";

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
  const [stats, setStats] = useState<GameStats | null>(null);

  const { letterAbsent, letterExist } = letterColors;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCloseModal(true);
  };

  useEffect(() => {
    if (!closeModal) {
      setStats(getStats());
    }
    setTimeout(() => {
      setDisplay(closeModal ? "hidden" : "flex");
    }, 180);
  }, [closeModal]);

  const handleShare = () => {
    const guessPosition = gameResult === "win" ? `${data?.length}/6` : "X/6";
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

  const winPercentage = stats ? Math.round((stats.gamesWon / Math.max(stats.gamesPlayed, 1)) * 100) : 0;

  return (
    <>
      <div
        className={`${closeModal ? "hidden" : "flex"} flex-nowrap justify-center items-center absolute p-0 m-0 top-0 right-0 bottom-0 w-full h-full bg-black/40 z-30 backdrop-blur-sm`}
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
          <h1 className="text-2xl font-bold mb-6 text-brand-charcoal">إحصائياتك</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 w-full mb-8" dir="rtl">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{stats?.gamesPlayed || 0}</span>
              <span className="text-[10px] opacity-60">ملعوبة</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{winPercentage}%</span>
              <span className="text-[10px] opacity-60">نسبة الفوز</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{stats?.currentStreak || 0}</span>
              <span className="text-[10px] opacity-60">سلسلة حالية</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{stats?.maxStreak || 0}</span>
              <span className="text-[10px] opacity-60">أفضل سلسلة</span>
            </div>
          </div>

          <h2 className="text-lg font-bold mb-4 self-start" dir="rtl">توزيع التخمينات</h2>

          <div className="w-full flex flex-col gap-2 mb-8" dir="rtl">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const count = stats?.guessDistribution[num] || 0;
              const maxCount = stats ? Math.max(...Object.values(stats.guessDistribution), 1) : 1;
              const width = Math.max((count / maxCount) * 100, 7);
              const isCurrentGuess = gameResult === "win" && data.length === num;

              return (
                <div key={num} className="flex items-center w-full gap-2">
                  <span className="text-xs font-bold w-2">{num}</span>
                  <div
                    className={`h-5 flex items-center justify-end px-2 rounded transition-all duration-1000 ${isCurrentGuess ? 'bg-brand-sage' : 'bg-brand-taupe'}`}
                    style={{ width: `${width}%` }}
                  >
                    <span className="text-white text-[10px] font-bold">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {gameResult !== "idle" && (
            <div className="flex flex-col w-full items-center gap-3">
              {usedMagicHelp && (
                <p className="text-sm text-brand-charcoal/60 mb-1 bg-brand-sand/10 px-3 py-1 rounded-full">تم استخدام المساعدة السحرية 🪄</p>
              )}
              <div className="flex w-full gap-3">
                <button onClick={handleShare} className="flex-1 flex px-4 py-4 rounded-xl bg-brand-sage hover:opacity-90 text-white font-bold justify-center shadow-lg transition-all items-center">
                  <Share />
                  <span className="mr-2">شارك</span>
                  <Toast toastData={toastData} setToastData={setToastData} />
                </button>
                <button onClick={onNewGame} className="flex-1 flex px-4 py-4 rounded-xl bg-brand-muted-blue hover:opacity-90 text-white font-bold justify-center shadow-lg transition-all">
                  لعبة جديدة
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
