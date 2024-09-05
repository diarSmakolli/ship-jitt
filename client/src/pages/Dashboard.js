import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import {
    Box, Container, Text,
    Stack, FormControl, FormLabel, Input,
    Button, HStack, Image, Divider, useToast
} from '@chakra-ui/react';
import Hero from '../components/Hero';
import Companies from '../components/Companies';
import Services from '../components/Services';
import FastAccess from '../components/FastAccess';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';
import GetStarted from '../components/GetStarted';
import Testimonial from '../components/Testimonials';
import axios from 'axios';
import { useAuth } from '../auth/authContext';
import { Helmet } from 'react-helmet-async';

export default function Dashboard() {

    const [githubUsername, setGithubUsername] = React.useState('');
    const [githubRequest, setGithubRequest] = React.useState(null);
    const toast = useToast();
    const { user, loading } = useAuth();
    const [githubUsernameError, setGithubUsernameError] = React.useState('');

    useEffect(() => {
        if (!user || loading) return;

        const fetchGithubRequest = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:6099/api/users/github-requests?userId=${user.id}`,
                    { withCredentials: true }
                );

                if (Array.isArray(response.data.githubRequests) && response.data.githubRequests.length > 0) {
                    setGithubRequest(response.data.githubRequests[0]);
                } else {
                    setGithubRequest(null);
                }

            } catch (error) {
                console.log(error);
                // const { response } = error;
                // if (response) {
                //     switch (response.data.statusCode) {
                //         case 403:
                //             toast({
                //                 title: 'Forbidden',
                //                 description: response.data.message,
                //                 status: 'warning',
                //                 duration: 3000,
                //                 position: 'top right',
                //                 isClosable: true,
                //             });
                //             break;
                //         case 400:
                //             toast({
                //                 title: 'Bad request',
                //                 description: response.data.message,
                //                 status: 'error',
                //                 duration: 3000,
                //                 position: 'top right',
                //                 isClosable: true,
                //             });
                //             break;
                //         case 401:
                //             toast({
                //                 title: 'Unauthorized',
                //                 description: response.data.message,
                //                 status: 'error',
                //                 duration: 3000,
                //                 position: 'top right',
                //                 isClosable: true,
                //             });
                //             break;
                //         case 404:
                //             toast({
                //                 title: 'Not found',
                //                 description: response.data.message,
                //                 status: 'warning',
                //                 duration: 3000,
                //                 position: 'top right',
                //                 isClosable: true,
                //             });
                //             break;
                //         default:
                //             toast({
                //                 title: 'Internal Server Error',
                //                 description: "An error has occurred and we're working to fix the problem!",
                //                 status: 'error',
                //                 duration: 3000,
                //                 position: 'top right',
                //                 isClosable: true,
                //             });
                //             break;
                //     }
                // }
            }
        };

        fetchGithubRequest();
    }, [user, loading]);

    const handleRequestAccess = async () => {

        if (!githubUsername) {
            setGithubUsernameError('Github email is required');
            return;
        };

        try {
            const response = await axios.post(
                'http://localhost:6099/api/users/github-request', {
                withCredentials: true,
                userId: user.id,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                email: githubUsername
            }
            );

            toast({
                title: 'Success',
                description: 'You will receive an email from Github to confirm your access.',
                status: 'success',
                duration: 3000,
                position: 'top right',
                isClosable: true,
            });

            console.log(response.data);
        } catch (error) {
            console.log(error);

            const { response } = error;

            switch (response.data.statusCode) {
                case 403:
                    toast({
                        title: 'Forbidden',
                        description: response.data.message,
                        status: 'warning',
                        duration: 3000,
                        position: 'top right',
                        isClosable: true,
                    });
                    break;
                case 400:
                    toast({
                        title: 'Bad request',
                        description: response.data.message,
                        status: 'error',
                        duration: 3000,
                        position: 'top right',
                        isClosable: true,
                    });
                    break;
                case 401:
                    toast({
                        title: 'Unauthorized',
                        description: response.data.message,
                        status: 'error',
                        duration: 3000,
                        position: 'top right',
                        isClosable: true,
                    });
                    break;
                case 404:
                    toast({
                        title: 'Not found',
                        description: response.data.message,
                        status: 'warning',
                        duration: 3000,
                        position: 'top right',
                        isClosable: true,
                    });
                    break;
                default:
                    toast({
                        title: 'Internal Server Error',
                        description:
                            "An Error has occurred and we're working to fix the problem!",
                        status: 'error',
                        duration: 3000,
                        position: 'top right',
                        isClosable: true,
                    });
                    break;
            }

        }
    }



    return (
        <div>
            <Box
                height={'auto'}
                background={'#000'}
            >
                <Helmet>
                    <title>Dashboard | ShipJitt</title>
                </Helmet>


                <Box>

                    <Navbar />

                </Box>

                <Container maxW={'6xl'}>

                    <Stack direction={{base: 'column', md: 'row'}} columns={2} py={{base: 10, md: 20}}>
                        <Box width={{base: '100%', md: '70%'}}>

                            <Text
                                textAlign={'left'}
                                color='white'
                                fontFamily={'Epilogue'}
                                fontSize={{ base: 'xl', md: '4xl' }}
                                fontWeight={'600'}
                            >
                                Ship Jitt Boilerplate
                            </Text>

                            {!githubRequest || githubRequest.status != 'accepted' ? (
                                <Text
                                    textAlign={'left'}
                                    color='gray.300'
                                    fontFamily={'Epilogue'}
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    pt={{base: 3, md: 0}}
                                    fontWeight={'400'}
                                >
                                    Enter your Github username to get access in repository.
                                    <br />
                                    You'll receive an email from Github to confirm your access.
                                </Text>
                            ) : null}

                            {!githubRequest || githubRequest.status != 'accepted' ?
                                (
                                    <>
                                        <FormControl mt={5}>
                                            <FormLabel color='gray.200'>Github username</FormLabel>
                                            <Input
                                                value={githubUsername}
                                                onChange={(e) => setGithubUsername(e.target.value)}
                                                width={{ base: '100%', md: '500px' }}
                                                border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)" color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }}
                                            />
                                        </FormControl>

                                        {githubUsernameError && (
                                            <Text py={2} color='red.500' fontSize={'md'} fontFamily={'Epilogue'}>
                                                {githubUsernameError}
                                            </Text>
                                        )}

                                    </>

                                ) : null}


                            {!githubRequest || githubRequest.status != 'accepted' ? (
                                <Button
                                    width={{ base: '100%', md: '500px' }}
                                    bg="white"
                                    color="black"
                                    mt={4}
                                    _hover={{ bg: "gray.300" }}
                                    onClick={handleRequestAccess}
                                    fontFamily={'Epilogue'}
                                >
                                    Request Access
                                </Button>
                            ) : null}

                            {githubRequest && githubRequest.status == 'accepted' ? (
                                <Text
                                    textAlign={'left'}
                                    color='gray.300'
                                    fontFamily={'Epilogue'}
                                    fontSize={{ base: 'xl', md: 'lg' }}
                                    fontWeight={'400'}
                                >
                                    You have access to the repository. Start building your project now!
                                </Text>
                            ) : null}

                            <Divider color='gray.700' pt='4' />

                            {githubRequest && githubRequest.status == 'accepted' ? (
                                <Text
                                    py={3}
                                    textAlign={'left'}
                                    color='gray.300'
                                    fontFamily={'Epilogue'}
                                    fontSize={{ base: 'xl', md: 'lg' }}
                                    fontWeight={'400'}
                                >
                                    Go to Documentation now and see how to use the boilerplate.
                                </Text>
                            ) : null}


                            <Text
                                textAlign={'left'}
                                color='gray.300'
                                fontFamily={'Epilogue'}
                                fontSize={{ base: 'md', md: 'md' }}
                                fontWeight={'400'}
                                mt={5}
                            >
                                1. Request access to the repository.
                                <br />
                                2. Check your email for Github invitation.
                                <br />
                                3. Start with the Documentation and using the boilerplate.
                            </Text>


                        </Box>


                        <Box height={'auto'} width={{base: '100%', md: '30%'}} p={5} borderLeft={'1px'} borderColor={'gray.700'}>



                            <HStack>
                                <Image src="https://shipfa.st/_next/static/media/javascript.15da7f96.png"
                                    width='35px' height='35px' rounded={'lg'}
                                />
                                <Text
                                    textAlign={'left'}
                                    color='gray.300'
                                    fontFamily={'Epilogue'}
                                    fontSize={{ base: 'sm', md: 'sm' }}
                                    fontWeight={'600'}
                                    as='a'
                                    target='_blank'
                                    href='https://github.com/diarSmakolli/ship-jitt'
                                >
                                    JavaScript Repository
                                </Text>
                            </HStack>

                            <HStack py={5}>
                                <Image src="https://shipfa.st/_next/static/media/javascript.15da7f96.png"
                                    width='35px' height='35px' rounded={'lg'} />
                                <Text
                                    textAlign={'left'}
                                    color='gray.300'
                                    fontFamily={'Epilogue'}
                                    fontSize={{ base: 'sm', md: 'sm' }}
                                    fontWeight={'600'}
                                    as='a'
                                    target='_blank'
                                    href='/docs'
                                >
                                    Documentation
                                </Text>
                            </HStack>

                            <Divider color='gray.700' />

                            <Text
                                mt={2}
                                textAlign={'left'}
                                color='white'
                                fontFamily={'Epilogue'}
                                fontSize={{ base: 'lg', md: 'xl' }}
                                fontWeight={'600'}
                            >
                                Welcome to Ship Jitt!

                            </Text>

                            <Text
                                mt={2}
                                textAlign={'left'}
                                color='gray.300'
                                fontFamily={'Epilogue'}
                                fontSize={{ base: 'md', md: 'md' }}
                                fontWeight={'500'}
                            >
                                It help you ship your startup faster and get $.

                                Excited to see what you will build with it.

                            </Text>

                            <Text
                                mt={2}
                                textAlign={'left'}
                                color='gray.300'
                                fontFamily={'Epilogue'}
                                fontSize={{ base: 'md', md: 'md' }}
                                fontWeight={'500'}
                            >
                                It's normal to want to add features and overthink it. Remember, the goal is to ship fast and get feedback. <br />
                                Use the boilerplate and launch ASAP. That's the only way to know if your idea is worth it.
                                <br /><br />
                                Thank you for your trust! <br />
                                - Code Sculp LL.C

                            </Text>

                            <Button
                                bg="white"
                                color="black"
                                mt={4}
                                _hover={{ bg: "gray.300" }}
                                as='a'
                                size='sm'
                                href="mailto:support@shipjitt.com"
                            >
                                Talk to support
                            </Button>


                        </Box>
                    </Stack>

                    <Footer />

                </Container>

            </Box>
        </div>
    );
}