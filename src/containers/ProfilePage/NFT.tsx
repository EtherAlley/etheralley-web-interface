import { useRef, useState } from 'react';
import {
  Flex,
  Image,
  Icon,
  Text,
  Link,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';
import Paper from '../../components/Paper';
import { NFT } from '../../constants';

function NFTComponent({
  metadata: { image, name, description, attributes },
  location: { contract_address, token_id },
}: NFT) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  return (
    <Paper as="button" onClick={() => setIsOpen(true)}>
      <>
        <Flex width={200} height={200}>
          <Image alt={name} src={image} margin="auto" maxWidth="100%" maxHeight="100%" />
        </Flex>
        <Text fontSize="lg" maxWidth={200} align="center" noOfLines={1}>
          {name}
        </Text>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {name}
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <Link color="blue.500" href={`https://opensea.io/assets/${contract_address}/${token_id}`} isExternal>
                  OpenSea <Icon as={RiExternalLinkLine}></Icon>
                </Link>
                <Text fontSize="md" noOfLines={3} mt={3}>
                  {description}
                </Text>
                {attributes && attributes.length > 0 && (
                  <>
                    <Text fontSize="md" mt={3}>
                      Attributes:
                    </Text>
                    <UnorderedList>
                      {attributes.map(({ trait_type, value }, i) => (
                        <ListItem key={i}>
                          <Text>
                            {trait_type}: {value}
                          </Text>
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </>
                )}
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    </Paper>
  );
}

export default NFTComponent;
