import React from 'react';
import {
    Box,
    Heading,
    Text,
    Stack,
    Button,
    Image,
    Flex,
    useColorModeValue,
    Container
} from '@chakra-ui/react';

// import CheckIcon from chakra ui icons
import { CheckIcon } from '@chakra-ui/icons';
import hero from '../images/hero.svg';



export default function HeroSupportCenter() {
    return (
        <Box
            // i need to pass this bg image but in the mobile this bg image gradient is not under image of hero but under it can u fix it please
            bgImage='https://cdn.auth0.com/website/cic-homepage/hero/gradient-bg'
            bgPosition='center'
            bgSize='cover'
            bgRepeat='no-repeat'
            position={'relative'}
            height={{ base: 'auto', md: 'auto' }}
            width={'full'}
            // display={'flex'}
            // justifyContent={'center'}
            // alignItems={'center'}
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
                            fontFamily={'Bricolage Grotesque'}
                            lineHeight={'1.5'}
                            textAlign={'center'}
                            fontWeight={700}
                            className='text-select'
                            color={useColorModeValue('#fff', 'black')}
                            fontSize={'5xl'}

                        >

                            How can we help?

                        </Text>

                        <Text color={useColorModeValue('#CFCFCF', 'gray.700')}
                            opacity={'0.8'}
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