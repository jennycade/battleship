import PegComponent from "./PegComponent";

const GameboardComponent = (props) => {
  const { board, shipboard, owner, play } = props;

  // board size for style
  const size = Math.sqrt(Object.keys(board).length);

  const coords = Object.keys(board);
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  const xlabels = alpha.slice(0, size).split('');
  const ylabels = [];
  for (let i=1; i<=size; i++) {
    ylabels.push(i);
  }

  const gbStyle = {
    gridTemplateColumns: `1fr ${size}fr`,
    gridTemplateRows: `1fr ${size}fr`,
  };

  const xLabelsStyle = {
    gridTemplateColumns: `repeat(${size}, 1fr)`,
  };

  const yLabelsStyle = {
    gridTemplateRows: `repeat(${size}, 1fr)`,
  };

  const pegsStyle = {
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`,
  }

  return (
    <div style={ gbStyle } className={`${owner} gameboard sizing`}>
      <div style={ xLabelsStyle } className="xlabels">

        {
          xlabels.map(letter => <div key={letter} className="label xlabel">{letter.toUpperCase()}</div>)
        }

      </div>
      <div style={ yLabelsStyle } className="ylabels">
        {
          ylabels.map(num => <div key={num} className="label ylabel">{num}</div>)
        }
      </div>

      <div className="pegs" style={ pegsStyle }>
        {
          coords.map(coord => {
          return (
            <PegComponent
              key={coord}
              coord={coord}
              hit={board[coord]}
              // ship={owner==='player' ? shipboard[coord] : ''}
              ship={shipboard[coord]}
              play={play}
              owner={owner}
            />
          );}
          )
        }
      </div>
    </div>
  );
}

export default GameboardComponent;