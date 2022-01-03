import { Search2Icon } from '@chakra-ui/icons';
import { useHistory } from 'react-router';
import Container from '../../components/Container';
import FormInput from '../../components/FormInput';
import Paper from '../../components/Paper';
import { Routes } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectHome, setAddress } from './slice';

function HomePage() {
  const { push } = useHistory();
  const dispatch = useAppDispatch();
  const { address } = useAppSelector(selectHome);
  const search = () => push(Routes.PROFILE.replace(':address', address));
  return (
    <Container>
      <Paper>
        <FormInput
          id="searchbar"
          value={address}
          onChange={(event) => dispatch(setAddress(event.target.value))}
          placeholder="Enter ENS name or Ethereum address..."
          onSubmit={search}
          iconOnClick={search}
          Icon={Search2Icon}
        />
      </Paper>
    </Container>
  );
}

export default HomePage;
