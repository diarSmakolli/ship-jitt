import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Center, Container, Heading, Button} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';


function VerifyEmail() {
    const [message, setMessage] = useState('');
    const [continueButton, setContinueButton] = useState(false);
    const [backButton, setBackButton] = useState(false);
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
                        timeZone: 'Europe/Belgrade', // replace with your time zone
                    },
                });

                setContinueButton(true);

                

                // setTimeout(() => {
                //     window.location.href = '/';
                // }, 3000);

                setMessage(response.data.message);
            } catch (error) {
                const { response } = error;

                console.error('Error Response:', response);

                switch (response.data.statusCode) {
                    case 400:
                        setMessage(response.data.message);
                        break;
                    default:
                        setMessage('An error occurred during email verification.');
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
        <Center h='100vh' bg='#0d1117'>
            <Box alignItems={'center'} justifyContent={'center'}>
                <CheckCircleIcon color='green.500' boxSize={16} />
                <Heading as='h1' size='md' textAlign='center' fontFamily={'Bricolage Grotesque'} color='gray.200' mt={5}>
                    {message}
                </Heading>

                {continueButton && (
                    <Container>
                        <Button textAlign='center' color='black' mt={5} as='a' href='/auth/signin'>
                           Continue to Sign in
                        </Button>
                    </Container>
                )}

                {backButton && (
                    <Container>
                        <Button textAlign='center' color='black' mt={5} as='a' href='/'>
                            Go back to Home
                        </Button>
                    </Container>
                )}

            </Box>
        </Center>
    );
}

export default VerifyEmail;


