import React, { useEffect, useState } from 'react';
import { Box, Container, HStack, SimpleGrid, Text, useToast, VStack, Badge, Button } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../auth/authContext';
import axios from 'axios';

function Invoices() {
    const toast = useToast();

    const { user, loading } = useAuth();
    const [invoices, setInvoices] = useState([]);
    
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
            const response = await axios.get(`
                http://localhost:6099/api/users/${user.id}/invoices`, {
                    withCredentials: true
                });


                setInvoices(response.data.invoices);
                console.log(response.data);
            } catch(error) {
                console.log(error);
            }
        }

        fetchInvoices();
    }, []);

    
  return (
    <Box background={'#000'}>


            <Box>
                <Navbar />
            </Box>

            <Container maxW='6xl'>

                <HStack spacing='10' align={'start'}>

                    <Box width='50%'>

                        <Text color='white' fontFamily={'Geist Sans'} fontSize={'2xl'} mt={10} fontWeight={600}>
                            Invoices Information
                        </Text>

                        <Text color='gray.200' fontFamily={'Bricolage Grotesque'} fontSize={'lg'} mt={5}>
                            This page will display all the invoices information.
                        </Text>

                    </Box>       
                </HStack>


                <SimpleGrid columns={3} spacing={10} mt={10}>

                    {invoices.map((invoice) => (
                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily="Geist Sans" fontWeight={500}>
                                Invoice: {invoice.invoiceNumber}
                            </Text>
                            <Text mt={2} color='white' fontSize={'md'} fontFamily="Geist Sans" fontWeight={500}>
                                Amount: {invoice.amount.toFixed(2)} {invoice.currency.toUpperCase()}
                                {/* {invoice.currency.charAt(0).toUpperCase() + invoice.currency.slice(1)}  */}
                                
                            </Text>
                            <Text mt={2} color='white' fontSize={'md'} fontFamily="Geist Sans" fontWeight={500}>
                                To: {user.email}
                            </Text>
                            <Text mt={2} color='white' fontSize={'md'} fontFamily="Geist Sans" fontWeight={500}>
                                From: ShipJitt
                            </Text>
                            <Text mt={2} color='white' fontSize={'md'} fontFamily="Geist Sans" fontWeight={500}>
                                Date: {invoice.date}
                            </Text>
                            <Text mt={2} color='white' fontSize={'md'} fontFamily="Geist Sans" fontWeight={500}>
                                Status: {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)} 
                                
                                {
                                    invoice.status === 'complete' ? 
                                    <Button as='span' size='xs' ml={2} px={4} bg='greenyellow'>Paid</Button>
                                    : null
                                }

                            </Text>

                            <Button as='a' size='sm' mt={5} width='full' href={`/invoices/${invoice.id}`}>View Details</Button>

                    </Box>
                    ))}

                  </SimpleGrid>


              

                <Box py={10}>
                    <Footer />
                </Box>



            </Container>
        </Box>
  )
}

export default Invoices