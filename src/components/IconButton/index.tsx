import { IconButton, IconButtonProps, Tooltip, Icon as ChakraIcon, As } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

export type IconButtonComponentProps = {
  'aria-label': string;
  tooltip: string;
  Icon: As;
  iconColor?: string;
  onClick: MouseEventHandler<HTMLInputElement>;
} & IconButtonProps;

function IconButtonComponent({ tooltip, Icon, iconColor = 'brand.400', ...rest }: IconButtonComponentProps) {
  return (
    <Tooltip label={tooltip}>
      <IconButton size="lg" icon={<ChakraIcon color={iconColor} as={Icon} w={6} h={6} />} {...rest} />
    </Tooltip>
  );
}

export default IconButtonComponent;
