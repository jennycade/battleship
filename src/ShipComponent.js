import { setState } from 'expect';
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
    props.placeShip(size, coord, dir);
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
    marginBottom: '0.5rem;'
  }

  const formStyle = {
    gridColumnStart: 1,
    gridColumnEnd: -1,
    backgroundColor: '#fff',
    color: '#000',
    marginTop: '0.5rem',
    marginBottom: '0.5rem;'
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