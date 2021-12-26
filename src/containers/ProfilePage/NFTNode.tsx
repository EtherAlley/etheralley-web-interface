function NFTNode({
  data: { image, name, description, attributes, tokenId },
  selected,
}: {
  data: any;
  selected: boolean;
}) {
  return (
    <div
      style={{
        border: `2px solid ${selected ? 'red' : 'black'}`,
        background: '#9CA8B3',
        color: '#FFF',
        padding: 10,
      }}
    >
      <img alt={name} src={image} style={{ width: 150, height: 150 }} />
      <div>{name}</div>
    </div>
  );
}

export default NFTNode;
