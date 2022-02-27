import { useIntl } from 'react-intl';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectText, updateProfileTitle, updateProfileDescription } from '../slice';

function EditInfoForm() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { title, description } = useAppSelector(selectText);

  return (
    <>
      <Input
        id="title"
        label={intl.formatMessage({ id: 'edit-title', defaultMessage: 'Title' })}
        value={title}
        onChange={(event) => dispatch(updateProfileTitle(event.target.value))}
        maxLength={40}
      />
      <TextArea
        id="test"
        label={intl.formatMessage({ id: 'edit-description', defaultMessage: 'Description' })}
        value={description}
        onChange={(event) => dispatch(updateProfileDescription(event.target.value))}
        maxLength={500}
        height={400}
      />
    </>
  );
}

export default EditInfoForm;
