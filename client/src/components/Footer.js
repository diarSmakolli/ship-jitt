import { React } from 'react';
 
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Button,
  useBreakpointValue
} from '@chakra-ui/react';


 
const ListHeader = ({children}) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};
 
export default function Footer() {
 
    const getCurrentYear = () => {
        let date = new Date();
        let currentYear = date.getFullYear();
        return currentYear;
    }
 
  return (
    <Box
      bg={'transparent'}
      color={'gray.300'}
      py={10}
      >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
            <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'Bricolage Grotesque'} 
            color='gray.50'
            fontSize={'3xl'}
            fontWeight={'500'}
            >
            Ship jitt
          </Text>
            </Box>
 
           
 
            <Text fontSize={'sm'}>
              © {getCurrentYear()} ShipJitt. All rights reserved
            </Text>

            <Text fontSize={'sm'}>
              Created with ❤️ by Dijar
            </Text>

          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>LINKS</ListHeader>
            <Link href={'#'}>Pricing</Link>
            <Link href={'/docs'}>Documentation</Link>
            <Link href={'/contact-us'}>Customer Support</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>LEGAL</ListHeader>
            <Link href={'/tos'}>Terms & conditions</Link>
            <Link href={'/privacy-policy'}>Privacy policy</Link>
            <Link href={'/license'}>Licenses</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>MORE</ListHeader>
            <Link href={'https://github.com/diarSmakolli'}>Github</Link>
            <Link href={'https://linkedin.com/in/dijarsmakolli'}>Linked in</Link>
            <Link href={'https://x.com/shipjitt'}>X</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}