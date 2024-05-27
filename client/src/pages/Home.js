import React from 'react';
import Navbar from '../components/Navbar';
import {
    Box, Container, Heading, Text, Image,
    Button, Stack, Flex, useColorModeValue,

} from '@chakra-ui/react';
import Hero from '../components/Hero';
import Companies from '../components/Companies';
import Services from '../components/Services';

export default function Home() {
    return (
        <div>
            <Box
                height={'200vh'}
                background={'#0d1117'}
            >
                    <Box>
                        <Navbar />
                        <Hero />
                    </Box>

                    <Container maxW={'6xl'}>
                        <Companies />
                        <Services />
                    </Container>

            </Box>
        </div>
    );
}