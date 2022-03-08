import { Table, TableCaption, Thead, Tr, Th, Tbody, Td, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import Link from '../../components/Link';
import Loading from '../../components/Loading';
import Paper from '../../components/Paper';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { getTopProfiles, selectLoadingTopProfiles, selectTopProfiles } from './slice';

function TopProfiles() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingTopProfiles);
  const profiles = useAppSelector(selectTopProfiles);

  useEffect(() => {
    dispatch(getTopProfiles());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper>
      <Table>
        <TableCaption placement="top">
          <Text>{intl.formatMessage({ id: 'top-profiles-caption', defaultMessage: 'Top Profiles' })}</Text>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>
              <Text>{intl.formatMessage({ id: 'top-profiles-rank-column', defaultMessage: 'Rank' })}</Text>
            </Th>
            <Th>
              <Text>{intl.formatMessage({ id: 'top-profiles-address-column', defaultMessage: 'Address' })}</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {profiles.map((profile, i) => {
            const profileId = profile.ens_name || profile.address;
            return (
              <Tr>
                <Td>
                  <Text>{i + 1}</Text>
                </Td>
                <Td>
                  <Link href={`/profiles/${profileId}`}>{profileId}</Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Paper>
  );
}

export default TopProfiles;
