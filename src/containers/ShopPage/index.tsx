import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Listing } from '../../common/types';
import Loading from '../../components/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import Error from '../../components/Error';
import ListingComponent from './Listing';
import {
  getBalances,
  getListings,
  selectErrorLoadingListings,
  selectFulfilledListings,
  selectListings,
  selectLoadingListings,
} from './slice';
import { useIntl } from 'react-intl';
import { useContract, useAccount, useProvider } from 'wagmi';
import Settings from '../../common/settings';
import EtherAlleyStoreAbi from '../../abi/EtherAlleyStore';

function ShopPage() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingListings);
  const loaded = useAppSelector(selectFulfilledListings);
  const error = useAppSelector(selectErrorLoadingListings);
  const listings = useAppSelector(selectListings);
  const { address } = useAccount();
  const provider = useProvider();
  const contract = useContract({
    address: Settings.STORE_ADDRESS,
    abi: EtherAlleyStoreAbi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    if (!loaded && contract) {
      dispatch(getListings({ contract }));
    }
  }, [dispatch, loaded, contract]);

  useEffect(() => {
    if (address && contract) {
      dispatch(getBalances({ contract, address }));
    }
  }, [dispatch, contract, address]);

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
