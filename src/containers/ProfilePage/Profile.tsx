import { Profile } from '../../constants';
import NFT from './NFT';

function ProfileComponent({ profile }: { profile: Profile }) {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {profile.nfts.map((nft, i) => (
        <NFT key={i} {...nft} />
      ))}
    </div>
  );
}

export default ProfileComponent;
