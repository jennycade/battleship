import { useState } from 'react';

import './App.css';
import Game from './Game';
import GameboardComponent from './GameboardComponent';

function App() {
  // start a game
  const [game, setGame] = useState(Game(10));

  const [boards, setBoards] = useState(game.getHitBoards());

  const [attackCoord, setAttackCoord] = useState('');

  const attack = (coord = '') => {
    // make the attack
    if (coord !== '') {
      setAttackCoord(coord);
      const aiAttackCoord = game.playTurn(coord);
    } else {
      const aiAttackCoord = game.playTurn(attackCoord);
    }
    
    // update gbs
    setBoards(game.getHitBoards());
  }

  return (
    <div className="App">
      <header>BATTLESHIP</header>

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
