import { useIntl } from 'react-intl';
import Input from '../../../components/Input';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  selectColors,
  updatePrimaryColor,
  updateSecondaryColor,
  updatePrimaryTextColor,
  updateSecondaryTextColor,
  updateAccentColor,
  updateShadowColor,
} from '../slice';

function EditColorsForm() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { primary, secondary, accent, shadow, primary_text, secondary_text } = useAppSelector(selectColors);

  return (
    <>
      <Input
        id="primaryColor"
        label={intl.formatMessage({ id: 'edit-primary-color', defaultMessage: 'Primary' })}
        value={primary}
        onChange={(event) => dispatch(updatePrimaryColor(event.target.value))}
        maxLength={15}
      />
      <Input
        id="secondaryColor"
        label={intl.formatMessage({ id: 'edit-secondary-color', defaultMessage: 'Secondary' })}
        value={secondary}
        onChange={(event) => dispatch(updateSecondaryColor(event.target.value))}
        maxLength={15}
        mt={4}
      />
      <Input
        id="accent"
        label={intl.formatMessage({ id: 'edit-accent-color', defaultMessage: 'Accent' })}
        value={accent}
        onChange={(event) => dispatch(updateAccentColor(event.target.value))}
        maxLength={15}
        mt={4}
      />
      <Input
        id="shadow"
        label={intl.formatMessage({ id: 'edit-shadow-color', defaultMessage: 'Shadow' })}
        value={shadow}
        onChange={(event) => dispatch(updateShadowColor(event.target.value))}
        maxLength={15}
        mt={4}
      />
      <Input
        id="primaryText"
        label={intl.formatMessage({ id: 'edit-primary-text-color', defaultMessage: 'Primary Text' })}
        value={primary_text}
        maxLength={15}
        onChange={(event) => dispatch(updatePrimaryTextColor(event.target.value))}
        mt={4}
      />
      <Input
        id="secondaryText"
        label={intl.formatMessage({ id: 'edit-secondary-text-color', defaultMessage: 'Secondary Text' })}
        value={secondary_text}
        maxLength={15}
        onChange={(event) => dispatch(updateSecondaryTextColor(event.target.value))}
        mt={4}
      />
    </>
  );
}

export default EditColorsForm;
