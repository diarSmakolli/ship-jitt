import React, { useEffect, useState } from 'react';
import { Box, Container, HStack, SimpleGrid, Text, useToast, VStack, Badge, Button, Stack, Divider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../auth/authContext';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function Notifications() {
    const toast = useToast();

    const { user, loading } = useAuth();
    const [invoices, setInvoices] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`
                    http://localhost:6099/api/users/notifications/${user.id}`, {
                    withCredentials: true
                });

                setNotifications(response.data.notifications)
                console.log("Notifications: ", response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchNotifications();
    }, []);


    return (
        <Box background={'#000'}>

            <Helmet>
                <title>Notifications | ShipJitt</title>
            </Helmet>


            <Box>
                <Navbar />
            </Box>

            <Container maxW='6xl'>

                <HStack spacing='10' align={'start'}>

                    <Box width={{ base: '100%', md: '50%' }}>

                        <Text color='white' fontFamily={'Epilogue'} fontSize={'2xl'} mt={10} fontWeight={600}>
                            Notifications Information
                        </Text>

                        <Text color='gray.300' fontFamily={'Epilogue'} fontSize={'lg'} mt={5}>
                            This page will display all the notifications information.
                        </Text>

                    </Box>
                </HStack>


                <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10} mt={10}>


                    <Box h='auto' bg="rgba(0,0,0,.5)" borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Box bg='#1C1C1C' border p={5} color='white' roundedTopLeft={'1rem'} roundedTopRight={'1rem'} >
                            Info
                        </Box>

                        <Box h='500px' p={5} overflowY='auto'>
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <>
                                        <Stack columns={2} direction={'row'} py={3}>
                                            <Text color='gray.300' fontFamily={'Epilogue'} fontSize={'md'} width='30%'>
                                                Title
                                            </Text>

                                            <Text color='gray.300' fontFamily={'Epilogue'} fontSize={'md'} width='50%'>
                                                {notification.title}
                                            </Text>
                                        </Stack>

                                        <Stack columns={1} direction={'row'} mt={1}>
                                            <Text color='gray.300' fontFamily={'Epilogue'} fontSize={'md'} width='30%'>
                                                Time of Notification
                                            </Text>
                                            <Text color='gray.300' fontFamily={'Epilogue'} fontSize={'md'} width='50%'>
                                                {notification.createdAt ? notification.createdAt : 'N/A'}
                                            </Text>
                                        </Stack>

                                        <Stack columns={1} direction={'row'} mt={1}>
                                            <Text color='gray.300' fontFamily={'Epilogue'} fontSize={'md'} width='30%'>
                                                Description
                                            </Text>
                                            <Text color='gray.300' fontFamily={'Epilogue'} fontSize={'md'} width='50%'>
                                                {notification.message}
                                            </Text>
                                        </Stack>
                                        <Divider mt={1} />
                                    </>
                                ))
                            ) : (
                                <Text color='gray.300' fontFamily={'Epilogue'} fontSize={'md'} mt={5}>
                                    No Notifications
                                </Text>
                            )}
                        </Box>
                    </Box>
                </SimpleGrid>

                <Box py={10}>
                    <Footer />
                </Box>

            </Container>
        </Box>
    )
}

export default Notifications;