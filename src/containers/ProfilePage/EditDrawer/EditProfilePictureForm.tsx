import { Button, Flex } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { openProfilePictureModal } from '../ModalForms/slice';
import { selectPicture } from '../slice';

function EditProfilePictureForm() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const picture = useAppSelector(selectPicture);

  return (
    <Flex my={5}>
      <Button
        id="set-profile-picture"
        onClick={() => dispatch(openProfilePictureModal())}
        colorScheme="brand"
        variant="outline"
      >
        {picture
          ? intl.formatMessage({ id: 'change-profile-picture', defaultMessage: 'Change Profile Picture' })
          : intl.formatMessage({ id: 'add-profile-picture', defaultMessage: 'Add Profile Picture' })}
      </Button>
    </Flex>
  );
}

export default EditProfilePictureForm;
