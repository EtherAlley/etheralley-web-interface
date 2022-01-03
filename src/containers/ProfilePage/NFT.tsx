import { NFT } from '../../constants';

function NFTComponent({ metadata: { image, name } }: NFT) {
  return (
    <div
      style={{
        border: `2px solid black`,
        background: '#9CA8B3',
        color: '#FFF',
        padding: 10,
        width: 150,
        height: 150,
      }}
    >
      <img alt={name} src={image} style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }} />
      <div>{name}</div>
    </div>
  );
}

export default NFTComponent;
