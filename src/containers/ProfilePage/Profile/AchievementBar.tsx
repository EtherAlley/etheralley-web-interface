import {
  Box,
  Divider,
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
import Logo from '../../../icons/Logo';
import ErrorBoundary from '../../../components/ErrorBoundary';

const badgeStyling: any = {
  justifyContent: 'center',
  alignItems: 'center',
  as: 'button',
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
  const textAlign: any = useBreakpointValue({ base: 'center', sm: 'left' });
  const justifyContent: any = useBreakpointValue({ base: 'center', sm: 'start' });

  if (items.length <= 0) {
    return <></>;
  }

  return (
    <Box mt={10}>
      <Heading as="h3" size="lg" mb={5} textAlign={textAlign}>
        {text}
      </Heading>
      <Divider />
      <Flex p={3} justifyContent={justifyContent}>
        {beta_tester && (
          <Box mr={3} key={0}>
            <ErrorBoundary>
              <AchievementPopover
                trigger={<Logo {...iconStyling} />}
                header={intl.formatMessage({
                  id: 'beta-tester',
                  defaultMessage: 'Participated in the Ether Alley Beta!',
                })}
                body={intl.formatMessage({
                  id: 'beta-tester',
                  defaultMessage:
                    'This achievement is earned by claiming the Beta Tester token from the Ether Alley store',
                })}
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
  const url = useEtherscanUrl(transaction.blockchain, 'tx', transaction.id);

  switch (type) {
    case InteractionTypes.CONTRACT_CREATION:
      return (
        <AchievementPopover
          trigger={<Rocket {...iconStyling} />}
          header={intl.formatMessage({
            id: 'deployed-achievement-header',
            defaultMessage: 'Deployed a smart contract!',
          })}
          body={
            <>
              <Text>Timestamp: {timestamp}</Text>
              <Link href={url} isExternal>
                Etherscan
              </Link>
            </>
          }
        />
      );
    case InteractionTypes.SEND_ETHER:
      return (
        <AchievementPopover
          trigger={<Handshake {...iconStyling} />}
          header={intl.formatMessage({ id: 'sent-ether-achievement-header', defaultMessage: 'Sent Ether!' })}
          body={
            <>
              <Text>Timestamp: {timestamp}</Text>
              <Link href={url} isExternal>
                Etherscan
              </Link>
            </>
          }
        />
      );
    default:
      return <></>;
  }
}

function AchievementPopover({ trigger, header, body }: { trigger: ReactNode; header: string; body: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex {...badgeStyling}>{trigger}</Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading as="h4" size="sm">
            {header}
          </Heading>
        </PopoverHeader>
        <PopoverBody>{body}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default AchievementBar;
