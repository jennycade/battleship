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

  // winner
  const [winner, setWinner] = useState(game.getWinner());

  // boards states
  const [boards, setBoards] = useState(game.getHitBoards());
  const [shipBoard, setShipBoard] = useState(game.getShipBoard());

  // ship placement
  const [shipsToPlace, setShipsToPlace] = useState(game.getShipsToPlace());

  const [selectedCoord, setSelectedCoord] = useState('');

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
      const newPhase = game.getPhase();
      setPhase(newPhase);

      // update winner?
      if (newPhase==='end') {
        setWinner(game.getWinner());
      }
    }
  }

  const chooseCoord = (newCoord) => {
    // click a peg on your board, send it to ShipComponent
    if (phase === 'placement') {
      setSelectedCoord(newCoord);
    }
  }

  const winnerDiv = (
    <div className="message">
      {winner} wins!
    </div>
  )

  const shipPlacementDiv = (
    <div className="shipsToPlace">
      <header>Click to place ship</header>
      { shipsToPlace.map((ship, index) => <ShipComponent key={index} size={ship} placeShip={placeShip} selectedCoord={selectedCoord} />)}
    </div>
  );

  return (
    <div className="App">
      { winner !== '' ? winnerDiv : '' }
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
          play={ chooseCoord }
        />
      </div>
      <div className="shipDiv">
        { phase==='placement' ? shipPlacementDiv : ''}
      </div>
      
    </div>
  );
}

export default App;
