import { useState } from "react";

const PegComponent = (props) => {
  const { coord, player, gameboard } = props

  const [pegDisplay, setPegDisplay] = useState(gameboard.query(coord, 'self').hit);

  const play = (coord) => {
    props.play(player, coord);
  }

  return (
    <div key={ coord }
      onClick={ play }
      className="peg"
    >
      { pegDisplay }
    </div>
  );
};

export default PegComponent;