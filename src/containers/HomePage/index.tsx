import { useNavigate } from 'react-router';
import Input from '../../components/Input';
import Paper from '../../components/Paper';
import { Routes } from '../../common/constants';
import { selectHome, setAddress } from './slice';
import { MdSearch } from 'react-icons/md';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { Box, Text } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

function HomePage() {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { address } = useAppSelector(selectHome);
  const search = () => navigate(Routes.PROFILE.replace(':address', address));

  return (
    <Box mt="10vh">
      <Text
        bgGradient="linear(to-l, #FFF, #1dc9a2)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
        textAlign="center"
      >
        {intl.formatMessage({ id: 'welcome-message', defaultMessage: 'Welcome to {name}' }, { name: 'EtherAlley' })}
      </Text>
      <Paper mt={5} mb={20}>
        <form
          onSubmit={() => {
            if (address) {
              search();
            }
          }}
        >
          <Input
            id="searchbar"
            size="lg"
            variant="filled"
            placeholder={intl.formatMessage(
              {
                id: 'enter-wallet-address',
                defaultMessage: 'Enter {ensname} or {ethereum} address...',
              },
              { ensname: 'ENS name', ethereum: 'Ethereum' }
            )}
            value={address}
            onChange={(event) => dispatch(setAddress(event.target.value))}
            iconProps={{
              'aria-label': intl.formatMessage({ id: 'search-aria-label', defaultMessage: 'Go to a profile' }),
              tooltip: 'Search',
              Icon: MdSearch,
              onClick: search,
              disabled: !address,
            }}
          />
        </form>
      </Paper>
    </Box>
  );
}

export default HomePage;
