import { useState } from 'react';

import './App.css';
import Game from './Game';
import GameboardComponent from './GameboardComponent';

function App() {
  // start a game
  const game = Game(10);
  const players = game.getPlayers();
  const gameboards = game.getGameboards();

  const [attackCoord, setAttackCoord] = useState('');

  const updateAttackCoord = (e) => {
    // verify coordinate?
    // update
    setAttackCoord(e.target.value);
  }

  const attack = () => {
    game.playTurn(players[0], attackCoord);
  }

  return (
    <div className="App">
      <header>BATTLESHIP</header>
      <label>
        Attack coordinate:
        <input
          type="text"
          value={attackCoord}
          onChange={ updateAttackCoord }
        />
      </label>
      <button onClick={attack}>FIRE TORPEDO</button>


      <GameboardComponent
        player={ players[0] }
        gameboard={ gameboards[0] }
        owner="opponent"
        play={ game.playTurn }
      />
      <GameboardComponent
        player={ players[1] }
        gameboard={ gameboards[1] }
        owner="player"
        play={ game.playTurn }
      />
    </div>
  );
}

export default App;
