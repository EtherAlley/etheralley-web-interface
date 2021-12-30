import { Profile, ProfileMode } from '../../constants';
import NFT from './NFT';
import EditBar from './EditBar';

export default function ({ profileMode, profile }: { profileMode: ProfileMode; profile: Profile }) {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {profileMode === ProfileMode.Edit && <EditBar />}
      {profile.nft_elements.map((nft) => (
        <NFT {...nft} />
      ))}
    </div>
  );
}
