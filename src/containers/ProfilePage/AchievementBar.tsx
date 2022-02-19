import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Link,
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
import { ReactNode } from 'react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { InteractionTypes } from '../../common/constants';
import useAppSelector from '../../hooks/useAppSelector';
import useEtherscanUrl from '../../hooks/useEtherscanUrl';
import Rocket from '../../icons/Rocket';
import Trophy from '../../icons/Trophy';
import { selectDisplayConfig, selectInteraction } from './slice';

function AchievementBar() {
  const { achievements } = useAppSelector(selectDisplayConfig);
  const textAlign: any = useBreakpointValue({ base: 'center', sm: 'left' });
  const justifyContent: any = useBreakpointValue({ base: 'center', sm: 'start' });

  if (achievements.length <= 0) {
    return <></>;
  }

  return (
    <Box mt={10}>
      <Heading as="h3" size="lg" mb={5} textAlign={textAlign}>
        Achievements
      </Heading>
      <Divider />
      <Flex p={3} justifyContent={justifyContent}>
        {achievements.map(({ id }) => (
          <Box mr={3} key={id}>
            <Achievement id={id} />
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
  backgroundColor: 'gray.800',
  borderColor: 'gray.900',
  borderRadius: '50%',
  boxShadow: 'dark-lg',
  borderWidth: '1px',
};

const iconStyling = {
  width: '25px',
  height: '25px',
};

function Achievement({ id }: { id: number }) {
  const { type } = useAppSelector((state) => selectInteraction(state, id));

  switch (type) {
    case InteractionTypes.CONTRACT_CREATION:
      return (
        <AchievementPopover
          trigger={<Rocket {...iconStyling} />}
          header={<AchievementHeader text="Deployed a Smart Contract!" />}
          body={<AchievementBody id={id} />}
        />
      );
    case InteractionTypes.SEND_ETHER:
      return (
        <AchievementPopover
          trigger={<Trophy {...iconStyling} />}
          header={<AchievementHeader text="Sent Ether!" />}
          body={<AchievementBody id={id} />}
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

function AchievementBody({ id }: { id: number }) {
  const { transaction, timestamp } = useAppSelector((state) => selectInteraction(state, id));
  const url = useEtherscanUrl(transaction.blockchain, 'tx', transaction.id);

  return (
    <>
      <Text>Timestamp: {timestamp}</Text>
      <Link color="blue.500" href={url} isExternal>
        Etherscan <Icon as={RiExternalLinkLine}></Icon>
      </Link>
      <Text>Blockchain: {transaction.blockchain}</Text>
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
