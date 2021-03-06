import { useState } from 'react';

const ShipComponent = (props) => {
  const {size, selectedCoord} = props

  const [showForm, setShowForm] = useState(false);
  
  const [dir, setDir] = useState('down');

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const placeShip = () => {

    // place Ship
    props.placeShip(size, selectedCoord, dir);

    // hide form
    toggleForm();

    // unset the variables
    setDir('');
  }

  const dirStyle = {
    backgroundColor: '#00ff00',
  }

  let assignForm = (
    <div className="shipPlacementForm">
      <label>
        STARTING COORDINATE
        <input
          type="text"
          value={selectedCoord}
          readOnly
        />
      </label>
      <label>
        DIRECTION
        <button style={ dir==='up' ? dirStyle : {} } onClick={() => setDir('up')}>↑</button>
        <button style={ dir==='left' ? dirStyle : {} } onClick={() => setDir('left')}>←</button>
        <button style={ dir==='right' ? dirStyle : {} } onClick={() => setDir('right')}>→</button>
        <button style={ dir==='down' ? dirStyle : {} } onClick={() => setDir('down')}>↓</button>
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
    // TODO: move this styling into CSS, if possible
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