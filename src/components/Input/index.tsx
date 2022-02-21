import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { ChangeEventHandler } from 'react';
import IconButton, { IconButtonComponentProps } from '../IconButton';

function InputComponent({
  id,
  label,
  value,
  onChange,
  placeholder,
  isInvalid = false,
  errorMessage = '',
  isReadOnly = false,
  variant,
  size = 'md',
  mb,
  mt,
  iconProps,
  maxLength,
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
  size?: string;
  mb?: number;
  mt?: number;
  iconProps?: IconButtonComponentProps;
  maxLength?: number;
}) {
  return (
    <FormControl isInvalid={isInvalid} mb={mb} mt={mt}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <InputGroup size={size}>
        <Input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isReadOnly={isReadOnly}
          variant={variant}
          colorScheme="brand"
          maxLength={maxLength}
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

export default InputComponent;
