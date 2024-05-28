import React from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';

const GetStarted = () => {
    return (
        <Box py={28}>
            <Center>
                <Text fontSize="5xl"  mb={4} color='white'
                    fontFamily={'Bricolage Grotesque'}
                >
                    Boost your app, launch, earn 🤑
                </Text>
                
            </Center>

            <Center>
                <Text fontSize="xl"  mb={8} color='gray.300'
                    fontFamily={'Poppins'}
                >
                    Don't waste your time, build now.
                </Text>
                
            </Center>
            <Center>
                <Button bg="white" color='black'>
                    Get Ship jitt
                </Button>
            </Center>
        </Box>
    );
};

export default GetStarted;