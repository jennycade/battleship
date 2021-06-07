import { useState } from "react";

const PegComponent = (props) => {
  const { coord, hit, player, gameboard } = props

  const play = () => {
    props.play(coord);
  }

  return (
    <div key={ coord }
      // onClick={ play }
      className="peg"
    >
      { gameboard[coord].hit }
    </div>
  );
};

export default PegComponent;