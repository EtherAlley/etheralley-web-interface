import { Input } from '@chakra-ui/react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  selectColors,
  updatePrimaryColor,
  updateSecondaryColor,
  updatePrimaryTextColor,
  updateSecondaryTextColor,
} from '../slice';

function EditColorsForm() {
  const dispatch = useAppDispatch();
  const { primary, secondary, primaryText, secondaryText } = useAppSelector(selectColors);

  return (
    <>
      <Input
        id="primaryColor"
        label="Primary"
        value={primary}
        onChange={(event) => dispatch(updatePrimaryColor(event.target.value))}
        maxLength={15}
      />
      <Input
        id="secondaryColor"
        label="Secondary"
        value={secondary}
        onChange={(event) => dispatch(updateSecondaryColor(event.target.value))}
        maxLength={15}
        mt={4}
      />
      <Input
        id="primaryText"
        label="Primary Text"
        value={primaryText}
        maxLength={15}
        onChange={(event) => dispatch(updatePrimaryTextColor(event.target.value))}
        mt={4}
      />
      <Input
        id="secondaryText"
        label="Secondary Text"
        value={secondaryText}
        maxLength={15}
        onChange={(event) => dispatch(updateSecondaryTextColor(event.target.value))}
        mt={4}
      />
    </>
  );
}

export default EditColorsForm;
