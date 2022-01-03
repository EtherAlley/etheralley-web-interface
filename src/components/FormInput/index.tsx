import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { ChangeEventHandler } from 'react';
import IconButton, { IconButtonComponentProps } from '../IconButton';

function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  isInvalid = false,
  errorMessage = '',
  isReadOnly = false,
  variant,
  mb,
  iconProps,
}: {
  id: string;
  label?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  isReadOnly?: boolean;
  variant?: string;
  mb?: number;
  iconProps?: IconButtonComponentProps;
}) {
  return (
    <FormControl isInvalid={isInvalid} mb={mb}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <InputGroup size="lg">
        <Input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isReadOnly={isReadOnly}
          variant={variant}
          colorScheme="brand"
        />
        {iconProps && (
          <InputLeftElement>
            <IconButton bg="inherit" {...iconProps} />
          </InputLeftElement>
        )}
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

export default FormInput;
