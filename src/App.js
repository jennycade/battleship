import './App.css';
import Game from './Game';
import GameboardComponent from './GameboardComponent';

function App() {
  // start a game
  const game = Game(10);
  const players = game.getPlayers();
  const gameboards = game.getGameboards();
  return (
    <div className="App">
      <header>BATTLESHIP</header>
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
