import { Heading, VStack, Text, Image, Divider, Box, Flex } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

function AboutPage() {
  const intl = useIntl();
  return (
    <Box>
      <Flex justifyContent="center">
        <VStack width={200}>
          <Image src="https://avatars.githubusercontent.com/u/9041078?v=4" w={200} h={200} borderRadius="50%" />
          <Text textAlign="center">Evan Fleming</Text>
          <Text textAlign="center">Founder, EtherAlley</Text>
        </VStack>
      </Flex>
      <VStack spacing="5" alignItems="flex-start" mt={10} mb={10}>
        <Heading as="h2">
          {intl.formatMessage({ id: 'what-is-etheralley-header', defaultMessage: `What is EtherAlley?` })}
        </Heading>
        <Text as="p" fontSize="lg" color="gray.300">
          {intl.formatMessage({
            id: 'what-is-etheralley-text-1',
            defaultMessage: `As it stands today, there is an incredible amount of interesting interactions for users to have within the
          Ethereum ecosystem. You can send and receive tokenized assets from your wallet, exchange them on a
          decentralized exchange, use them to purchase the representation of physical assets, participate in governance
          of projects you have interest in, stake your assets to earn rewards, and so much more.`,
          })}
        </Text>
        <Text as="p" fontSize="lg" color="gray.300">
          {intl.formatMessage({
            id: 'what-is-etheralley-text-2',
            defaultMessage: `Where there seems to be a gap, is in the ability to showcase these awesome interactions. That is, the ability
          to show that you've interacted with and participated in many of these interesting technologies. EtherAlley is
          an attempt to solve this problem, by giving users the ability to showcase their blockchain persona in a way
          that's unique to them.`,
          })}
        </Text>
        <Divider h={5} />
        <Heading as="h2" mb={5}>
          {intl.formatMessage({ id: 'how-does-it-work-header', defaultMessage: `How does it work?` })}
        </Heading>
        <Text as="p" fontSize="lg" color="gray.300">
          {intl.formatMessage({
            id: 'how-does-it-work-text',
            defaultMessage: `EtherAlley gives you full control over what parts of your blockchain activity you want to display and in what
          way you want to display them. Simply connect to your wallet in the top right corner of the screen and then
          navigate to your profile to access the edit button. From there, the world is your oyster. Are you an NFT
          collector and only want to display your most prized possessions? Are you a defi power user and want to show of
          your best swaps? Do you have an eye for colors and want to come up with the perfect color palette to describe
          you? Every customization is a click away`,
          })}
        </Text>
        <Divider h={5} />
        <Heading as="h2" mb={5}>
          {intl.formatMessage({
            id: 'customize-colors-header',
            defaultMessage: `Completely customize your profile colors`,
          })}
        </Heading>
        <Text as="p" fontSize="lg" color="gray.300">
          {intl.formatMessage({
            id: 'customize-colors-text',
            defaultMessage: `Every color that appears on your profile can be customized to suit your style`,
          })}
        </Text>
        <Image src="/gifs/customization_1.gif" />
        <Divider h={5} />
        <Heading as="h2" mb={5}>
          {intl.formatMessage({
            id: 'display-assets-header',
            defaultMessage: `Display the assets and interactions that you want`,
          })}
        </Heading>
        <Text as="p" fontSize="lg" color="gray.300">
          {intl.formatMessage({
            id: 'display-assets-text',
            defaultMessage: `You can add NFTs, ERC20 tokens, native currencies and select stats to your profile. Every asset that appears
          on your profile can be added, removed, grouped, and ordered in whatever way suits you.`,
          })}
        </Text>
        <Image src="/gifs/customization_2.gif" />
        <Divider h={5} />
        <Heading as="h2" mb={5}>
          {intl.formatMessage({
            id: 'claim-achievements-header',
            defaultMessage: `Claim achievements for interacting with the blockchain`,
          })}
        </Heading>
        <Text as="p" fontSize="lg" color="gray.300">
          {intl.formatMessage({
            id: 'claim-achievements-text',
            defaultMessage: `You can claim achievements for certain interactions you have with the blockchain. Sending ether, deploying a
          smart contract, being a beta tester and much more.`,
          })}
        </Text>
        <Image src="/gifs/customization_3.gif" />
      </VStack>
    </Box>
  );
}

export default AboutPage;
