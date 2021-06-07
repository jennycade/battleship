import { useState } from "react";

const PegComponent = (props) => {
  const { coord, hit, player, gameboard } = props

  const play = () => {
    props.play(coord);
  }

  return (
    <div key={ coord }
      onClick={ play }
      className="peg"
    >
      { '.' }
    </div>
  );
};

export default PegComponent;