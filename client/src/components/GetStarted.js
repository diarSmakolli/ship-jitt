import React from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';

const GetStarted = () => {
    return (
        <Box py={28}>
            <Center>
                <Text fontSize="5xl" mb={4} color='white' fontWeight={500}
                    fontFamily={'Geist Sans'}
                >
                    Boost your app, launch, earn 🤑
                </Text>
                
            </Center>

            <Center>
                <Text fontSize="xl"  mb={8} color='gray.300'
                    fontFamily={'Geist Sans'}
                >
                    Don't waste your time, build now.
                </Text>
                
            </Center>
            <Center>
                <Button bg="white" color='black' as='a' href='/auth/signup' fontFamily='Geist Sans'>
                    Get Started
                </Button>
            </Center>
        </Box>
    );
};

export default GetStarted;