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
import { selectAchievements, selectInteraction } from '../slice';

function AchievementBar() {
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
        {items.map(({ index }) => (
          <Box mr={3} key={index}>
            <Achievement index={index} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

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

function Achievement({ index }: { index: number }) {
  const intl = useIntl();
  const { type } = useAppSelector((state) => selectInteraction(state, index));

  switch (type) {
    case InteractionTypes.CONTRACT_CREATION:
      return (
        <AchievementPopover
          trigger={<Rocket {...iconStyling} />}
          header={
            <AchievementHeader
              text={intl.formatMessage({
                id: 'deployed-achievement-header',
                defaultMessage: 'Deployed a smart contract!',
              })}
            />
          }
          body={<AchievementBody index={index} />}
        />
      );
    case InteractionTypes.SEND_ETHER:
      return (
        <AchievementPopover
          trigger={<Handshake {...iconStyling} />}
          header={
            <AchievementHeader
              text={intl.formatMessage({ id: 'sent-ether-achievement-header', defaultMessage: 'Sent Ether!' })}
            />
          }
          body={<AchievementBody index={index} />}
        />
      );
    default:
      return <></>;
  }
}

function AchievementHeader({ text }: { text: string }) {
  return (
    <Heading as="h4" size="md">
      {text}
    </Heading>
  );
}

function AchievementBody({ index }: { index: number }) {
  const { transaction, timestamp } = useAppSelector((state) => selectInteraction(state, index));
  const url = useEtherscanUrl(transaction.blockchain, 'tx', transaction.id);

  return (
    <>
      <Text>Timestamp: {timestamp}</Text>
      <Link href={url} isExternal>
        Etherscan
      </Link>
    </>
  );
}

function AchievementPopover({ trigger, header, body }: { trigger: ReactNode; header: ReactNode; body: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex {...badgeStyling}>{trigger}</Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{header}</PopoverHeader>
        <PopoverBody>{body}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default AchievementBar;
