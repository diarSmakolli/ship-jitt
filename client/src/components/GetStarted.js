import React from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';
import { useAuth } from '../auth/authContext';


const GetStarted = () => {
    const { user } = useAuth();
    return (
        <Box py={28}>
            <Center>
                <Text fontSize={{base: '2xl', md: '5xl'}} mb={4} color='white' fontWeight={500}
                    fontFamily={'Epilogue'}
                >
                    Boost your app, launch, earn
                </Text>
            </Center>

            <Center>
                <Text fontSize="xl"  mb={8} color='gray.400'
                    fontFamily={'Epilogue'}
                >
                    Don't waste your time, build now.
                </Text>
                
            </Center>
            <Center>
                { !user &&  (
                <Button bg="white" color='black' as='a' href='/auth/signup' fontFamily='Epilogue'>
                    Get Started
                </Button>
                )}
            </Center>
        </Box>
    );
};

export default GetStarted;
