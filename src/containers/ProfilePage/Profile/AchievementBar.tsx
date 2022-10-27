import {
  As,
  Box,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { ReactNode } from 'react';
import { InteractionTypes } from '../../../common/constants';
import Link from '../../../components/Link';
import useAppSelector from '../../../hooks/useAppSelector';
import useEtherscanUrl from '../../../hooks/useEtherscanUrl';
import Handshake from '../../../icons/Handshake';
import Rocket from '../../../icons/Rocket';
import { selectAchievements, selectInteraction, selectStoreAssets } from '../slice';
import EtherAlley from '../../../icons/EtherAlley';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Divider from './Divider';
import { Transaction } from '../../../common/types';

const badgeStyling = {
  justifyContent: 'center',
  alignItems: 'center',
  as: 'button' as As,
  width: '43px',
  height: '43px',
  backgroundColor: 'profile.secondary',
  borderColor: 'profile.secondary',
  borderRadius: '50%',
  boxShadow: 'dark-lg',
  borderWidth: '1px',
};

const iconStyling = {
  width: '25px',
  height: '25px',
};

function AchievementBar() {
  const intl = useIntl();
  const { beta_tester } = useAppSelector(selectStoreAssets);
  const { items, text } = useAppSelector(selectAchievements);
  const textAlign: 'center' | 'left' | undefined = useBreakpointValue({ base: 'center', sm: 'left' });
  const justifyContent = useBreakpointValue({ base: 'center', sm: 'start' });

  if (items.length <= 0 && !beta_tester) {
    return <></>;
  }

  return (
    <Box mt={10}>
      <Heading as="h3" size="lg" mb={5} textAlign={textAlign} textColor="profile.primaryText">
        {text}
      </Heading>
      <Divider mb={5} />
      <Flex p={3} justifyContent={justifyContent}>
        {beta_tester && (
          <Box mr={3} key={0}>
            <ErrorBoundary>
              <AchievementPopover
                trigger={<EtherAlley {...iconStyling} />}
                header={intl.formatMessage({
                  id: 'beta-tester-header',
                  defaultMessage: 'EtherAlley Beta Tester!',
                })}
                body={
                  <Text textColor="profile.secondaryText">
                    {intl.formatMessage({
                      id: 'beta-tester-body',
                      defaultMessage:
                        'This achievement is earned by claiming the Beta Tester token from the Ether Alley store',
                    })}
                  </Text>
                }
              />
            </ErrorBoundary>
          </Box>
        )}
        {items.map(({ index }) => (
          <Box mr={3} key={index + 1}>
            <ErrorBoundary>
              <InteractionAchievement index={index} />
            </ErrorBoundary>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

function InteractionAchievement({ index }: { index: number }) {
  const intl = useIntl();
  const { type, transaction, timestamp } = useAppSelector((state) => selectInteraction(state, index));

  switch (type) {
    case InteractionTypes.CONTRACT_CREATION:
      return (
        <AchievementPopover
          trigger={<Rocket {...iconStyling} />}
          header={intl.formatMessage({
            id: 'deployed-achievement-header',
            defaultMessage: 'Deployed a smart contract!',
          })}
          body={<InteractionPopoverBody transaction={transaction} timestamp={timestamp} />}
        />
      );
    case InteractionTypes.SEND_ETHER:
      return (
        <AchievementPopover
          trigger={<Handshake {...iconStyling} />}
          header={intl.formatMessage({ id: 'sent-ether-achievement-header', defaultMessage: 'Sent Ether!' })}
          body={<InteractionPopoverBody transaction={transaction} timestamp={timestamp} />}
        />
      );
    default:
      return <></>;
  }
}

function InteractionPopoverBody({
  transaction: { blockchain, id },
  timestamp,
}: {
  transaction: Transaction;
  timestamp: number;
}) {
  const intl = useIntl();
  const url = useEtherscanUrl(blockchain, 'tx', id);

  return (
    <>
      <Flex>
        <Text color="profile.secondaryText" fontWeight="semibold">
          {intl.formatMessage({ id: 'interaction-earned', defaultMessage: 'Earned' })}:{' '}
          {intl.formatDate(timestamp * 1000)}
        </Text>
        <Box flexGrow={1} />
        <Link href={url} isExternal color="profile.accent">
          Etherscan
        </Link>
      </Flex>
    </>
  );
}

function AchievementPopover({ trigger, header, body }: { trigger: ReactNode; header: string; body: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex {...badgeStyling}>{trigger}</Flex>
      </PopoverTrigger>
      <PopoverContent backgroundColor="profile.secondary" borderColor="profile.secondary">
        <PopoverArrow />
        <PopoverCloseButton color="profile.accent" />
        <PopoverHeader borderColor="profile.secondaryText">
          <Heading as="h4" size="sm" textColor="profile.secondaryText">
            {header}
          </Heading>
        </PopoverHeader>
        <PopoverBody textColor="profile.secondaryText" fontWeight="semibold">
          {body}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default AchievementBar;
