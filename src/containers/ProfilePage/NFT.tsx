import { NFTElement } from '../../constants';

function NFT({ image_url, name }: NFTElement) {
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
      <img alt={name} src={image_url} />
      <div>{name}</div>
    </div>
  );
}

export default NFT;
