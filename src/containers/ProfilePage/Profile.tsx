import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { Profile } from '../../api/types';
import FungibleToken from './FungibleToken';
import NonFungibleToken from './NonFungibleToken';

function ProfileComponent({ profile }: { profile: Profile }) {
  return (
    <Box>
      <Box height="150px" />
      <Box mb={10}>
        <Heading as="h3" size="lg" mb={5}>
          NFTs
        </Heading>
        {profile.non_fungible_tokens && profile.non_fungible_tokens.length > 0 && (
          <SimpleGrid columns={[1, 2, 3]} spacing={20}>
            {profile.non_fungible_tokens.map((nft, i) => (
              <NonFungibleToken key={i} {...nft} />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <Box mb={10}>
        <Heading as="h3" size="lg" mb={5}>
          Tokens
        </Heading>
        {profile.fungible_tokens && profile.fungible_tokens.length > 0 && (
          <SimpleGrid columns={[1, 2, 3]} spacing={20}>
            {profile.fungible_tokens.map((token, i) => (
              <FungibleToken key={i} {...token} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

export default ProfileComponent;
