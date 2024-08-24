
import React from 'react';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Helmet } from 'react-helmet-async';

function Cancel() {
  return (
    <Box textAlign="center" py={60} px={6} minH='100vh' bg='#000'>

      <Helmet>
        <title>Payment Canceled - ShipJitt</title>
      </Helmet>

      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center">
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2} fontFamily={'Epilogue'} color='gray.200'>
        Your payment was canceled!
      </Heading>
      <Text color={'gray.500'} fontFamily={'Epilogue'} fontWeight={500}>
        It looks like your payment was not completed.
      </Text>

      <Text color={'gray.500'} mt={5} fontFamily={'Epilogue'} fontWeight={500}>
        If you encountered any issues, please try again or contact our support.
      </Text>

      <Button as='a' href='/' bg='white' color='black' mt={5} fontFamily={'Epilogue'}>
        Go to Home
      </Button>
    </Box>
  )
}

export default Cancel