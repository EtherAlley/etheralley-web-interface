import { Box, Center, Flex, Grid, GridItem, Heading, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../../common/constants';
import { BadgeTypes, DisplayItem } from '../../../common/types';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Paper from '../../../components/Paper';
import useAppSelector from '../../../hooks/useAppSelector';
import FungibleTokenComponent from './FungibleToken';
import NonFungibleTokenComponent from './NonFungibleToken';
import { selectGroups, selectHiddenBadges, selectLoading } from './../slice';
import Statistic from './Statistic';
import Currency from './Currency';
import Divider from './Divider';

function Groups() {
  const groups = useAppSelector(selectGroups);

  return (
    <>
      {groups.length > 0 &&
        groups.map(({ text, items }, i) => {
          return <Group text={text} items={items} key={i} />;
        })}
    </>
  );
}

function Group({ text, items }: { text: string; items: DisplayItem[] }) {
  const hiddenBadges = useAppSelector(selectHiddenBadges);

  return (
    <Box mt={20}>
      <GroupTitle text={text} />
      <Divider mb={10} />
      {items.length > 0 && (
        <Grid
          templateColumns={[`repeat(1, 100%)`, `repeat(2, ${BADGE_WIDTH}px)`, `repeat(3, ${BADGE_WIDTH}px)`]}
          justifyContent="space-between"
          gap={20}
        >
          {items
            .filter(({ id }) => !hiddenBadges[id])
            .map(({ type, index, id }) => {
              return (
                <GridItem key={id}>
                  <Center>
                    <ErrorBoundary>
                      <GroupItem type={type} index={index} id={id} />
                    </ErrorBoundary>
                  </Center>
                </GridItem>
              );
            })}
        </Grid>
      )}
    </Box>
  );
}

function GroupTitle({ text }: { text: string }) {
  const textAlign: 'center' | 'left' | undefined = useBreakpointValue({ base: 'center', sm: 'left' });

  return (
    <Heading textColor="profile.primaryText" as="h3" size="lg" mb={10} noOfLines={1} textAlign={textAlign}>
      {text}
    </Heading>
  );
}

function GroupItem({ type, index, id }: { type: BadgeTypes | undefined; index: number; id: string }) {
  const loading = useAppSelector(selectLoading);

  if (loading) {
    return (
      <Paper>
        <Flex width={BADGE_WIDTH} height={BADGE_HEIGHT} justifyContent="center" alignItems="center">
          <Skeleton width={BADGE_WIDTH - 30} height={BADGE_HEIGHT - 30} />
        </Flex>
      </Paper>
    );
  }

  switch (type) {
    case BadgeTypes.NonFungibleToken:
      return <NonFungibleTokenComponent index={index} id={id} />;
    case BadgeTypes.FungibleToken:
      return <FungibleTokenComponent index={index} />;
    case BadgeTypes.Statistics:
      return <Statistic index={index} />;
    case BadgeTypes.Currencies:
      return <Currency index={index} />;
    default:
      return <></>;
  }
}

export default Groups;
