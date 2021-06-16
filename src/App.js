import { useEffect, useState } from 'react';

import './App.css';
import Game from './Game';
import GameboardComponent from './GameboardComponent';
import ShipComponent from './ShipComponent';

function App() {
  // start a game
  const [game, setGame] = useState(Game(10));

  // game phase
  const [phase, setPhase] = useState(game.getPhase());

  const [boards, setBoards] = useState(game.getHitBoards());

  const [shipsToPlace, setShipsToPlace] = useState(game.getShipsToPlace());

  const [attackCoord, setAttackCoord] = useState('');

  const placeShip = (ship, coord, dir) => {
    if (phase === 'placement') {
      // TODO: check coordinates first?
      game.placePlayerShip(ship, coord, dir);
      
      // update phase
      setPhase(game.getPhase());

      // update ships to place
      setShipsToPlace(game.getShipsToPlace());
    }
  }

  const attack = (coord = '') => {
    if (phase === 'attack') {
      // make the attack
      if (coord !== '') {
        setAttackCoord(coord);
        const aiAttackCoord = game.playTurn(coord);
      } else {
        const aiAttackCoord = game.playTurn(attackCoord);
      }
      // update gbs
      setBoards(game.getHitBoards());

      // update phase
      setPhase(game.getPhase());
    }
  }

  return (
    <div className="App">
      <header>BATTLESHIP</header>
      <div className="boards">
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
      <div className="settings">
        <div className="shipsToPlace">
          <header>Click to place ship</header>
          { shipsToPlace.map((ship, index) => <ShipComponent key={index} size={ship} placeShip={placeShip} />)}
        </div>
      </div>
      
    </div>
  );
}

export default App;
