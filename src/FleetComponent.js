const FleetComponent = (props) => {
  const {p2LiveShips, p2SunkShips} = props
  return (
    <div className="p2Ships">
      <header>P2 Fleet</header>
      <div className="liveShips">
        <header>Live ships</header>
        {p2LiveShips.map((size, index) => <li key={index}>{index}: {size}</li>)}
        <header>Sunk ships</header>
        {p2SunkShips.map((size, index) => <li key={index}>{index}: {size}</li>)}
      </div>
    </div>
  );
}

export default FleetComponent;