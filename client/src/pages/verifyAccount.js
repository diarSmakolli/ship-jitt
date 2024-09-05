import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Center, Container, Heading, Button } from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { Helmet } from 'react-helmet-async';


function VerifyEmail() {
    const [message, setMessage] = useState('');
    const [continueButton, setContinueButton] = useState(false);
    const [backButton, setBackButton] = useState(false);
    const [responseCo, setResponseCo] = useState('');
    const location = useLocation();

    useEffect(() => {
        const verifyEmail = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');

            try {
                const response = await axios.get('http://localhost:6099/api/users/verify-email', {
                    params: {
                        token: token,
                    },
                    data: {
                        timeZone: 'Europe/Belgrade',
                    },
                });

                setContinueButton(true);



                // setTimeout(() => {
                //     window.location.href = '/';
                // }, 3000);

                setResponseCo(response.data);

                setMessage(response.data.message);
            } catch (error) {
                const { response } = error;

                console.error('Error Response:', response);

                switch (response.data.statusCode) {
                    case 400:
                        setMessage(response.data.message);
                        setResponseCo(response.data);
                        break;
                    default:
                        setMessage('An error occurred during email verification.');
                        setResponseCo(response.data);
                        break;
                }

                setBackButton(true);
                setContinueButton(false);
            }
        };

        verifyEmail();
    }, [location]);

    return (
        // write here code to display the message in center i need horizontal and vertical center

        <Center h='100vh' bg='#000'>
            <Helmet>
                <title>Verify Email | ShipJitt</title>
            </Helmet>
            <Box alignItems={'center'} justifyContent={'center'} p={6}>



                {responseCo.statusCode === 200 ? (
                    <CheckCircleIcon w={10} h={10} color='green.500' />
                ) : (
                    <WarningIcon w={10} h={10} color='red.500' />
                )}

                {message && (
                    <Heading as='h1' size='md' textAlign='start' fontWeight={500} fontFamily={'Epilogue'} color='gray.300' mt={5}>
                        {message}
                    </Heading>
                )}

                {continueButton && (
                    <Container>
                        <Button textAlign='center' color='black' mt={5} as='a' href='/auth/signin'>
                            Continue to Sign in
                        </Button>
                    </Container>
                )}

                {backButton && (
                    <Container>
                        <Button  color='black' mt={5} as='a' href='/'>
                            Go back to Home
                        </Button>
                    </Container>
                )}

            </Box>
        </Center>
    );
}

export default VerifyEmail;


