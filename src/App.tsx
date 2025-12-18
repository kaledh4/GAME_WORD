import { useState } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Modal from "./components/Modal";
import InfoModal from "./components/InfoModal";

function App() {
  const [gameId, setGameId] = useState(0);
  const [wordColors, setWordColors] = useState<Array<any>>([]);
  const [closeModal, setCloseModal] = useState<boolean>(true);
  const [gameResult, setGameResult] = useState<string>("idle");
  const [usedMagicHelp, setUsedMagicHelp] = useState<boolean>(false);
  const [infoModalType, setInfoModalType] = useState<"settings" | "menu" | null>(null);

  const handleNewGame = () => {
    setGameId((prev) => prev + 1);
    setWordColors([]);
    setCloseModal(true);
    setGameResult("idle");
    setUsedMagicHelp(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col text-brand-charcoal safe-top">
      {/* Header at top */}
      <Header
        closeModal={closeModal}
        setCloseModal={setCloseModal}
        setInfoModalType={setInfoModalType}
      />

      {/* Game Container - centered with flex-grow */}
      <div className="flex-1 flex flex-col items-center justify-between px-4 py-2">
        <Board
          key={gameId}
          wordColors={wordColors}
          setWordColors={setWordColors}
          setCloseModal={setCloseModal}
          setGameResult={setGameResult}
          onNewGame={handleNewGame}
          onMagicHelpUsed={() => setUsedMagicHelp(true)}
          setInfoModalType={setInfoModalType}
        />
      </div>

      <Modal
        gameResult={gameResult}
        data={wordColors}
        closeModal={closeModal}
        setCloseModal={setCloseModal}
        onNewGame={handleNewGame}
        usedMagicHelp={usedMagicHelp}
      />

      <InfoModal
        isOpen={infoModalType !== null}
        onClose={() => setInfoModalType(null)}
        type={infoModalType}
      />

      {/* Footer */}
      <div className="text-center text-xs text-brand-charcoal/30 font-light py-2">
        <p>صُنع بـ ❤️ للغة العربية</p>
      </div>
    </div>
  );
}

export default App;
