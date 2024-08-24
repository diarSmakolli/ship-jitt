import React, { useEffect, useState } from 'react';
import { Box, Container, HStack, SimpleGrid, Text, useToast, VStack, Badge, Button } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../auth/authContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function InvoiceDetails() {
    const toast = useToast();
    const [invoice, setInvoice] = useState(null);
    const [amount, setAmount] = useState(null);
    const [taxRate, setTaxRate] = useState(null);
    const [taxAmount, setTaxAmount] = useState(null);
    const [taxableAmount, setTaxableAmount] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const { id } = useParams();
    const { user, loading } = useAuth();


    useEffect(() => {
        fetchInvoice();
    }, [id]);

    const fetchInvoice = async () => {
        try {
            const response = await axios.get(`http://localhost:6099/api/users/${user.id}/invoices/${id}`, {
                withCredentials: true
            });

            const data = response.data;

            setInvoice(data.invoice);

            const fetchedAmount = data.invoice.amount;
            const taxRate = 18;
            const taxAmount = (fetchedAmount * taxRate) / 100;
            const totalAmount = fetchedAmount;
            const taxableAmount = fetchedAmount - taxAmount;

            setAmount(fetchedAmount);
            setTaxRate(taxRate);
            setTaxAmount(taxAmount);
            setTotalAmount(totalAmount);
            setTaxableAmount(taxableAmount);

            console.log(fetchedAmount);
            console.log(taxRate);
            console.log(taxAmount);
            console.log(totalAmount);
            console.log(taxableAmount);

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Box background={'#000'}>

            <Helmet>
                <title>Invoice Details | ShipJitt</title>
            </Helmet>

            <Box>
                <Navbar />
            </Box>

            <Container maxW='6xl'>

                <HStack spacing='10' align={'start'}>

                    <Box width='50%'>

                        <Text color='white' fontFamily={'Epilogue'} fontSize={'2xl'} mt={10} fontWeight={600}>
                            Invoice Details
                        </Text>

                        <Text color='gray.200' fontFamily={'Epilogue'} fontSize={'lg'} mt={5}>
                            This page will display all the invoice information.
                        </Text>

                    </Box>
                </HStack>


                <SimpleGrid columns={1} spacing={10} mt={10}>

                    {invoice && (
                        <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Invoice Number: #{invoice.invoiceNumber}
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Amount: {invoice.amount.toFixed(2)} {invoice.currency.toUpperCase()}
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Date: {invoice.date.toLocaleString()}
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Status: {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}

                                {
                                    invoice.status === 'complete' ?
                                        <Button as='span' size='xs' ml={2} px={4} bg='greenyellow'>Paid</Button>
                                        : null
                                }

                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Currency: {invoice.currency.toUpperCase()}
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Payment Method: {invoice.paymentMethod.charAt(0).toUpperCase() + invoice.paymentMethod.slice(1)} {' '}

                                {
                                    invoice.paymentMethod == 'card' ? '  💳' : null
                                }

                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Package: {invoice.planName}
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Total amount excluding tax: {taxableAmount.toFixed(2)}$
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Tax %: {taxRate}
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Tax in {invoice.currency.toUpperCase()}: {taxAmount.toFixed(2)}
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Total amount including tax: {amount.toFixed(2)}$
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Created At: {invoice.createdAt}
                            </Text>

                            <Text mt={2} color='white' fontSize={'lg'} fontFamily={'Epilogue'} fontWeight={400}>
                                Updated At: {invoice.updatedAt ? invoice.updatedAt : invoice.createdAt}
                            </Text>





                        </Box>
                    )}

                </SimpleGrid>




                <Box py={10}>
                    <Footer />
                </Box>



            </Container>
        </Box>
    )
}

export default InvoiceDetails;