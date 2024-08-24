// Services.js -- Features

import React from 'react';
import { Box, Text, SimpleGrid, Image } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const Services = () => {
    return (
        <Box py={10}>
            <Text 
            textAlign={'center'} 
            color='white' 
            fontFamily={'Epilogue'}
            fontSize={{ base: 'xl', md: '5xl' }}
            fontWeight={'500'}
            >
                Compare with <br />
                everything you need
            </Text>

            <SimpleGrid columns={{base: 1, md: 3}} spacing={4} mt={10}>
                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10490/10490223.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Geist Sans" fontWeight={500}>Emails</Text>

                    <Text mt={2} color='hsl(240 5% 64.9%)' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Send transactional emails
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                    <CheckIcon /> DNS setup to avoid spam folder.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Webhook to receive & forward emails
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Mailgun integration
                    </Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10473/10473692.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>Payments</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Create checkout sessions
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                    <CheckIcon /> Handle endpoints to update the user account (one-time payments).
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Tutorial to setup your account in Stripe.
                    </Text>

                  



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10645/10645744.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>Authentication</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Custom authentication
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                    <CheckIcon /> Save user in database.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Private protected routes.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Features like update password, update profile picture, verify email, forgot password.
                    </Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/9850/9850774.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>Database</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                    <CheckIcon /> Postgres Schema
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                    <CheckIcon /> MongoDB in the future...
                    </Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/1292/1292765.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>SEO</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Blog
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                    <CheckIcon /> All meta tags to rank on search engines.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> SEO-optimized UI components
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Structured data markup for Rich Snippets
                    </Text>


                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/16359/16359637.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>Others</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Chakra UI integration.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                    <CheckIcon /> Chakra UI 20+ themes, Components, animations, and sections like this features section.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Copy paste code templates
                    </Text>




                </Box>
            </SimpleGrid>

        </Box>
    );
};

export default Services;