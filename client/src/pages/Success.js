
import React from 'react';
import { Box, Heading, Text, Button} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Helmet } from 'react-helmet-async';

function Success() {
  return (
    <Box textAlign="center" py={60} px={6} minH='100vh' bg='#0d1117'>
      <Helmet>
        <title>Success | ShipJitt</title>
      </Helmet>
      
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2} fontFamily={'Bricolage Grotesque'} color='gray.200'>
        Thank you for your purchase!
      </Heading>
      <Text color={'gray.500'}>
        Go back to dashboard and refresh it to unlock the new features.
      </Text>

      <Text color={'gray.500'} mt={5}>
        Thank you for your trust in our services.
      </Text>

      <Button as='a' href='/' colorScheme='teal' mt={5}>
        Go to Home
      </Button>
    </Box>
  )
}

export default Success