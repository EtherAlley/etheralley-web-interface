import { Box, Flex, Icon, LinkBox, LinkOverlay, Skeleton, Text } from '@chakra-ui/react';
import Paper from '../../../components/Paper';
import NonFungibleTokenComponent from './NonFungibleToken';
import ProfileUser from '../../../icons/ProfileUser';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectAddress, selectENSName, selectInfo, selectLoading, selectPicture, selectStoreAssets } from './../slice';
import { BADGE_WIDTH } from '../../../common/constants';
import Verified from '../../../icons/Verified';
import { FaTwitter } from 'react-icons/fa';

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

  return <NonFungibleTokenComponent index={item.index} useHeader={false} usePaper={false} />;
}

function Info() {
  const ens_name = useAppSelector(selectENSName);
  const address = useAppSelector(selectAddress);
  const loading = useAppSelector(selectLoading);
  const { premium } = useAppSelector(selectStoreAssets);
  const { twitter_handle } = useAppSelector(selectInfo);

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
      <Flex alignItems="center" justifyContent="center">
        <Text fontWeight="bold" isTruncated height={8} mt={2} mr={premium ? 2 : 0} maxWidth="160px">
          {ens_name || address}
        </Text>
        {premium && <Verified width="20px" height="20px" display="inline" />}
      </Flex>
      {twitter_handle && (
        <LinkBox>
          <Flex alignItems="center" justifyContent="center">
            <Text size="md">
              <LinkOverlay href={`https://twitter.com/${twitter_handle}`} isExternal>
                @{twitter_handle}
              </LinkOverlay>
            </Text>
            <Icon as={FaTwitter} w={4} height={4} ml={1} />
          </Flex>
        </LinkBox>
      )}
    </>
  );
}

export default ProfilePicture;
