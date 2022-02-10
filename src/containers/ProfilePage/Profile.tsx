import { Box, Center, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import { BadgeTypes, FungibleToken, NonFungibleToken, Statistic } from '../../common/types';
import { StatisticTypes } from '../../common/constants';
import Paper from '../../components/Paper';
import FungibleTokenComponent from './FungibleToken';
import NonFungibleTokenComponent from './NonFungibleToken';
import ProfilePicture from './ProfilePicture';
import Swaps from './Swaps';
import { selectProfile } from './slice';
import useAppSelector from '../../hooks/useAppSelector';

function ProfileComponent() {
  const profile = useAppSelector(selectProfile);

  if (!profile) {
    return <></>;
  }

  return (
    <Box>
      <Box height="100px" />
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2} colSpan={1}>
          <ProfilePicture profile={profile} />
        </GridItem>
        <GridItem rowSpan={2} colSpan={4}>
          <Paper py={2} px={4}>
            <Box>
              <Heading size="lg" mb={5}>
                {profile.display_config.header.text}
              </Heading>
              <Heading size="md" mb={5}>
                {profile.display_config.description.text}
              </Heading>
            </Box>
          </Paper>
        </GridItem>
      </Grid>
      {profile.display_config.groups.length > 0 &&
        profile.display_config.groups.map((group, i) => {
          return (
            <Box my={10} key={i}>
              <Heading as="h3" size="lg" mb={10}>
                {group.text}
              </Heading>
              {group.items.length > 0 && (
                <SimpleGrid columns={[1, 2, 3]} spacing={20}>
                  {group.items.map((item, i) => {
                    const asset = profile[item.type][item.id];
                    let gridItem: JSX.Element;
                    switch (item.type) {
                      case BadgeTypes.NonFungibleToken:
                        gridItem = <NonFungibleTokenComponent data={asset as NonFungibleToken} />;
                        break;
                      case BadgeTypes.FungibleToken:
                        gridItem = <FungibleTokenComponent data={asset as FungibleToken} />;
                        break;
                      case BadgeTypes.Statistics:
                        const stat = asset as Statistic;
                        switch (stat.type) {
                          case StatisticTypes.SWAP:
                            gridItem = <Swaps swaps={stat.data} contract={stat.contract} />;
                            break;
                          default:
                            gridItem = <></>;
                            break;
                        }
                        break;
                      default:
                        gridItem = <></>;
                        break;
                    }
                    return <Center key={item.id}>{gridItem}</Center>;
                  })}
                </SimpleGrid>
              )}
            </Box>
          );
        })}
    </Box>
  );
}

export default ProfileComponent;
