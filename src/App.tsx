import { useState } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
  const [gameId, setGameId] = useState(0);
  const [wordColors, setWordColors] = useState<Array<any>>([]);
  const [closeModal, setCloseModal] = useState<boolean>(true);
  const [gameResult, setGameResult] = useState<string>("idle");
  const [usedMagicHelp, setUsedMagicHelp] = useState<boolean>(false);

  const handleNewGame = () => {
    setGameId((prev) => prev + 1);
    setWordColors([]);
    setCloseModal(true);
    setGameResult("idle");
    setUsedMagicHelp(false);
  };

  return (
    <div className="w-full relative mx-auto flex flex-col items-center justify-center min-h-screen text-white overflow-hidden pt-4 safe-top">
      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header closeModal={closeModal} setCloseModal={setCloseModal} />
        
        {/* Game Container with Enhanced Styling */}
        <div className="w-full max-w-2xl px-4 mt-4">
          <Board
            key={gameId}
            wordColors={wordColors}
            setWordColors={setWordColors}
            setCloseModal={setCloseModal}
            setGameResult={setGameResult}
            onNewGame={handleNewGame}
            onMagicHelpUsed={() => setUsedMagicHelp(true)}
          />
        </div>
      </div>

      <Modal
        gameResult={gameResult}
        data={wordColors}
        closeModal={closeModal}
        setCloseModal={setCloseModal}
        onNewGame={handleNewGame}
        usedMagicHelp={usedMagicHelp}
      />
      
      {/* Decorative Footer Element */}
      <div className="absolute bottom-4 text-center text-xs text-white/30 font-light">
        <p>صُنع بـ ❤️ للغة العربية</p>
      </div>
    </div>
  );
}

export default App;
