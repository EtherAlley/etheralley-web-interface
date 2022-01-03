import { IconButton, IconButtonProps, Tooltip, Icon as ChakraIcon } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

export type IconButtonComponentProps = {
  'aria-label': string;
  tooltip: string;
  Icon: any;
  onClick: MouseEventHandler<HTMLInputElement>;
} & IconButtonProps;

function IconButtonComponent({ tooltip, Icon, ...rest }: IconButtonComponentProps) {
  return (
    <Tooltip label={tooltip}>
      <IconButton
        variant="ghost"
        bg="blackAlpha.600"
        size="lg"
        icon={<ChakraIcon color="brand.400" as={Icon} w={6} h={6} />}
        {...rest}
      />
    </Tooltip>
  );
}

export default IconButtonComponent;
