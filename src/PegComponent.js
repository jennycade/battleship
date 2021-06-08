import { useState, useEffect } from "react";

const PegComponent = (props) => {
  const { coord, hit, player, gameboard } = props

  const [mode, setMode] = useState(hit);

  const play = () => {
    props.play(coord);
  }

  useEffect(() => {
    setMode(hit);
  }, [hit]);

  return (
    <div key={ coord+hit } // need to update the key when prop changes to get this to re-render, maybe? It doesn't seem to work though. Maybe need to update key for gameboard component too.
      onClick={ play }
      className="peg"
    >
      { hit }
    </div>
  );
};

export default PegComponent;