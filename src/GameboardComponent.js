import { boardGenerator } from "./Helpers";

const GameboardComponent = (props) => {
  const { owner, size } = props;

  const coords = boardGenerator(size);
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  const xlabels = alpha.slice(0, size).split('');
  const ylabels = [];
  for (let i=1; i<=size; i++) {
    ylabels.push(i);
  }

  let sizingStyle = {
    
  }

  return (
    <div className={`${owner} gameboard sizing`}>
      <div className="xlabels">

        {
          xlabels.map(letter => <div key={letter} className="label xlabel">{letter.toUpperCase()}</div>)
        }

      </div>
      <div className="ylabels">
        {
          ylabels.map(num => <div key={num} className="label ylabel">{num}</div>)
        }
      </div>

      <div className="pegs">
        {
          coords.map(coord => <div key={coord} className="peg">{coord}</div>)
        }
      </div>
    </div>
  );
}

export default GameboardComponent;