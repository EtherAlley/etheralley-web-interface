import { Box, Text } from '@chakra-ui/react';
import { BadgeTypes, DisplayItem, NonFungibleToken, Profile } from '../../api/types';
import Paper from '../../components/Paper';
import NonFungibleTokenComponent from './NonFungibleToken';
import ProfileUser from '../../svgs/ProfileUser';

function ProfilePictureComponent({
  profile: {
    display_config: {
      picture: { item },
    },
    non_fungible_tokens,
    ens_name,
  },
}: {
  profile: Profile;
}) {
  return (
    <Paper py={2} px={4}>
      <Box>
        <Picture item={item} non_fungible_tokens={non_fungible_tokens} />
        <Text fontWeight="bold" textAlign="center" mt={3}>
          {ens_name}
        </Text>
      </Box>
    </Paper>
  );
}

function Picture({
  item,
  non_fungible_tokens,
}: {
  item: DisplayItem | undefined;
  non_fungible_tokens: NonFungibleToken[];
}) {
  if (!item || item.type !== BadgeTypes.NonFungibleToken || item.id < 0 || item.id >= non_fungible_tokens.length) {
    return <ProfileUser width="165px" height="165px" />;
  }

  const nft = non_fungible_tokens[item.id];

  return <NonFungibleTokenComponent data={nft} usePaper={false} useHeader={false} />;
}

export default ProfilePictureComponent;
