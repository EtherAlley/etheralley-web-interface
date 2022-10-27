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
      let title = '';
      switch (toast) {
        case Toasts.ADDING_BADGE:
          title = intl.formatMessage({ id: 'adding-badge-description', defaultMessage: 'Error adding badge' });
          break;
        case Toasts.ADDING_PROFILE_PICTURE:
          title = intl.formatMessage({
            id: 'adding-profile-picture-description',
            defaultMessage: 'Error adding profile picture',
          });
          break;
        case Toasts.ADDING_ACHIEVEMENT:
          title = intl.formatMessage({
            id: 'adding-achievemenet-description',
            defaultMessage: 'Error adding achievement',
          });
          break;
        case Toasts.SUCCESS_SUBMITTING_PURCHASE:
          title = intl.formatMessage({
            id: 'success-making-purchase-description',
            defaultMessage: 'Successfully processed transaction',
          });
          break;
        case Toasts.ERROR_SUBMITTING_PURCHASE:
          title = intl.formatMessage({
            id: 'error-making-purchase-description',
            defaultMessage: 'Error processing transaction',
          });
          break;
        case Toasts.ERROR_SAVING_PROFILE:
          title = intl.formatMessage({
            id: 'error-saving-profile',
            defaultMessage: 'Error saving profile',
          });
          break;
        case Toasts.SUCCESS_SAVING_PROFILE:
          title = intl.formatMessage({
            id: 'success-saving-profile',
            defaultMessage: 'Successfully saved profile',
          });
          break;
        case Toasts.ERROR_LOADING_PAGE:
          title = intl.formatMessage({
            id: 'error-loading-page',
            defaultMessage: 'Error loading page',
          });
          break;
        case Toasts.SUCCESS_CONNECTING_TO_WALLET:
          title = intl.formatMessage({
            id: 'success-connecting-to-wallet',
            defaultMessage: 'Successfully connected to wallet',
          });
          break;
        case Toasts.SUCCESS_SWITCHING_NETWORK:
          title = intl.formatMessage(
            {
              id: 'success-switching-network',
              defaultMessage: 'Successfully switched to {chain}',
            },
            { chain: 'Polygon (Matic)' }
          );
          break;
        case Toasts.SUCCESS_DISCONNECTING_FROM_WALLET:
          title = intl.formatMessage({
            id: 'success-disconnecting-from-wallet',
            defaultMessage: 'Succesfully disconnected from wallet',
          });
          break;
        case Toasts.ERROR_CONNECTING_TO_WALLET:
          title = intl.formatMessage({
            id: 'error-connecting-to-wallet',
            defaultMessage: 'Error connecting to wallet',
          });
          break;
        case Toasts.ERROR_SWITCHING_NETWORK:
          title = intl.formatMessage({
            id: 'error-switching-network',
            defaultMessage: 'Error switching network',
          });
          break;
        case Toasts.ERROR_DISCONNECTING_FROM_WALLET:
          title = intl.formatMessage({
            id: 'error-disconnecting-from-wallet',
            defaultMessage: 'Error disconnecting from wallet',
          });
          break;
      }
      showToast({
        variant: 'solid',
        title,
        status,
        duration: 5000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastId]);
}

export default useToasts;
