import React, { useState } from 'react';
import { Box, Button, FormLabel, Input, Text, useToast, Container } from '@chakra-ui/react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleForgotPassword = async () => {
        setLoading(true);
        try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const response = await axios.post('http://localhost:6099/api/users/forgot-password', {
                email,
                timeZone,
            });

            toast({
                title: 'Success',
                description: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || "An error occurred",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box bg='#0d1117' minH='100vh'>
        <Container>
            <Box py={48}>
            <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border="1.5px solid rgba(255,255,255,.12)" >
                <Text color="white" fontSize="2xl">Forgot Password</Text>
                <FormLabel mt={5} color="gray.200">Email</FormLabel>
                <Input
                    type="email"
                    color="gray.200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button
                    mt={5}
                    bg="white"
                    color="black"
                    onClick={handleForgotPassword}
                    isLoading={loading}
                >
                    Submit
                </Button>
            </Box>
            </Box>
        </Container>
        </Box>
    );
};

export default ForgotPassword;
