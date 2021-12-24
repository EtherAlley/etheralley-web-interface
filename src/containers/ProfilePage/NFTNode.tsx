function NFTNode({ data: { url, label }, selected }: { data: any; selected: boolean }) {
  return (
    <div
      style={{
        border: `2px solid ${selected ? 'red' : 'black'}`,
        background: '#9CA8B3',
        color: '#FFF',
        padding: 10,
      }}
    >
      <img alt={label} src={url} style={{ width: 150, height: 150 }} />
      <div>{label}</div>
    </div>
  );
}

export default NFTNode;
