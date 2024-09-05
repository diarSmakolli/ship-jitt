import React from 'react';
import Navbar from '../components/Navbar';
import {
    Box, 
    Container, 
} from '@chakra-ui/react';
import Hero from '../components/Hero';
import Companies from '../components/Companies';
import Services from '../components/Services';
import FastAccess from '../components/FastAccess';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';
import GetStarted from '../components/GetStarted';
import Testimonial from '../components/Testimonials';

export default function Home() {
    return (
        <div>
            <Box
                height={'auto'}
                background='#000'
            >
                    <Box>
                        <Navbar />
                        <Hero />
                    </Box>



                    <Container maxW={'6xl'}>
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