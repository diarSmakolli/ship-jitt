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
            fontFamily={'Bricolage Grotesque'} 
            fontSize={{ base: 'xl', md: '5xl' }}
            fontWeight={'600'}
            >
                Compare with <br />
                everything you need
            </Text>

            <SimpleGrid columns={{base: 1, md: 3}} spacing={4} mt={10}>
                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10490/10490223.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Syne" fontWeight={600}>Emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Send transactional emails
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                    <CheckIcon /> DNS setup to avoid spam folder.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Webhook to receive & forward emails
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Mailgun integration
                    </Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10473/10473692.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Syne'} fontWeight={600}>Payments</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Create checkout sessions
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                    <CheckIcon /> Handle endpoints to update the user account (one-time payments).
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Tutorial to setup your account in Stripe.
                    </Text>

                  



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/10645/10645744.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Syne'} fontWeight={600}>Authentication</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Custom authentication
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                    <CheckIcon /> Save user in database.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Private protected routes.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Features like update password, update profile picture, verify email, forgot password.
                    </Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/9850/9850774.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Syne'} fontWeight={600}>Database</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> MongoDB Schema
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                    <CheckIcon /> Postgres Schema
                    </Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/1292/1292765.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Syne'} fontWeight={600}>SEO</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Blog
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                    <CheckIcon /> All meta tags to rank on search engines.
                    </Text>

                    {/* <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Opengraph to share on social media
                    </Text> */}

                    {/* <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Automated sitemap generation to fasten Google indexing
                    </Text> */}

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> SEO-optimized UI components
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Structured data markup for Rich Snippets
                    </Text>


                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'>
                    <Image src="https://cdn-icons-png.flaticon.com/128/16359/16359637.png" width='50px' height='50px'/>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Syne'} fontWeight={600}>Others</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Chakra UI integration.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                    <CheckIcon /> Chakra UI 20+ themes, Components, animations, and sections like this features section.
                    </Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>
                        <CheckIcon /> Copy paste code templates
                    </Text>




                </Box>
            </SimpleGrid>

        </Box>
    );
};

export default Services;