import { Box, Center, Flex, Grid, GridItem, Heading, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { BADGE_HEIGHT, BADGE_WIDTH, StatisticTypes } from '../../../common/constants';
import { BadgeTypes, DisplayItem, Stake, Swap } from '../../../common/types';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Paper from '../../../components/Paper';
import useAppSelector from '../../../hooks/useAppSelector';
import FungibleTokenComponent from './FungibleToken';
import NonFungibleTokenComponent from './NonFungibleToken';
import {
  hideBadge,
  selectCurrency,
  selectFungibleToken,
  selectGroups,
  selectHiddenBadges,
  selectLoading,
  selectNonFungibleToken,
  selectStatistic,
} from './../slice';
import StakeRewards from './StakeRewards';
import Swaps from './Swaps';
import Currency from './Currency';
import Divider from './Divider';
import { useEffect } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';

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
      return <NonFungibleTokenItem index={index} id={id} />;
    case BadgeTypes.FungibleToken:
      return <FungibleTokenItem index={index} />;
    case BadgeTypes.Statistics:
      return <StatisticItem index={index} />;
    case BadgeTypes.Currencies:
      return <CurrencyItem index={index} />;
    default:
      return <></>;
  }
}

function NonFungibleTokenItem({ index, id }: { index: number; id: string }) {
  const nft = useAppSelector((state) => selectNonFungibleToken(state, index));
  const dispatch = useAppDispatch();

  // hide the nft from the group if missing correct data so there is not a visual empty space
  useEffect(() => {
    if (!nft.metadata || !nft.balance || nft.balance === '0') {
      dispatch(hideBadge(id));
    }
  }, [id, nft.metadata, nft.balance, dispatch]);

  // If we fail to load the image, we call hideBadge to visually hide the badge from display
  return <NonFungibleTokenComponent nft={nft} onImageLoadError={() => dispatch(hideBadge(id))} />;
}

function FungibleTokenItem({ index }: { index: number }) {
  const token = useAppSelector((state) => selectFungibleToken(state, index));

  return <FungibleTokenComponent token={token} />;
}

function StatisticItem({ index }: { index: number }) {
  const stat = useAppSelector((state) => selectStatistic(state, index));

  switch (stat.type) {
    case StatisticTypes.SWAP:
      return <Swaps data={stat.data as Swap[] | undefined} contract={stat.contract} />;
    case StatisticTypes.STAKE:
      return <StakeRewards data={stat.data as Stake | undefined} contract={stat.contract} />;
    default:
      return <></>;
  }
}

function CurrencyItem({ index }: { index: number }) {
  const currency = useAppSelector((state) => selectCurrency(state, index));

  return <Currency currency={currency} />;
}

export default Groups;
