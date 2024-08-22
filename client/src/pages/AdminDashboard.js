import React from 'react';
import Navbar from '../components/Navbar';
import {
    Box, 
    Container, 
    Text,
} from '@chakra-ui/react';
import Hero from '../components/Hero';
import Companies from '../components/Companies';
import Services from '../components/Services';
import FastAccess from '../components/FastAccess';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';
import GetStarted from '../components/GetStarted';
import Testimonial from '../components/Testimonials';
import { Helmet } from 'react-helmet-async';

export default function Dashboard() {
    return (
        <div>
            <Box
                height={'auto'}
                background={'#0d1117'}
            >
                <Helmet>
                    <title>Admin Dashboard | ShipJitt</title>
                </Helmet>

                <Text fontSize={'4xl'} color='gray.100' fontFamily={'Bricolage Grotesque'}>
                    Admin Dashboard
                </Text>
                    <Box>
                        <Navbar />
                        <Hero />
                    </Box>

                    <Container maxW={'6xl'}>
                        <Companies />
                        <FastAccess />
                        <Services />
                        <Pricing />
                        <Testimonial />
                        <GetStarted />
                        <Footer />
                    </Container>

            </Box>
        </div>
    );
}