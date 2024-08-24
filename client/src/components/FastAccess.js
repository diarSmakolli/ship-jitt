import React from 'react';
import { Box, Text, SimpleGrid, Image } from '@chakra-ui/react';
 
const FastAccess = () => {
    return (
        <Box>
            <Text
                textAlign={'center'}
                color='white'
                fontFamily={'Epilogue'}
                fontSize={{ base: 'xl', md: '5xl' }}
                fontWeight={'600'}
            >
                Fast access to essential tools
            </Text>
 
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={10}>
                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10473/10473692.png" width='50px' height='50px' />
 
                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Geist Sans" fontWeight={500}>Seamless payments</Text>
 
                    <Text mt={2} color='hsl(240 5% 64.9%)' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={500}>
                         Effortesly manage transactions with our seamless Stripe integration,
                        ensuring secure and fast payment processing for your customers.
                    </Text>
 
                </Box>
 
                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10484/10484291.png" width='50px' height='50px' />
 
                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Geist Sans" fontWeight={500}>Custom authentication</Text>
 
                    <Text mt={2} color='hsl(240 5% 64.9%)' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={500}>
                         Enhance your app security with our custom authentication solutions,
                        designed to provide robust and reliable user verification.
                    </Text>
 
 
                </Box>
 
                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10490/10490223.png" width='50px' height='50px' />
 
                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Geist Sans" fontWeight={500}>Automated emails</Text>
 
                    <Text mt={2} color='hsl(240 5% 64.9%)' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={500}>
                        Streamline your communication with our Mailgun integration,
                        offering powerful email automation and management capabilites.
                    </Text>
 
 
                </Box>
 
                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/8488/8488859.png" width='50px' height='50px' />
 
                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Geist Sans" fontWeight={500}>Chakra UI components</Text>
 
                    <Text mt={2} color='hsl(240 5% 64.9%)' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={500}>
                         Develop and customize your application with 20+ ready-to-use components
                        from Chakra UI, ensuring a consistent and modern design.
                    </Text>
 
 
                </Box>
 
 
 
            </SimpleGrid>
 
        </Box>
    );
};
 
export default FastAccess;