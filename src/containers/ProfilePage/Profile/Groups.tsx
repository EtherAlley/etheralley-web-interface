import { Box, Center, Grid, GridItem, Heading, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../../common/constants';
import { BadgeTypes, DisplayItem } from '../../../common/types';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Paper from '../../../components/Paper';
import useAppSelector from '../../../hooks/useAppSelector';
import FungibleTokenComponent from './FungibleToken';
import NonFungibleTokenComponent from './NonFungibleToken';
import { selectGroups, selectLoading } from './../slice';
import Statistic from './Statistic';
import Currency from './Currency';
import Divider from './Divider';

function Groups() {
  const groups = useAppSelector(selectGroups);
  const loading = useAppSelector(selectLoading);

  // rendering a group with hard coded items to show a loading skeleton
  if (loading) {
    return (
      <Box mt={20}>
        <Group
          text=""
          items={[
            {
              id: nanoid(),
              index: 0,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 1,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 2,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 3,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 4,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 5,
              type: BadgeTypes.FungibleToken,
            },
          ]}
        />
      </Box>
    );
  }

  return (
    <>
      {groups.length > 0 &&
        groups.map(({ text, items }, i) => {
          return (
            <Box mt={20} key={i}>
              <Group text={text} items={items} />
            </Box>
          );
        })}
    </>
  );
}

function Group({ text, items }: { text: string; items: DisplayItem[] }) {
  return (
    <>
      <GroupTitle text={text} />
      <Divider mb={10} />
      {items.length > 0 && (
        <Grid
          templateColumns={[`repeat(1, 100%)`, `repeat(2, ${BADGE_WIDTH}px)`, `repeat(3, ${BADGE_WIDTH}px)`]}
          justifyContent="space-between"
          gap={20}
        >
          {items.map(({ type, index, id }) => {
            return (
              <GridItem key={id}>
                <Center>
                  <ErrorBoundary>
                    <GroupItem type={type} index={index} />
                  </ErrorBoundary>
                </Center>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </>
  );
}

function GroupTitle({ text }: { text: string }) {
  const textAlign: any = useBreakpointValue({ base: 'center', sm: 'left' });

  return (
    <Heading textColor="profile.primaryText" as="h3" size="lg" mb={10} isTruncated textAlign={textAlign}>
      {text}
    </Heading>
  );
}

function GroupItem({ type, index }: { type: BadgeTypes | undefined; index: number }) {
  const loading = useAppSelector(selectLoading);

  if (loading) {
    return (
      <Paper width={BADGE_WIDTH} height={BADGE_HEIGHT}>
        <Skeleton width={BADGE_WIDTH} height={BADGE_HEIGHT} />
      </Paper>
    );
  }

  switch (type) {
    case BadgeTypes.NonFungibleToken:
      return <NonFungibleTokenComponent index={index} />;
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
