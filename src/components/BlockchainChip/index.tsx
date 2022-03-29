import { Badge, Heading } from '@chakra-ui/react';
import { Blockchains } from '../../common/constants';

function BlockcahinChip({ text, blockchain }: { text: string; blockchain: Blockchains }) {
  return (
    <Badge borderRadius={8} py={1} px={2} mt={3} colorScheme={blockchain} variant="outline">
      <Heading as="h3" size="md" noOfLines={2}>
        {text}
      </Heading>
    </Badge>
  );
}

export default BlockcahinChip;
