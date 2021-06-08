// import { useState, useEffect } from "react";

const PegComponent = (props) => {
  const { coord, hit, owner } = props

  // const [mode, setMode] = useState(hit);

  const play = () => {
    if (hit === '' && owner === 'opponent') {
      props.play(coord);
    }
  }

  const hitCode = () => {
    if (hit === '') {
      return hit;
    }
    if (hit === 'miss') {
      return 'O';
    }
    if (hit === 'hit') {
      return 'X';
    }
  }

  // useEffect(() => {
  //   setMode(hit);
  // }, [hit]);

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