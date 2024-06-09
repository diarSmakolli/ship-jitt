import React from 'react';
import { Box, Container, Link, Text, Button, SimpleGrid, Center,
    Stack,
    Heading, 
    useColorModeValue,
    Flex,
    Image,
 } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSupportCenter from '../components/HeroSupportCenter';

function SupportCenter() {
    return (
        // <Box bg='#0d1117' minH='100vh'>
        //     <Container maxW='6xl'>
                

                
               


        //         <Box mt={28}>

        //             <Text fontSize='3xl' fontWeight='500' textAlign='center' mt={14} mb={14}
        //                 fontFamily={'Bricolage Grotesque'} color='gray.50'
        //             >
        //                 Frequently Asked Questions
        //             </Text>


        //             <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>


        //             </SimpleGrid>
        //         </Box>



        //         {/* contact us */}

        //         <Box mt={20}>

        //             <Text fontSize='3xl' fontWeight='500' textAlign='center' mt={14}
        //                 fontFamily={'Bricolage Grotesque'} color='white'
        //             >
        //                 Contact Us
        //             </Text>

        //             <Text fontSize='lg' fontWeight='500' textAlign='center' mt={5}
        //                 fontFamily={'Bricolage Grotesque'} color='gray.300'
        //             >
        //                 Your issue is not related to any of the questions above?
        //                 <br />
        //                 Contact us so we can help you!
        //             </Text>


        //             <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={20}>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Offerwall issues
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>

        //                 <Box>

        //                     <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
        //                         Why my withdrawal is Processing?
        //                     </Text>

        //                     <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
        //                         fontWeight={400}
        //                     >
        //                         Some cryptocurrencies are sent using a low fee option. For this reason
        //                         your withdrawal get the processing status for a while, it may take up to
        //                         24 hours to process.
        //                     </Text>

        //                 </Box>


        //             </SimpleGrid>
        //         </Box>


        //         <Box py={24}>
        //             <Text fontSize='4xl' fontWeight='500' textAlign='center' 
        //                 fontFamily={'Bricolage Grotesque'} color='gray.50'
        //             >
        //                 Can't find your answer?
        //             </Text>

        //             <Text fontSize='lg' fontWeight='500' textAlign='center' mt={3}
        //                 fontFamily={'Bricolage Grotesque'} color='gray.200'
        //             >
        //                 Get in touch and we'll get back to you as soon as we can.
        //             </Text>
                    
        //             <Center mt={7}>
        //                 <Button bg='white' color='black' as='a' href="mailto:dijarsmakolli99@gmail.com">
        //                     Contact Support
        //                 </Button>
        //             </Center>



        //         </Box>

        //         <Box mt={14}>
        //             <Footer />
        //         </Box>



        //     </Container>
        // </Box>
        <Box bg='#0d1117' minH='100vh'>
            
                <Box>
                    <Navbar />
                    <HeroSupportCenter />
                </Box>
                
               
                <Container maxW='6xl'>

                <Box mt={28}>

                    <Text fontSize='3xl' fontWeight='500' textAlign='center' mt={14} mb={14}
                        fontFamily={'Bricolage Grotesque'} color='gray.50'
                    >
                        Frequently Asked Questions
                    </Text>


                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>


                    </SimpleGrid>
                </Box>



                {/* contact us */}

                <Box mt={20}>

                    <Text fontSize='3xl' fontWeight='500' textAlign='center' mt={14}
                        fontFamily={'Bricolage Grotesque'} color='white'
                    >
                        Contact Us
                    </Text>

                    <Text fontSize='lg' fontWeight='500' textAlign='center' mt={5}
                        fontFamily={'Bricolage Grotesque'} color='gray.300'
                    >
                        Your issue is not related to any of the questions above?
                        <br />
                        Contact us so we can help you!
                    </Text>


                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={20}>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Offerwall issues
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>

                        <Box>

                            <Text color='gray.50' fontFamily={'Bricolage Grotesque'} fontSize={'xl'}>
                                Why my withdrawal is Processing?
                            </Text>

                            <Text color='gray.300' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} py={5}
                                fontWeight={400}
                            >
                                Some cryptocurrencies are sent using a low fee option. For this reason
                                your withdrawal get the processing status for a while, it may take up to
                                24 hours to process.
                            </Text>

                        </Box>


                    </SimpleGrid>
                </Box>


                <Box py={24}>
                    <Text fontSize='4xl' fontWeight='500' textAlign='center' 
                        fontFamily={'Bricolage Grotesque'} color='gray.50'
                    >
                        Can't find your answer?
                    </Text>

                    <Text fontSize='lg' fontWeight='500' textAlign='center' mt={3}
                        fontFamily={'Bricolage Grotesque'} color='gray.200'
                    >
                        Get in touch and we'll get back to you as soon as we can.
                    </Text>
                    
                    <Center mt={7}>
                        <Button bg='white' color='black' as='a' href="mailto:dijarsmakolli99@gmail.com">
                            Contact Support
                        </Button>
                    </Center>



                </Box>

                <Box mt={14}>
                    <Footer />
                </Box>

                </Container>


        </Box>
    )
}

export default SupportCenter;