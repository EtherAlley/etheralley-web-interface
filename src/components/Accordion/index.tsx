import { AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Accordion } from '@chakra-ui/react';
import { ReactNode } from 'react';

function AccordionComponent({ items }: { items: { header: string; body: ReactNode }[] }) {
  return (
    <Accordion allowMultiple defaultIndex={[0, 1, 2, 3, 4]}>
      {/** TODO: Find a more dynamic way of building this array */}
      {items.map(({ header, body }, i) => (
        <AccordionItem key={i}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {header}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccordionComponent;
