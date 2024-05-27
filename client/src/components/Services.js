import React from 'react';
import { Box, Center, Text, SimpleGrid } from '@chakra-ui/react';

const Services = () => {
    return (
        <Box>
            <Text textAlign={'center'} color='white' fontFamily={'Poppins'} fontSize={{ base: 'xl', md: '4xl' }}
                fontWeight={'bold'}
            >
                Compare with <br />
                everything you need
            </Text>

            <SimpleGrid columns={3} spacing={4} mt={10}>
                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                            fill="currentColor"
                        />
                    </svg>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Bricolage Grotesque'} fontWeight={600}>Emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>

                        Send transactional emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>Webhook to receive & forward emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>Mailgun integration</Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                            fill="currentColor"
                        />
                    </svg>

                    <Text mt={2} color='white' fontSize={'3xl'} fontFamily={'Bricolage Grotesque'}>Payments</Text>

                    <Text mt={2} color='gray.400' fontSize={'lg'} fontFamily={'Epilogue'}>Send transactional emails</Text>

                    <Text mt={2} color='gray.400' fontSize={'lg'} fontFamily={'Epilogue'}>DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)</Text>

                    <Text mt={2} color='gray.400' fontSize={'lg'} fontFamily={'Epilogue'}>Webhook to receive & forward emails</Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                            fill="currentColor"
                        />
                    </svg>

                    <Text mt={2} color='white' fontSize={'3xl'} fontFamily={'Bricolage Grotesque'}>Auth</Text>

                    <Text mt={2} color='gray.400' fontSize={'lg'} fontFamily={'Epilogue'}>Send transactional emails</Text>

                    <Text mt={2} color='gray.400' fontSize={'lg'} fontFamily={'Epilogue'}>DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)</Text>

                    <Text mt={2} color='gray.400' fontSize={'lg'} fontFamily={'Epilogue'}>Webhook to receive & forward emails</Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                            fill="currentColor"
                        />
                    </svg>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Bricolage Grotesque'} fontWeight={600}>Database</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>

                        Send transactional emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>Webhook to receive & forward emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>Mailgun integration</Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                            fill="currentColor"
                        />
                    </svg>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Bricolage Grotesque'} fontWeight={600}>SEO</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>

                        Send transactional emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>Webhook to receive & forward emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>Mailgun integration</Text>



                </Box>

                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                            fill="currentColor"
                        />
                    </svg>

                    <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Bricolage Grotesque'} fontWeight={600}>Components</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>

                        Send transactional emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>Webhook to receive & forward emails</Text>

                    <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Poppins'} fontWeight={500}>Mailgun integration</Text>



                </Box>
            </SimpleGrid>

        </Box>
    );
};

export default Services;