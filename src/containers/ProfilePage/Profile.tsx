import { Box, SimpleGrid } from '@chakra-ui/react';
import { Profile } from '../../constants';
import NonFungibleToken from './NonFungibleToken';

function ProfileComponent({ profile }: { profile: Profile }) {
  return (
    <Box>
      <Box height="150px" />
      <SimpleGrid columns={[1, 2, 3]} spacing={20}>
        {profile.non_fungible_tokens
          .filter((nft) => Boolean(nft.metadata))
          .map((nft, i) => (
            <NonFungibleToken key={i} {...nft} />
          ))}
      </SimpleGrid>
    </Box>
  );
}

export default ProfileComponent;
