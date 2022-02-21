import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Textarea } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

function TextAreaComponent({
  id,
  label,
  value,
  onChange,
  isInvalid = false,
  errorMessage = '',
  mb,
  mt,
}: {
  id: string;
  label?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  isInvalid?: boolean;
  errorMessage?: string;
  mb?: number;
  mt?: number;
}) {
  return (
    <FormControl isInvalid={isInvalid} mb={mb} mt={mt}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Textarea id={id} value={value} onChange={onChange} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

export default TextAreaComponent;
