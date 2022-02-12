import { Box, Text } from '@chakra-ui/react';
import Paper from '../../components/Paper';
import NonFungibleTokenComponent from './NonFungibleToken';
import ProfileUser from '../../svgs/ProfileUser';
import useAppSelector from '../../hooks/useAppSelector';
import { selectDisplayConfig, selectENSName } from './slice';

function ProfilePicture() {
  const ens_name = useAppSelector(selectENSName);
  return (
    <Paper py={2} px={4}>
      <Box>
        <Picture />
        <Text fontWeight="bold" textAlign="center" mt={1}>
          {ens_name}
        </Text>
      </Box>
    </Paper>
  );
}

function Picture() {
  const {
    picture: { item },
  } = useAppSelector(selectDisplayConfig);

  if (!item) {
    return <ProfileUser width="165px" height="165px" />;
  }

  return <NonFungibleTokenComponent id={item.id} useHeader={false} usePaper={false} />;
}

export default ProfilePicture;
