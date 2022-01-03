import { useHistory } from 'react-router';
import Container from '../../components/Container';
import FormInput from '../../components/FormInput';
import Paper from '../../components/Paper';
import { Routes } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectHome, setAddress } from './slice';
import { RiSearchLine } from 'react-icons/ri';

function HomePage() {
  const { push } = useHistory();
  const dispatch = useAppDispatch();
  const { address } = useAppSelector(selectHome);
  const search = () => push(Routes.PROFILE.replace(':address', address));
  return (
    <Container>
      <Paper>
        <form
          onSubmit={() => {
            if (address) search();
          }}
        >
          <FormInput
            id="searchbar"
            variant="filled"
            placeholder="Enter ENS name or Ethereum address..."
            value={address}
            onChange={(event) => dispatch(setAddress(event.target.value))}
            iconProps={{
              'aria-label': 'go to profile',
              tooltip: 'Search',
              Icon: RiSearchLine,
              onClick: search,
              disabled: !address,
            }}
          />
        </form>
      </Paper>
    </Container>
  );
}

export default HomePage;
