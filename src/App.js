import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header>BATTLESHIP</header>
      <div className="opponent gameboard">
        <div className="blankspace"></div>

        <div className="label xcoord">A</div>
        <div className="label xcoord">B</div>
        <div className="label xcoord">C</div>
        <div className="label xcoord">D</div>
        <div className="label xcoord">E</div>
        <div className="label ycoord">1</div>

        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>

        <div className="label ycoord">2</div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>

        <div className="label ycoord">3</div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>

        <div className="label ycoord">4</div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>

        <div className="label ycoord">5</div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
      </div>
      <div className="player gameboard">
        <div className="blankspace"></div>

        <div className="label xcoord">A</div>
        <div className="label xcoord">B</div>
        <div className="label xcoord">C</div>
        <div className="label xcoord">D</div>
        <div className="label xcoord">E</div>
        <div className="label ycoord">1</div>
        
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>

        <div className="label ycoord">2</div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>

        <div className="label ycoord">3</div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>

        <div className="label ycoord">4</div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>

        <div className="label ycoord">5</div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
        <div className="peg"> . </div>
      </div>
    </div>
  );
}

export default App;
