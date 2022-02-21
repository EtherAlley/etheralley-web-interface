import { Box, Skeleton, Text } from '@chakra-ui/react';
import Paper from '../../components/Paper';
import NonFungibleTokenComponent from './NonFungibleToken';
import ProfileUser from '../../icons/ProfileUser';
import useAppSelector from '../../hooks/useAppSelector';
import { selectAddress, selectENSName, selectLoading, selectPicture } from './slice';
import { BADGE_WIDTH } from '../../common/constants';

function ProfilePicture() {
  return (
    <Paper py={2} px={2} width={BADGE_WIDTH + 20}>
      <Box>
        <Picture />
        <Info />
      </Box>
    </Paper>
  );
}

function Picture() {
  const { item } = useAppSelector(selectPicture);
  const loading = useAppSelector(selectLoading);

  if (loading) {
    return <Skeleton width={BADGE_WIDTH} height={BADGE_WIDTH} />;
  }

  if (!item) {
    return <ProfileUser width={BADGE_WIDTH} height={BADGE_WIDTH} />;
  }

  return <NonFungibleTokenComponent id={item.id} useHeader={false} usePaper={false} />;
}

function Info() {
  const ens_name = useAppSelector(selectENSName);
  const address = useAppSelector(selectAddress);
  const loading = useAppSelector(selectLoading);

  if (loading) {
    return (
      <>
        <Skeleton width={BADGE_WIDTH} height={10} mt={2} />
        <Skeleton width={BADGE_WIDTH} height={10} mt={2} />
      </>
    );
  }

  return (
    <>
      <Text fontWeight="bold" isTruncated textAlign="center" height={8} mt={2}>
        {ens_name}
      </Text>
      <Text textAlign="center" isTruncated height={8} mt={2}>
        {address}
      </Text>
    </>
  );
}

export default ProfilePicture;
