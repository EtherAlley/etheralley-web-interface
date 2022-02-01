import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { Profile } from '../../api/types';
import { StatisticTypes } from '../../common/constants';
import FungibleToken from './FungibleToken';
import NonFungibleToken from './NonFungibleToken';
import Swaps from './Swaps';

// const display = {
//   header: { text: 'My Profile' },
//   description: { text: 'My Description is very long and goes here.' },
//   profile: {
//     picture: {
//       location: 2,
//     },
//     ensName: {
//       location: 7,
//     },
//   },
//   groups: [{}, {}],
// };

function ProfileComponent({ profile }: { profile: Profile }) {
  return (
    <Box>
      <Box height="100px" />
      {/* <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={1}>
          <Paper py={2} px={4}>
            <Box>
              <Image
                height={200}
                width={200}
                src={profile.non_fungible_tokens[display.profile.picture.location].metadata.image}
                borderRadius={8}
              />
              <Text fontWeight="bold" textAlign="center" mt={3}>
                {profile.non_fungible_tokens[display.profile.ensName.location].metadata.name}
              </Text>
            </Box>
          </Paper>
        </GridItem>
        <GridItem rowSpan={2} colSpan={4}>
          <Paper py={2} px={4}>
            <Box>
              <Heading size="lg" mb={5}>
                {display.header.text}
              </Heading>
              <Heading size="md" mb={5}>
                {display.description.text}
              </Heading>
            </Box>
          </Paper>
        </GridItem>
      </Grid> */}
      <Box my={10}>
        <Heading as="h3" size="lg" mb={5}>
          Stats
        </Heading>
        {profile.statistics && profile.statistics.length > 0 && (
          <SimpleGrid columns={[1, 2, 3]} spacing={20}>
            {profile.statistics
              .filter((stat) => stat.type === StatisticTypes.SWAP)
              .map((stats, i) => (
                <Swaps key={i} swaps={stats.data} contract={stats.contract} />
              ))}
          </SimpleGrid>
        )}
      </Box>
      <Box my={10}>
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
      <Box my={10}>
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
