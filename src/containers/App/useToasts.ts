import { useToast } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import { Toasts } from '../../common/constants';
import useAppSelector from '../../hooks/useAppSelector';
import { selectApp } from './slice';

// we only expect this hook to be called in one place in the app
// it is also coupled to the state of the slice in this folder
// so I don't see the point of moving it into the hooks folder.
function useToasts() {
  const intl = useIntl();
  const { toastId, toast, status } = useAppSelector(selectApp);
  const showToast = useToast();

  useEffect(() => {
    if (toastId) {
      let description = '';
      switch (toast) {
        case Toasts.ADDING_BADGE:
          description = intl.formatMessage({ id: 'adding-badge-description', defaultMessage: 'Error adding badge' });
          break;
        case Toasts.ADDING_PROFILE_PICTURE:
          description = intl.formatMessage({
            id: 'adding-profile-picture-description',
            defaultMessage: 'Error adding profile picture',
          });
          break;
        case Toasts.ADDING_ACHIEVEMENT:
          description = intl.formatMessage({
            id: 'adding-achievemenet-description',
            defaultMessage: 'Error adding achievement',
          });
          break;
      }
      showToast({
        description,
        status,
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toastId, toast, status, showToast, intl]);
}

export default useToasts;
