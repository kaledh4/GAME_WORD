import { useState } from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import Modal from "./components/Modal";
function App() {
  const [gameId, setGameId] = useState(0);
  const [wordColors, setWordColors] = useState<Array<any>>([]);
  const [closeModal, setCloseModal] = useState<boolean>(true);
  const [gameResult, setGameResult] = useState<string>("idle");

  const handleNewGame = () => {
    setGameId((prev) => prev + 1);
    setWordColors([]);
    setCloseModal(true);
    setGameResult("idle");
  };

  return (
    <div className="w-full relative mx-auto flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-darker to-dark text-white overflow-hidden">
      <Header closeModal={closeModal} setCloseModal={setCloseModal} />
      <Game
        key={gameId}
        wordColors={wordColors}
        setWordColors={setWordColors}
        setCloseModal={setCloseModal}
        setGameResult={setGameResult}
        onNewGame={handleNewGame}
      />
      <Modal
        gameResult={gameResult}
        data={wordColors}
        closeModal={closeModal}
        setCloseModal={setCloseModal}
        onNewGame={handleNewGame}
      />
    </div>
  );
}

export default App;
