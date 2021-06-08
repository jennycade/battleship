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

  const attack = () => {
    // make the attack
    const aiAttackCoord = game.playTurn(attackCoord, true);
    
    // update gbs
    // const [newGb1, newGb2] = game.getHitBoards();
    setBoards(game.getHitBoards())

    // console.log those boards
    // console.log(newGb1.printBoard());
    // console.log(newGb2.printBoard());
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
        play={ game.playTurn }
      />
      <GameboardComponent
        board={ boards[0] }
        owner="player"
        play={ game.playTurn }
      />
    </div>
  );
}

export default App;
