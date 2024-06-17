import React from 'react';
import {
    Box,
    Text,
    Stack,
    useColorModeValue,
    Container
} from '@chakra-ui/react';


export default function HeroSupportCenter() {
    return (
        <Box
            // bgImage='https://cdn.auth0.com/website/cic-homepage/hero/gradient-bg'
            // bgPosition='center'
            // bgSize='cover'
            // bgRepeat='no-repeat'
            // position={'relative'}
            height={{ base: 'auto', md: 'auto' }}
            width={'full'}
            borderBottomRadius={'5%'}
            zIndex={1}
            pb={14}
        >
            <Container maxW='6xl'>
                <Stack
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 0 }} // for medium was 24 py
                    pt={{ base: 0, md: 12 }}
                    direction={{ base: 'column', md: 'row' }}>
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>


                        <Text
                            as={'span'}
                            position={'relative'}
                            fontFamily={'Geist Sans'}
                            lineHeight={'1.5'}
                            textAlign={'center'}
                            fontWeight={700}
                            className='text-select'
                            color={useColorModeValue('#fff', 'black')}
                            fontSize={'5xl'}

                        >

                            How can we help?

                        </Text>

                        <Text 
                            color='hsl(240 5% 64.9%)'
                            fontSize={'lg'} fontWeight={500}
                            fontFamily={'Epilogue'}
                            textAlign={{ base: 'center', md: 'center' }}
                        >
                            We are here to help you with any issues you may have.  <br /> Please check our documentation or contact us for further assistance.
                        </Text>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}