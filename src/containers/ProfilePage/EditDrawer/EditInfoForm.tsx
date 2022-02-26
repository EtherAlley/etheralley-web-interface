import { Input } from '@chakra-ui/react';
import TextArea from '../../../components/TextArea';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectText, updateProfileTitle, updateProfileDescription } from '../slice';

function EditInfoForm() {
  const dispatch = useAppDispatch();
  const { title, description } = useAppSelector(selectText);

  return (
    <>
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(event) => dispatch(updateProfileTitle(event.target.value))}
        maxLength={40}
      />
      <TextArea
        id="test"
        label="Description"
        value={description}
        onChange={(event) => dispatch(updateProfileDescription(event.target.value))}
        maxLength={500}
        height={400}
      />
    </>
  );
}

export default EditInfoForm;
