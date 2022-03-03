import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { ChangeEventHandler, forwardRef, KeyboardEventHandler, LegacyRef } from 'react';
import IconButton, { IconButtonComponentProps } from '../IconButton';

const InputComponent = forwardRef(
  (
    {
      id,
      label,
      value,
      onChange,
      onKeyPress,
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
      autoComplete,
      disabled,
    }: {
      id: string;
      label?: string;
      value: string;
      onChange?: ChangeEventHandler<HTMLInputElement>;
      onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
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
      autoComplete?: string;
      disabled?: boolean;
    },
    ref?: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <FormControl isInvalid={isInvalid} mb={mb} mt={mt}>
        {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        <InputGroup size={size}>
          <Input
            id={id}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            isReadOnly={isReadOnly}
            variant={variant}
            colorScheme="brand"
            maxLength={maxLength}
            ref={ref}
            autoComplete={autoComplete}
            disabled={disabled}
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
);

export default InputComponent;
