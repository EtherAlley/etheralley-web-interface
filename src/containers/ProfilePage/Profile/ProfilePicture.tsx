import { Flex, Icon, LinkBox, LinkOverlay, Skeleton, Text } from '@chakra-ui/react';
import Paper from './Paper';
import NonFungibleTokenComponent from './NonFungibleToken';
import ProfileUser from '../../../icons/ProfileUser';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectAddress, selectENSName, selectInfo, selectLoading, selectPicture, selectStoreAssets } from './../slice';
import { BADGE_WIDTH } from '../../../common/constants';
import Verified from '../../../icons/Verified';
import { FaTwitter } from 'react-icons/fa';
import useTrimmedString from '../../../hooks/useTrimmedString';

function ProfilePicture() {
  return (
    <Paper p={2}>
      <>
        <Picture />
        <Info />
      </>
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
    return (
      <Flex justifyContent="center" alignItems="center" p={4}>
        <ProfileUser width={BADGE_WIDTH - 32} height={BADGE_WIDTH - 32} />
      </Flex>
    );
  }

  return <NonFungibleTokenComponent id={item.id} index={item.index} useHeader={false} usePaper={false} />;
}

function Info() {
  const ens_name = useAppSelector(selectENSName);
  const address = useAppSelector(selectAddress);
  const loading = useAppSelector(selectLoading);
  const { premium } = useAppSelector(selectStoreAssets);
  const { twitter_handle } = useAppSelector(selectInfo);
  const trimmedAddress = useTrimmedString(address);

  if (loading) {
    return <Skeleton width={BADGE_WIDTH} height={8} mt={2} />;
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="center" height={8} mt={2}>
        <Text fontWeight="bold" noOfLines={1} mr={premium ? 2 : 0} maxWidth="160px" textColor="profile.secondaryText">
          {ens_name || trimmedAddress}
        </Text>
        {premium && <Verified width="20px" height="20px" display="inline" />}
      </Flex>
      {twitter_handle && (
        <LinkBox>
          <Flex alignItems="center" justifyContent="center" mt={2}>
            <Text fontWeight="semibold" size="md" textColor="profile.secondaryText">
              <LinkOverlay href={`https://twitter.com/${twitter_handle}`} isExternal>
                @{twitter_handle}
              </LinkOverlay>
            </Text>
            <Icon color="profile.secondaryText" as={FaTwitter} w={4} height={4} ml={1} />
          </Flex>
        </LinkBox>
      )}
    </>
  );
}

export default ProfilePicture;
