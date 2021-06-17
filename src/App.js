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

  // p2 live/sunk ships
  const [p2LiveShips, setP2LiveShips] = useState(game.getP2LiveShips());
  const [p2SunkShips, setP2SunkShips] = useState(game.getP2SunkShips());

  const startNewGame = () => {
    const newGame = Game(10);
    setGame(newGame);
    setPhase(newGame.getPhase());
    setWinner(newGame.getWinner());
    setBoards(newGame.getHitBoards());
    setShipBoard(newGame.getShipBoard());
    setShipsToPlace(newGame.getShipsToPlace());
    setP2LiveShips(game.getP2LiveShips());
    setP2SunkShips(game.getP2SunkShips());

    setSelectedCoord('');
    
  }

  const placeShip = (ship, coord, dir) => {
    if (phase === 'placement') {
      // TODO: check coordinates first?
      // TODO: Fix the bug - if no direction is selected it places a ship of length one
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

      // update p2 ships
      setP2LiveShips(game.getP2LiveShips());
      setP2SunkShips(game.getP2SunkShips());

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

  // TODO: Fix the way p2ShipsDiv is duplicating parts of the list.

  const p2ShipsDiv = (
    <div className="p2Ships">
      <header>P2 Fleet</header>
      <div className="liveShips">
        <header>Live ships</header>
        {p2LiveShips.map((size, index) => <li key={index}>{index}: {size}</li>)}
        <header>Sunk ships</header>
        {p2SunkShips.map((size, index) => <li key={index}>{index}: {size}</li>)}
      </div>
    </div>
  );

  const shipPlacementDiv = (
    <div className="shipsToPlace">
      <header>Click to place ship</header>
      { shipsToPlace.map((ship, index) => <ShipComponent key={index} size={ship} placeShip={placeShip} selectedCoord={selectedCoord} />)}
    </div>
  );

  const winnerDiv = (
    <div className="message">
      <p>
        {winner} wins!
      </p>
      <button onClick={startNewGame} >
        New game
      </button>

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
        { phase==='placement' ? shipPlacementDiv : p2ShipsDiv}
      </div>
      
    </div>
  );
}

export default App;
