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
    <div className="w-full relative mx-auto flex flex-col items-center justify-center min-h-screen bg-game-bg text-white overflow-hidden pt-4 safe-top">
      <Header closeModal={closeModal} setCloseModal={setCloseModal} />
      <Game
        key={gameId}
        wordColors={wordColors}
        setWordColors={setWordColors}
        setCloseModal={setCloseModal}
        setGameResult={setGameResult}
        onNewGame={handleNewGame}
        onMagicHelpUsed={() => setUsedMagicHelp(true)}
      />
      <Modal
        gameResult={gameResult}
        data={wordColors}
        closeModal={closeModal}
        setCloseModal={setCloseModal}
        onNewGame={handleNewGame}
        usedMagicHelp={usedMagicHelp}
      />
    </div>
  );
}

export default App;
