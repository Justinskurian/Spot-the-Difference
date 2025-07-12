import React, { useState } from 'react';
import ConfigScreen from './components/ConfigScreen';
import Game from './components/Game';
import './App.css';

function App() {
  const [gameData, setGameData] = useState(null);

  return (
    <div className="app-container">
      {!gameData ? (
        <ConfigScreen onStart={setGameData} />
      ) : (
        <Game gameData={gameData} />
      )}
    </div>
  );
}

export default App;
