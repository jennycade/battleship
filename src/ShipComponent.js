import { useState } from 'react';

const ShipComponent = (props) => {
  const {size} = props

  const [showForm, setShowForm] = useState(false);
  
  const [coord, setCoord] = useState('A1');
  const [dir, setDir] = useState('down');

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const placeShip = () => {
    // convert coord to lower case
    const newCoord = coord.toLowerCase();

    // place Ship
    props.placeShip(size, newCoord, dir);

    // hide form
    toggleForm();
  }

  const updateCoord = (e) => {
    // verify coord first
    setCoord(e.target.value);
  }

  let assignForm = (
    <div className="shipPlacementForm">
      <label>
        STARTING COORDINATE
        <input
          type="text"
          value={coord}
          onChange={updateCoord}
        />
      </label>
      <label>
        DIRECTION
        <button onClick={() => setDir('up')}>↑</button>
        <button onClick={() => setDir('left')}>←</button>
        <button onClick={() => setDir('right')}>→</button>
        <button onClick={() => setDir('down')}>↓</button>
      </label>
      <button onClick={placeShip}>PLACE SHIP</button>
    </div>
  );
  
  


  const shipStyle = {
    gridColumnStart: 1,
    gridColumnEnd: 1+size,
    backgroundColor: '#fff',
    color: '#000',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    borderRadius: '10% 10% 90% 90%',
  }

  const formStyle = {
    gridColumnStart: 1,
    gridColumnEnd: -1,
    backgroundColor: '#fff',
    color: '#000',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  }

  if (showForm) {
    return (
      <div
        style={formStyle}
      >
        {assignForm}
      </div>
    );
  } else {
    return (
      <div
        style={shipStyle}
        className="ship"
        onClick={toggleForm}
  
      >
        { size }
      </div>
    );
  }
}

export default ShipComponent;