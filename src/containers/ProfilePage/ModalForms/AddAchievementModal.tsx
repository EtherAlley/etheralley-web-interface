import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { Blockchains, InteractionTypes } from '../../../common/constants';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  selectShowAchievementModal,
  selectAchievementSubmitting,
  closeAchievementModal,
  selectInteractionForm,
  updateInteractionTransactionId,
  updateInteractionBlockchain,
  updateInteractionType,
  getAchievement,
} from './slice';

function AddAchievementModal() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowAchievementModal);
  const submitting = useAppSelector(selectAchievementSubmitting);
  const { blockchain, type, transactionId } = useAppSelector(selectInteractionForm);

  return (
    <Modal isOpen={show} onClose={() => dispatch(closeAchievementModal())} preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {intl.formatMessage({ id: 'add-achievement-modal-header', defaultMessage: 'Add a new achievement' })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Select
              id="blockchain"
              label={intl.formatMessage({ id: 'select-blockchain', defaultMessage: 'Blockchain' })}
              value={blockchain}
              options={[
                {
                  id: Blockchains.ETHEREUM,
                  label: 'Ethereum',
                },
                {
                  id: Blockchains.POLYGON,
                  label: 'Polygon',
                },
                {
                  id: Blockchains.ARBITRUM,
                  label: 'Arbitrum',
                },
                {
                  id: Blockchains.OPTIMISM,
                  label: 'Optimism',
                },
              ]}
              onChange={(event) => dispatch(updateInteractionBlockchain(event.target.value))}
              mt={5}
            />
            <Select
              id="interaction-type"
              label={intl.formatMessage({ id: 'select-interaction-type', defaultMessage: 'Type' })}
              value={type}
              options={[
                {
                  id: InteractionTypes.CONTRACT_CREATION,
                  label: intl.formatMessage({
                    id: 'deployed-smart-contract',
                    defaultMessage: 'Deployed a Smart Contract',
                  }),
                },
                {
                  id: InteractionTypes.SEND_ETHER,
                  label: intl.formatMessage({ id: 'sent-ether', defaultMessage: 'Sent Ether' }),
                },
              ]}
              onChange={(event) => dispatch(updateInteractionType(event.target.value))}
              mt={5}
            />
            <Input
              id="transaction-id"
              value={transactionId}
              label={intl.formatMessage({ id: 'input-transaction-id', defaultMessage: 'Transaction Id' })}
              onChange={(event) => dispatch(updateInteractionTransactionId(event.target.value))}
              mt={5}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" variant="outline" mr={3} onClick={() => dispatch(closeAchievementModal())}>
            {intl.formatMessage({ id: 'add-achievement-modal-close', defaultMessage: 'Cancel' })}
          </Button>
          <Button colorScheme="brand" onClick={() => dispatch(getAchievement())} isLoading={submitting}>
            {intl.formatMessage({ id: 'add-achievement-modal-submit', defaultMessage: 'Add' })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddAchievementModal;
