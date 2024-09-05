import React from 'react';
import { Box, Container, Text, Button } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

function TOS() {
    return (
        <Box bg='#000'>
            <Helmet>
                <title>Terms and Conditions | ShipJitt</title>
            </Helmet>

            <Container maxW='2xl'>

                <Box py={14}>

                    <Button as='a' href='/' size='sm' fontFamily={'Epilogue'}>
                        Back
                    </Button>


                    <Text fontFamily={'Epilogue'} fontSize={'4xl'} color='gray.300' mt={3}>
                        Terms and Conditions
                    </Text>


                    <Text fontFamily={'Epilogue'} fontSize={'xl'} color='gray.300' mt={5}>
                        1. Introduction
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        Welcome to ShipJitt! As you have decided to use
                        our services, we kindly ask you to read these Terms
                        and Conditions carefully. By using our services, you
                        agree to comply with these Terms and Conditions.

                        By accessing or using our Service, you agree to bound by these
                        Terms. If you disagree with any part of the terms, then you may not access
                        the Service.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'xl'} color='gray.300' mt={5}>
                        2. Agreement to Terms and Conditions
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        This Agreement takes effect on the date on which you first use the ShipJitt application.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'xl'} color='gray.300' mt={5}>
                        3. Unlimited Access Software License with Termination Rights
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        The ShipJitt Software License facilitates the acquisition of ShipJitt software through a single purchase, granting users unrestricted and perpetual access to its comprehensive functionalities. Tailored for independent creators, entrepreneurs, and small businesses, ShipJitt empowers users to create compelling web pages and online portfolios.

                        This license entails a straightforward and flexible arrangement, exempting users from recurring fees or subscriptions. However, it is important to acknowledge that the licensor retains the right to terminate the license without conditions or prerequisites. This termination provision enables the licensor to exercise control over software distribution and utilization.

                        Opting for the ShipJitt Software License enables users to enjoy the benefits of the software while recognizing the licensor's unrestricted termination rights, which provide adaptability and address potential unforeseen circumstances.

                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'xl'} color='gray.300' mt={5}>
                        4. Refunds
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        Due to the nature of digital products, the ShipJitt software cannot be refunded or exchanged once access is granted.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'xl'} color='gray.300' mt={5}>
                        5. Disclaimer
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        It is not warranted that ShipJitt will meet your requirements or that its operation will be uninterrupted or error-free.
                        All express and implied warranties or conditions not stated in this Agreement (including without limitation, loss of profits,
                        loss or corruption of data, business interruption, or loss of contracts), so far as such exclusion or disclaimer is permitted
                        under applicable law, are excluded and expressly disclaimed. This Agreement does not affect your statutory rights.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'xl'} color='gray.300' mt={5}>
                        6. Warranties and Limitation of Liability
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        The ShipJitt software is provided on an "as is" basis, without any warranties of any kind, either express or implied.
                        The licensor does not guarantee that the software will be error-free or that it will operate without interruption.
                        The licensor shall not be liable for any damages, including but not limited to direct, indirect, special, incidental,
                        or consequential damages or losses that result from the use of or inability to use the software.
                        The licensor shall not be liable for any damages that result from the use of the software in conjunction with other software or hardware.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'xl'} color='gray.300' mt={5}>
                        7. Responsibilites
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        ShipJitt is not responsible for what the user dows with the user-generated content.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'xl'} color='gray.300' mt={5}>
                        8. Price Adjustments
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        As we continue to improve ShipJitt and expand our offerings, the price may be increase. The
                        discount is provided to help customers secure the current price without being surprised by
                        future increases.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'xl'} color='gray.300' mt={5}>
                        9. General Terms and Law
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={2}>
                        This Agreement is governed by the laws of Kosovo. You acknowledge that no joint venture, partnership,
                        employment, or agency relationship exists between you and ShipJitt as a result of your use of these services.
                        You agree not to hold yourself out as a representative, agent or employee of ShipJitt. You agree that ShipJitt will
                        not be liable by reason of any representation, act or omission to act by you.
                    </Text>


                    <Text fontFamily={'Epilogue'} fontSize={'lg'} color='gray.300' mt={5}>
                        Last updated: 22 August 2024.
                    </Text>

                </Box>

            </Container>

        </Box>
    )
}

export default TOS