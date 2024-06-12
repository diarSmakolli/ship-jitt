import React, { useState } from 'react';
import { Box, Button, FormLabel, Input, Text, useToast, Container, Flex, Stack, useColorModeValue, Heading, FormControl } from '@chakra-ui/react';
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
        // <Box bg='#0d1117' minH='100vh'>
        // <Container>
        //     <Box py={48}>
        //     <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border="1.5px solid rgba(255,255,255,.12)" >
        //         <Text color="white" fontSize="2xl">Forgot Password</Text>
        //         <FormLabel mt={5} color="gray.200">Email</FormLabel>
        //         <Input
        //             type="email"
        //             color="gray.200"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             required
        //         />
        //         <Button
        //             mt={5}
        //             bg="white"
        //             color="black"
        //             onClick={handleForgotPassword}
        //             isLoading={loading}
        //         >
        //             Submit
        //         </Button>
        //     </Box>
        //     </Box>
        // </Container>
        // </Box>
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg='#0d1117'>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)'
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} color='gray.200'
                    fontFamily={'Bricolage Grotesque'}>
                    Forgot your password?
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.400', 'gray.400')} fontFamily={'Bricolage Grotesque'}>
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
