import { Box, Center, Container, Heading } from '@chakra-ui/react'
import React from 'react'

function Success() {
  return (
    <Box>
        <Container>
            <Center>
            <Heading>
                Thank your for your purchase!

            </Heading>
            <Heading>
                Go back to your dashboard and refresh the page to unlock your new features.
                Thanks for using our app!
            </Heading>
            </Center>
        </Container>
    </Box>
  )
}

export default Success