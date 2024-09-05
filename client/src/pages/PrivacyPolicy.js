import React from 'react';
import { Box, Container, Text, Button } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

function PrivacyPolicy() {
    return (
        <Box bg='#000'>
            <Helmet>
                <title>Privacy Policy | ShipJitt</title>
            </Helmet>

            <Container maxW='2xl'>

                <Box py={14}>

                    <Button as='a' href='/' size='sm' fontFamily={'Epilogue'}>
                        Back
                    </Button>


                    <Text fontFamily={'Epilogue'} fontSize={'4xl'} color='gray.300' mt={3}>
                        Privacy Policy
                    </Text>


                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={4}>
                        Your privacy is important to us. It is ShipJitt's policy to respect your privacy regarding any information we
                        may collect from you across our website, and other sites we own and operate.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={5}>
                        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and
                        lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={5}>
                        We only retain collected information for as long as necessary to provide you with your requested service. What data we store,
                        we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={5}>
                        We don't share any personally identifying information publicly or with third-parties, except when required to by law.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={5}>
                        Our website may link to external sites that are not operated by us. 
                        Please be aware that we have no control over the content and practices of these sites, 
                        and cannot accept responsibility or liability for their respective privacy policies.
                    </Text>

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={5}>
                        We act in the capacity of a data controller and a data processor with regard to the personal data processed 
                        through ShipJitt and the services in terms of the applicable data protection laws, including the EU General Data Protection Regulation (GDPR).
                    </Text> 

                    <Text fontFamily={'Epilogue'} fontSize={'md'} color='gray.300' mt={5}>
                        Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. 
                        If you have any questions about how we handle user data and personal information, feel free to contact us.
                    </Text>


                    <Text fontFamily={'Epilogue'} fontSize={'lg'} color='gray.300' mt={5}>
                        This policy is effective as of 22 August 2024.
                    </Text>

                </Box>

            </Container>

        </Box>
    )
}

export default PrivacyPolicy;