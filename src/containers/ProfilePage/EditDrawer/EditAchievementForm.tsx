import { Flex, Button, Box, Text } from '@chakra-ui/react';
import { MdRemove } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { InteractionTypes } from '../../../common/constants';
import { AchievementTypes } from '../../../common/types';
import IconButton from '../../../components/IconButton';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { openAchievementModal } from '../ModalForms/slice';
import { removeAchievement, selectAchievements, selectInteraction } from '../slice';

function EditAchievementForm() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const achievements = useAppSelector(selectAchievements);

  return (
    <Box>
      <Flex my={5}>
        <Button
          id="add-achievement-button"
          onClick={() => dispatch(openAchievementModal())}
          colorScheme="brand"
          variant="outline"
        >
          {intl.formatMessage({ id: 'add-achievement-button', defaultMessage: 'Add Achievement' })}
        </Button>
      </Flex>
      {achievements.map(({ index, type, id }) => {
        let label;
        switch (type) {
          case AchievementTypes.Interactions:
            label = <InteractionLabel index={index} />;
            break;
          default:
            label = <Text isTruncated>{type}</Text>;
            break;
        }
        return (
          <Flex key={id} alignItems="center" mb={2}>
            {label}
            <Box flexGrow={1} />
            <IconButton
              Icon={MdRemove}
              onClick={() => dispatch(removeAchievement(index))}
              size="md"
              variant="solid"
              bg="gray.800"
              iconColor="red.300"
              aria-label="remove-achievement"
              tooltip={intl.formatMessage({ id: 'remove-achievement', defaultMessage: 'Remove achievement' })}
            />
          </Flex>
        );
      })}
    </Box>
  );
}

function InteractionLabel({ index }: { index: number }) {
  const intl = useIntl();
  const interaction = useAppSelector((state) => selectInteraction(state, index));

  switch (interaction.type) {
    case InteractionTypes.CONTRACT_CREATION:
      return (
        <Text isTruncated>
          {intl.formatMessage({
            id: 'contract-creation-label',
            defaultMessage: 'Deployed Smart Contract Achievement',
          })}
        </Text>
      );
    case InteractionTypes.SEND_ETHER:
      return (
        <Text isTruncated>
          {intl.formatMessage({ id: 'send-ether-label', defaultMessage: 'Sent Ether Achievement' })}
        </Text>
      );
    default:
      return <Text isTruncated>{interaction.type}</Text>;
  }
}

export default EditAchievementForm;
