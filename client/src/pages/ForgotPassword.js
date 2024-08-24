import React, { useState } from 'react';
import { Button, Input, Text, useToast, Flex, Stack, useColorModeValue, Heading, FormControl } from '@chakra-ui/react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [emailError, setEmailError] = useState('');

    const handleForgotPassword = async () => {
        setLoading(true);

        if (!email) {
            setEmailError('Email is required');
            setLoading(false);
            return;
        }

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
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg='#000'>
            
            <Helmet>
                <title>Forgot Password | ShipJitt</title>
            </Helmet>
            
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '2xl' }} color='gray.200'
                    fontFamily={'Epilogue'}>
                    Forgot your password?
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.400', 'gray.400')} fontFamily={'Epilogue'}>
                    You&apos;ll get an email with a reset link
                </Text>
                <FormControl id="email">

                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"
                        color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }}
                    />

                    {emailError && (
                        <Text py={2} color='red.500' fontSize={'md'} fontFamily={'Epilogue'}>
                            {emailError}
                        </Text>
                    )}

                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={'white'}
                        color={'black'}
                        onClick={handleForgotPassword}
                        isLoading={loading}
                        _hover={{
                            bg: 'gray.200',
                            color: 'black'
                        }}>
                        Request Reset
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
};

export default ForgotPassword;
