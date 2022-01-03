import { IconButton } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { ChangeEventHandler } from 'react';

export default ({
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
  Icon,
  iconOnClick,
  onSubmit,
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
  Icon?: any;
  iconOnClick?: any;
  onSubmit?: any;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={isInvalid} mb={mb}>
        {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        <InputGroup>
          <Input
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isReadOnly={isReadOnly}
            variant={variant}
          />
          {Icon && (
            <InputRightElement>
              <IconButton icon={<Icon color="brand.400" />} onClick={iconOnClick} aria-label="icon button" />
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </form>
  );
};
