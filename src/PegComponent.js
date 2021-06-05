const PegComponent = (props) => {
  const { coord, player, play } = props
  return (
    <div key={ coord }
      onClick={ play(player, coord) }
      className="peg"
    >
      { coord }
    </div>
  );
};

export default PegComponent;