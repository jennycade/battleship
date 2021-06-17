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

  // 

  // boards states
  const [boards, setBoards] = useState(game.getHitBoards());
  const [shipBoard, setShipBoard] = useState(game.getShipBoard());

  // ship placement
  const [shipsToPlace, setShipsToPlace] = useState(game.getShipsToPlace());

  const placeShip = (ship, coord, dir) => {
    if (phase === 'placement') {
      // TODO: check coordinates first?
      game.placePlayerShip(ship, coord, dir);
      
      // update phase
      setPhase(game.getPhase());
      console.log(game.getPhase());

      // update ships to place
      setShipsToPlace(game.getShipsToPlace());

      // update ship board
      setShipBoard(game.getShipBoard());
    }
  }

  const attack = (coord = '') => {
    console.log(`Attacking coord ${coord}`);
    console.log(`Phase is ${phase}`);
    if (phase === 'attack') {
      // make the attack
      game.playTurn(coord);
      
      // update gbs
      setBoards(game.getHitBoards());

      // update phase
      setPhase(game.getPhase());
    }
  }

  const shipPlacementDiv = (
    <div className="shipsToPlace">
      <header>Click to place ship</header>
      { shipsToPlace.map((ship, index) => <ShipComponent key={index} size={ship} placeShip={placeShip} />)}
    </div>
  );

  return (
    <div className="App">
      <div className="boards">
        <GameboardComponent
          board={ boards[1] }
          shipboard = { [] }
          owner="opponent"
          play={ attack }
        />
        <GameboardComponent
          board={ boards[0] }
          shipboard={ shipBoard }
          owner="player"
          play={ attack }
        />
      </div>
      <div className="shipDiv">
        { phase==='placement' ? shipPlacementDiv : ''}
      </div>
      
    </div>
  );
}

export default App;
