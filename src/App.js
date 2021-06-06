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
  const [gb1, setGb1] = useState(gameboards[0].getBoard());
  const [gb2, setGb2] = useState(gameboards[1].getBoard());

  const updateAttackCoord = (e) => {
    // verify coordinate?
    // update
    setAttackCoord(e.target.value);
  }

  const attack = () => {
    // make the attack
    game.playTurn(attackCoord);
    // re-render both gameboards?
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
        player={ players[1] }
        board={ gb2 }
        owner="opponent"
        play={ game.playTurn }
      />
      <GameboardComponent
        player={ players[0] }
        board={ gb1 }
        owner="player"
        play={ game.playTurn }
      />
    </div>
  );
}

export default App;
