import { Box, SimpleGrid } from '@chakra-ui/react';
import { Profile } from '../../constants';
import NFT from './NFT';

function ProfileComponent({ profile }: { profile: Profile }) {
  return (
    <Box>
      <Box height="150px" />
      <SimpleGrid columns={[1, 2, 3]} spacing={20}>
        {profile.nfts
          .filter((nft) => Boolean(nft.metadata))
          .map((nft, i) => (
            <NFT key={i} {...nft} />
          ))}
      </SimpleGrid>
    </Box>
  );
}

export default ProfileComponent;
