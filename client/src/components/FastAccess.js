import React from 'react';
import { Box, Center, Text, SimpleGrid, Image } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const FastAccess = () => {
    return (
        <Box>
            <Text
                textAlign={'center'}
                color='white'
                fontFamily={'Syne'}
                fontSize={{ base: 'xl', md: '6xl' }}
                fontWeight={'600'}
            >
                FAST ACCESS
            </Text>

            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mt={10}>
                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10490/10490223.png" width='50px' height='50px' />

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Syne" fontWeight={600}>Seamless</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Unlock capital in a few easy steps
                    </Text>


                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10490/10490223.png" width='50px' height='50px' />

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Syne" fontWeight={600}>Seamless</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Unlock capital in a few easy steps
                    </Text>


                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10490/10490223.png" width='50px' height='50px' />

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Syne" fontWeight={600}>Seamless</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Unlock capital in a few easy steps
                    </Text>


                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10490/10490223.png" width='50px' height='50px' />

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Syne" fontWeight={600}>Seamless</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Unlock capital in a few easy steps
                    </Text>


                </Box>



            </SimpleGrid>

        </Box>
    );
};

export default FastAccess;