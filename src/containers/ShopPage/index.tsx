import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';
import { useEffect } from 'react';
import Settings from '../../common/settings';
import { Listing } from '../../common/types';
import Loading from '../../components/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import Error from '../../components/Error';
import ListingComponent from './Listing';
import { getBalances, getListings, selectErrorLoadingListings, selectListings, selectLoadingListings } from './slice';
import { useIntl } from 'react-intl';

function ShopPage() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingListings);
  const error = useAppSelector(selectErrorLoadingListings);
  const listings = useAppSelector(selectListings);
  const { library, account, chainId } = useEthers();

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  useEffect(() => {
    if (chainId === Settings.STORE_CHAIN_ID) {
      dispatch(getBalances({ library, account }));
    }
  }, [dispatch, account, library, chainId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        message={intl.formatMessage({ id: 'shop-load-error', defaultMessage: 'Error Loading Shop Page' })}
        subtext={intl.formatMessage({
          id: 'shop-load-error-subtext',
          defaultMessage: "We couldn't seem to load the page at this time",
        })}
      />
    );
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

export default ShopPage;
