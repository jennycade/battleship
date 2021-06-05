import './App.css';
import Game from './Game';
import GameboardComponent from './GameboardComponent';

function App() {
  return (
    <div className="App">
      <header>BATTLESHIP</header>
      <GameboardComponent owner="opponent" size={10} />
      <GameboardComponent owner="player" size={10} />
    </div>
  );
}

export default App;
