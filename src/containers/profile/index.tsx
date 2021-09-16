import { useParams } from 'react-router';

function Profile() {
  const { address } = useParams<{ address: string }>();
  return (
    <div>
      <p>Showing profile [{address}]</p>
    </div>
  );
}

export default Profile;
