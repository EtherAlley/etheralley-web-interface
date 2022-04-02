import { Box, Center, GridItem, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { Listing } from '../../common/types';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import ListingComponent from './Listing';
import { getBalances, getListings, selectListings, selectLoadingListings } from './slice';

function ShopPageWrapper() {
  return (
    <Center>
      <Box mt="10vh">
        <ShopPage />
      </Box>
    </Center>
  );
}

function ShopPage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingListings);
  const listings = useAppSelector(selectListings);
  const { library, account } = useWeb3React();

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBalances({ library, account }));
  }, [dispatch, account, library]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <SimpleGrid columns={[1, 2]} spacing={150}>
      {listings.map((listing: Listing, i: number) => (
        <GridItem key={i}>
          <ListingComponent listing={listing} index={i} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
}

export default ShopPageWrapper;
