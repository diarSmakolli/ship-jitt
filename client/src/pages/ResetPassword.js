import React, { useState } from 'react';
import { Box, Button, FormLabel, Input, Text, useToast, Container } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleResetPassword = async () => {

        let hasError = false;

        if (!newPassword) {
            setNewPasswordError('New Password is required');
            hasError = true;
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Confirm Password is required');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        if (newPassword !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        

        setLoading(true);
        try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const response = await axios.post(`http://localhost:6099/api/users/reset-password/${token}`, {
                newPassword,
                confirmPassword,
                timeZone,
            });

            console.log(response);

            toast({
                title: 'Success',
                description: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setTimeout(() => {
                window.location.href = '/auth/signin';
            }, 2000);

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
        <Box bg='#000' minH='100vh'>

            <Helmet>
                <title>Reset Password | ShipJitt</title>
            </Helmet>

            <Container>
                <Box py={48}>
                    <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border="1.5px solid rgba(255,255,255,.12)">
                        <Text color="white" fontSize="2xl" fontFamily={'Epilogue'}>Reset Password</Text>
                        <FormLabel mt={5} color="gray.200">New Password</FormLabel>
                        <Input
                            type="password"
                            color="gray.200"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }}
                            required
                        />

                        {newPasswordError && (
                            <Text py={2} color='red.500' fontSize={'md'} fontFamily={'Epilogue'}>
                                {newPasswordError}
                            </Text>
                        )}

                        <FormLabel mt={5} color="gray.200">Confirm New Password</FormLabel>
                        <Input
                            type="password"
                            color="gray.200"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }}
                            required
                        />

                        {confirmPasswordError && (
                            <Text py={2} color='red.500' fontSize={'md'} fontFamily={'Epilogue'}>
                                {confirmPasswordError}
                            </Text>
                        )}

                        <Button
                            mt={5}
                            bg="white"
                            color="black"
                            onClick={handleResetPassword}
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

export default ResetPassword;
