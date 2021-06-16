// import { useState, useEffect } from "react";

const PegComponent = (props) => {
  const { coord, hit, ship, owner } = props

  // const [mode, setMode] = useState(hit);

  const play = () => {
    if (hit === '' && owner === 'opponent') {
      props.play(coord);
    }
  }

  const hitCode = () => {
    if (hit === 'hit') {
      return 'X';
    } else if (ship === 'S') {
      return 'S';
    } else if (hit === '') {
      return hit;
    } else if (hit === 'miss') {
      return 'O';
    }
    
  }

  return (
    <div key={ coord }
      onClick={ play }
      className="peg"
    >
      { hitCode() }
    </div>
  );
};

export default PegComponent;