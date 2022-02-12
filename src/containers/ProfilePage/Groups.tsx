import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../common/constants';
import { BadgeTypes, DisplayItem } from '../../common/types';
import ErrorBoundary from '../../components/ErrorBoundary';
import useAppSelector from '../../hooks/useAppSelector';
import FungibleTokenComponent from './FungibleToken';
import NonFungibleTokenComponent from './NonFungibleToken';
import { selectDisplayConfig } from './slice';
import Statistic from './Statistic';

function Groups() {
  const { groups } = useAppSelector(selectDisplayConfig);
  return (
    <Box>
      {groups.length > 0 &&
        groups.map(({ text, items }, i) => {
          return (
            <Box my={10} key={i}>
              <Group text={text} items={items} />
            </Box>
          );
        })}
    </Box>
  );
}

function Group({ text, items }: { text: string; items: DisplayItem[] }) {
  return (
    <>
      <Heading as="h3" size="lg" mb={10}>
        {text}
      </Heading>
      {items.length > 0 && (
        <SimpleGrid columns={[1, 2, 3]} spacing={20}>
          {items.map(({ type, id }, i) => {
            return (
              <Center key={id}>
                <ErrorBoundary message="Something went wrong" width={BADGE_WIDTH} height={BADGE_HEIGHT}>
                  <GroupItem type={type} id={id} />
                </ErrorBoundary>
              </Center>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
}

function GroupItem({ type, id }: { type: BadgeTypes; id: number }) {
  switch (type) {
    case BadgeTypes.NonFungibleToken:
      return <NonFungibleTokenComponent id={id} />;
    case BadgeTypes.FungibleToken:
      return <FungibleTokenComponent id={id} />;
    case BadgeTypes.Statistics:
      return <Statistic id={id} />;
    default:
      return <></>;
  }
}

export default Groups;
