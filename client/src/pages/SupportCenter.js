import React from 'react';
import {
    Box,
    Container,
    Link,
    Text,
    Button,
    SimpleGrid,
    Center,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSupportCenter from '../components/HeroSupportCenter';

function SupportCenter() {
    return (
        <Box bg='hsl(240 10% 3.9%)' minH='100vh'>

            <Box>
                <Navbar />
                <HeroSupportCenter />
            </Box>


            <Container maxW='6xl'>
                <Box mt={28}>
                    <Text fontSize='4xl' fontWeight='600' textAlign='center' mt={14} mb={14}
                        fontFamily={'Geist Sans'} color='gray.50'>
                        Frequently Asked Questions
                    </Text>


                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Geist Sans'} fontWeight={500} fontSize={'xl'}>
                                What do i get in this product?
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                The Node.js & React.js starter with all boilerplate code you need to run
                                an online app: a payment system, a database, a user authentication system,
                                a blog, UI components, emails and more. <br />

                                You can use it to build your own SaaS, CRM, CMS, or any other web app.
                            </Text>

                        </Box>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Geist Sans'} fontWeight='500' fontSize={'xl'}>
                                Can i use PayPal?
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                Yes, you can send over USD equivalent of the plan you want to purchase
                                ($169 or $199) to my Paypal account: <Link as='a' color='blue.400' target='_blank' href='https://paypal.me/dijarsmakolli'>paypal.me/dijarsmakolli</Link>
                                <br />
                                Once done, please email me your GitHub username so I can give you access to the repo.
                                <br />
                                Please allow a few hours to get access.

                            </Text>

                        </Box>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Geist Sans'} fontWeight='500' fontSize={'xl'}>
                                My tech stack is different, can i still use this product?
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                Yes, you can. The project is built with Node.js and React.js.
                                <br />
                                Libraries is indepedent. You can use SendGrid instead of Mailgun,
                                MongoDB instead of PostgreSQL, 2Checkout or LemonsQueezy instead of Stripe and so on.
                            </Text>

                        </Box>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Geist Sans'} fontWeight='500' fontSize={'xl'}>
                                How is Ship Jitt better than other boilerplates?
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                Ship Jitt is a full-stack starter that includes everything you need to build
                                a web app. It's not just a UI kit or a set of components. It's a complete
                                solution that includes a payment system, a database, a user authentication
                                system, a blog, UI components, emails and more.
                            </Text>

                        </Box>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Geist Sans'} fontWeight='500' fontSize={'xl'}>
                                Are there any other costs besides the price of the product?
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                No, there are no other costs. You pay once and get access to the product
                                and the updates for life. You can use the product for an unlimited number
                                of projects and clients.
                            </Text>

                        </Box>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Geist Sans'} fontWeight='500' fontSize={'xl'}>
                                How often do you release updates?
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                We release updates regularly. You will get access to all the updates for life. <br />
                                We also provide support for the product. If you have any questions or need help,
                                you can contact us at any time.
                            </Text>

                        </Box>


                    </SimpleGrid>
                </Box>



                {/* contact us */}

                <Box mt={20}>

                    <Text fontSize='4xl' fontWeight='500' textAlign='center' mt={14}
                        fontFamily={'Geist Sans'} color='white'
                    >
                        Contact Us
                    </Text>

                    <Text fontSize='lg' fontWeight='500' textAlign='center' mt={5}
                        fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                    >
                        Your issue is not related to any of the questions above?
                        <br />
                        Contact us so we can help you!
                    </Text>


                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={20}>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Geist Sans'} fontWeight='600' fontSize={'xl'}>
                                English Message
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                Your message must be in understandable English. Any other language will be ignored. Use google translator if necessary.
                            </Text>

                        </Box>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Poppins'} fontWeight='600' fontSize={'xl'}>
                                Complete description
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                Your issue must be well described, not just words like "fix it". Take screenshots or record your screen if necessary.
                            </Text>

                        </Box>

                        <Box p={5} bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text color='gray.50' fontFamily={'Geist Sans'} fontWeight='600' fontSize={'xl'}>
                                Request for refund
                            </Text>

                            <Text color='hsl(240 5% 64.9%)' fontFamily={'Geist Sans'} fontSize={'md'} py={5}
                                fontWeight={400}
                            >
                                After you've got access to the repo, ShipJitt is yours forever, so it can't be refunded.
                            </Text>

                        </Box>



                    </SimpleGrid>
                </Box>


                <Box mt={24} mb={10}>
                    <Text fontSize='4xl' textAlign='center'
                        fontFamily={'Geist Sans'} fontWeight='700' color='gray.50'
                    >
                        Can't find your answer?
                    </Text>

                    <Text fontSize='lg' fontWeight='500' textAlign='center' mt={3}
                        fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                    >
                        Get in touch and we'll get back to you as soon as we can.
                    </Text>

                    <Center mt={7}>
                        <Button bg='white' color='black' as='a' href="mailto:dijarsmakolli99@gmail.com" size='md'>
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