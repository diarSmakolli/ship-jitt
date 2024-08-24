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
        bgGradient="linear(to-r, gray.100, red.600)"
        backgroundClip="text"
        fontFamily={'Bricolage Grotesque'}>
        401
      </Heading>
      <Text fontSize="25px" mt={3} mb={2} fontFamily={'Epilogue'} color='gray.200'>
        Unauthorized
      </Text>
      <Text color={'gray.400'} mb={6} fontFamily={'Epilogue'}>
        The page you're looking for requires access.
      </Text>

      <Button
        bg='white'       
        color="black"
        variant="solid"
        as='a'
        href='/'>
        Go to Home
      </Button>
    </Box>
  )
}

export default Unauthorized;