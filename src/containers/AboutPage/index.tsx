import { Heading, VStack, Text, Image, Divider, Box, Flex, LinkOverlay, LinkBox } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

function AboutPage() {
  const intl = useIntl();
  return (
    <Box>
      <Flex justifyContent="center">
        <LinkBox as={RouterLink} to={`/profiles/oldmanfleming.eth`}>
          <VStack width={200}>
            <LinkOverlay as="span">
              <Image src="https://avatars.githubusercontent.com/u/9041078?v=4" w={200} h={200} borderRadius="50%" />
            </LinkOverlay>
            <Text textAlign="center">Evan Fleming</Text>
            <Text textAlign="center">Founder, EtherAlley</Text>
          </VStack>
        </LinkBox>
      </Flex>
      <VStack spacing="5" alignItems="flex-start" mt={10} mb={10}>
        <Heading as="h2">
          {intl.formatMessage({ id: 'what-is-etheralley-header', defaultMessage: `What is EtherAlley?` })}
        </Heading>
        <Text as="p" fontSize="lg" color="gray.300">
          {intl.formatMessage({
            id: 'what-is-etheralley-text-1',
            defaultMessage: `One of the biggest problems I personally find with the blockchain space today is the ability to actually show off all the cool interactions that I have on the blockchain. 
            You can do things like send, receive, swap and lend tokenized assets. 
            Participate in governance of your favorite organizations. 
            Stake your assets to earn rewards, and so much more. 
            But after having done all these things, you don't really have a space to show off that you've done them in an interesting way. 
            EtherAlley is an attempt to improve on this problem by allowing you to build a completely customized profile showing off the favorite pieces of your blockchain persona.`,
          })}
        </Text>
        <Divider h={5} />
        <Heading as="h2" mb={5}>
          {intl.formatMessage({ id: 'how-does-it-work-header', defaultMessage: `How does it work?` })}
        </Heading>
        <Text as="p" fontSize="lg" color="gray.300">
          {intl.formatMessage({
            id: 'how-does-it-work-text',
            defaultMessage: `Simply connect to your wallet in the top right corner of the screen and then navigate to your profile to access the edit button. 
            From there you are in complete control over everything to do with your profile. 
            What colors are used. 
            What NFT is your profile picture. 
            What tokens, NFTs and stats you want to show on your profile, and so much more. `,
          })}
        </Text>
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
        <Image src="/gifs/add-reorder-token.gif" />
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
        <Image src="/gifs/change-colors.gif" />
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
        <Image src="/gifs/add-achievement.gif" />
      </VStack>
    </Box>
  );
}

export default AboutPage;
