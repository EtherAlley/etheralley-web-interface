import { useHistory } from 'react-router';
import Container from '../../components/Container';
import FormInput from '../../components/FormInput';
import Paper from '../../components/Paper';
import { Routes } from '../../common/constants';
import { selectHome, setAddress } from './slice';
import { RiSearchLine } from 'react-icons/ri';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { Text } from '@chakra-ui/react';

function HomePage() {
  const { push } = useHistory();
  const dispatch = useAppDispatch();
  const { address } = useAppSelector(selectHome);
  const search = () => push(Routes.PROFILE.replace(':address', address));
  return (
    <>
      <Container>
        <>
          <Text
            bgGradient="linear(to-l, #FFF, #1dc9a2)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
            textAlign="center"
          >
            Welcome to Ether Alley
          </Text>
          <Paper mt={5}>
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
        </>
      </Container>
    </>
  );
}

export default HomePage;
