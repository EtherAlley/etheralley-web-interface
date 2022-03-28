import { Box, Center, GridItem, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Listing } from '../../common/types';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import ListingComponent from './Listing';
import { getListings, selectListings, selectLoadingListings } from './slice';

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

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <SimpleGrid columns={[1, 2]} spacing={150}>
      {listings.map((listing: Listing) => (
        <GridItem>
          <ListingComponent listing={listing} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
}

export default ShopPageWrapper;
