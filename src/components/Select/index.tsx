import { FormControl, FormErrorMessage, FormLabel, Select as SelectComponent } from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';

type SelectOption = {
  id: string;
  label: string;
};

function Select({
  id,
  label,
  options,
  value,
  onChange,
  isInvalid,
  errorMessage,
  disabled,
  mb,
  mt,
}: {
  id: string;
  label?: string;
  options: SelectOption[];
  value: string | number | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  isInvalid?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  mb?: number;
  mt?: number;
}) {
  return (
    <FormControl isInvalid={isInvalid} mt={mt}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <SelectComponent id={id} value={value || ''} onChange={onChange} mb={mb} disabled={disabled}>
        {!value && <option value=""></option>}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </SelectComponent>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

export default Select;
