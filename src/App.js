import './App.css';
import Game from './Game';
import GameboardComponent from './GameboardComponent';

function App() {
  return (
    <div className="App">
      <header>BATTLESHIP</header>
      <GameboardComponent owner="opponent" size={5} />
      <GameboardComponent owner="player" size={5} />
    </div>
  );
}

export default App;
