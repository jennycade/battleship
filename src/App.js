import { useState } from 'react';

import './App.css';
import Game from './Game';
import GameboardComponent from './GameboardComponent';

function App() {
  // start a game
  const [game, setGame] = useState(Game(10));

  const [boards, setBoards] = useState(game.getHitBoards());

  const [attackCoord, setAttackCoord] = useState('');

  const updateAttackCoord = (e) => {
    // verify coordinate
    // TODO write this

    // update
    setAttackCoord(e.target.value);
  }

  const attack = (coord = '') => {
    // make the attack
    if (coord !== '') {
      setAttackCoord(coord);
      const aiAttackCoord = game.playTurn(coord, true);
    } else {
      const aiAttackCoord = game.playTurn(attackCoord, true);
    }
    
    // update gbs
    setBoards(game.getHitBoards());
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
        board={ boards[1] }
        owner="opponent"
        play={ attack }
      />
      <GameboardComponent
        board={ boards[0] }
        owner="player"
        play={ attack }
      />
    </div>
  );
}

export default App;
