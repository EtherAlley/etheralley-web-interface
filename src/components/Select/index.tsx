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
}: {
  id: string;
  label?: string;
  options: SelectOption[];
  value: string | number | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  isInvalid?: boolean;
  errorMessage?: string;
}) {
  return (
    <FormControl isInvalid={isInvalid}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <SelectComponent id={id} value={value} onChange={onChange}>
        {!value && <option key="undefined" value={undefined}></option>}
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
