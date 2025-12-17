import { useState } from "react";
import Game from "./components/Game";
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
    <div className="w-full relative mx-auto flex flex-col items-center justify-start min-h-screen text-white overflow-hidden safe-top">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Header closeModal={closeModal} setCloseModal={setCloseModal} />
        
        {/* Game Container with Enhanced Styling */}
        <div className="w-full max-w-2xl px-4 mt-2">
          <Game
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
