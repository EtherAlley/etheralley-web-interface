import { Box, Heading, Text } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

export default function NotFound({ title, subtitle }: { title?: string; subtitle?: string }) {
  const intl = useIntl();

  return (
    <Box textAlign="center">
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, brand.400, brand.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        {title ?? intl.formatMessage({ id: 'page-not-found', defaultMessage: 'Page Not Found' })}
      </Text>
      <Text color={'gray.500'} mb={6}>
        {subtitle ??
          intl.formatMessage({
            id: 'non-existent-page',
            defaultMessage: "The page you're looking for does not seem to exist",
          })}
      </Text>
    </Box>
  );
}
