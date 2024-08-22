import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button 
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

function Unauthorized() {
  return (
    <Box textAlign="center" py={64} px={6} bg='#0d1117' minH='100vh'>
      <Helmet>
        <title>Unauthorized | ShipJitt</title>
      </Helmet>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, blue.600)"
        backgroundClip="text"
        fontFamily={'Bricolage Grotesque'}>
        401
      </Heading>
      <Text fontSize="18px" mt={3} mb={2} fontFamily={'Bricolage Grotesque'} color='gray.200'>
        Unauthorized
      </Text>
      <Text color={'gray.400'} mb={6} fontFamily={'Bricolage Grotesque'}>
        The page you're looking for requires access.
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, blue.300, blue.600, blue.600)"
        color="white"
        variant="solid"
        as='a'
        href='/'>
        Go to Home
      </Button>
    </Box>
  )
}

export default Unauthorized;