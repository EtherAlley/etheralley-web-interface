import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { BADGE_HEIGHT, BADGE_WIDTH, Interfaces } from '../../../common/constants';
import { Contract, Stake } from '../../../common/types';
import useAppSelector from '../../../hooks/useAppSelector';
import useDisplayNumber from '../../../hooks/useDisplayNumber';
import useLogo from '../../../hooks/useLogo';
import { selectStatistic } from '../slice';
import Badge from './Badge';
import BlockchainChip from './BlockchainChip';

function StakeRewards({ index }: { index: number }) {
  const stat = useAppSelector((state) => selectStatistic(state, index));
  const data = stat.data as Stake | undefined;
  const contract = stat.contract;

  return (
    <Badge
      width={BADGE_WIDTH}
      height={BADGE_HEIGHT}
      Display={<StakeDisplay stake={data} contract={contract} />}
      DialogHeader={<StakeHeader />}
      DialogBody={<StakeBody stake={data} contract={contract} />}
    />
  );
}

const logoStyling = {
  width: 90,
  height: 90,
  backgroundColor: 'gray.900',
  borderColor: 'gray.900',
  borderRadius: '50%',
  boxShadow: 'dark-lg',
  borderWidth: '1px',
};

function StakeDisplay({ stake, contract }: { stake: Stake | undefined; contract: Contract }) {
  const intl = useIntl();
  const url = useLogo({ interfaceName: contract.interface });
  const displayBalance = useDisplayNumber(stake?.total_rewards, 18);

  let title: string = '';
  switch (contract.interface) {
    case Interfaces.ROCKET_POOL:
      title = intl.formatMessage({ id: 'rocketpool', defaultMessage: 'Rocket Pool' });
      break;
  }

  let symbol: string = '';
  switch (contract.interface) {
    case Interfaces.ROCKET_POOL:
      symbol = 'RETH';
      break;
  }

  return (
    <Box maxWidth="100%" maxHeight="100%">
      <Flex justifyContent="center" mb={3}>
        <Image alt={contract.interface} src={url} {...logoStyling} />
      </Flex>
      <Heading as="h4" size="md" mt={2}>
        {title}
      </Heading>
      <BlockchainChip text={`${displayBalance} ${symbol}`} blockchain={contract.blockchain} />
    </Box>
  );
}

function StakeHeader() {
  const intl = useIntl();

  return <Text>{intl.formatMessage({ id: 'stake-rewards', defaultMessage: 'Stake Rewards' })}</Text>;
}

function StakeBody({ stake, contract }: { stake: Stake | undefined; contract: Contract }) {
  if (!stake) {
    return <></>;
  }

  return <></>;
}

export default StakeRewards;