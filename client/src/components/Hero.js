import  React from 'react';
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
import { useAuth } from '../auth/authContext';

import hero from '../images/hero.svg';

export default function Hero() {
    const { user } = useAuth();
    return (
        <Box
            height={{ base: 'auto', md: 'auto' }}
            width={'full'}
            zIndex={1}
            pb={14}
        >
            <Container maxW='6xl'>
            <Stack
                            align={'center'}
                            spacing={{ base: 8, md: 0 }}
                            py={{ base: 20, md: 0 }} // for medium was 24 py
                            pt={{base: 0, md: 24}}
                            direction={{ base: 'column', md: 'row' }}>
                            <Stack flex={1} spacing={{ base: 5, md: 10 }} alignItems={'center'}>
                                <Heading
                                    display={{base: 'none', md: 'flex'}}
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{ base: '4xl', lg: '6xl' }}
                                    textAlign={'center'}
                                    >

                                    <Text
                                        as={'span'}
                                        position={'relative'}
                                        lineHeight={'1.5'}
                                        fontWeight={'600'}
                                        className='text-select'
                                        color='#fff'
                                        fontFamily={'Epilogue'}
                                        textAlign={'center'}
                                        
                                    >

                                        Build and launch your product <br />10X faster with us.
                                        
                                    </Text>


                                </Heading>

                                <Heading
                                    display={{base: 'block', md: 'none'}}
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    mt={10}
                                    fontSize={{ base: '4xl', lg: '6xl' }}
                                    textAlign={'center'}
                                    >

                                    <Text
                                        as={'span'}
                                        position={'relative'}
                                        lineHeight={'1.5'}
                                        fontWeight={'600'}
                                        className='text-select'
                                        color='#fff'
                                        fontFamily={'Epilogue'}
                                        textAlign={'center'}
                                        
                                    >

                                        Build and launch your product <br />10X faster with us.
                                        
                                    </Text>


                                </Heading>

                                <Text 
                                    color='hsl(240 5% 64.9%)'
                                    opacity={'0.8'}
                                    fontSize={'lg'} fontWeight={500}
                                    fontFamily={'Epilogue'}
                                    textAlign={{base: 'center', md: 'left'}}
                                >
                                    The NodeJS boilerplate with all you need to build your SaaS <br />
                                    or any other web app and make your first $ online fast.
                                </Text>
                                <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'row', sm: 'row' }}>
                                    { user && user ? (
                                        <Button
                                        rounded={'5px'}
                                        size={'md'}
                                        fontWeight={'500'}
                                        px={6}
                                        color="black"
                                        bg={'white'}
                                        _hover={{ bg: 'gray.100' }}
                                        as='a'
                                        href='/dashboard'
                                        fontFamily={'Epilogue'}
                                        width={{base: 'full', sm: 'auto'}}
                                    >
                                        Dashboard
                                    </Button>
                                    ) : (
                                        <Button
                                        rounded={'5px'}
                                        size={'md'}
                                        fontWeight={'500'}
                                        px={6}
                                        color="black"
                                        bg={'white'}
                                        _hover={{ bg: 'gray.100' }}
                                        as='a'
                                        href='/auth/signup'
                                        fontFamily={'Epilogue'}
                                        width={{base: 'full', sm: 'auto'}}
                                    >
                                        Get started
                                    </Button>
                                    )}
                                </Stack>
                            </Stack>
                            {/* <Flex
                                flex={1}
                                justify={'center'}
                                align={'center'}
                                position={'relative'}
                                w={'full'}>

                                <Box
                                    position={'relative'}
                                    height={'auto'}
                                    rounded={'4xl'}
                                    width={'full'}
                                    overflow={'hidden'}>

                                    <Image
                                        alt={'Hero Image'}
                                        fit={'cover'}
                                        align={'center'}
                                        w={{base: 'auto', md: '100%'}}
                                        h={{base: 'auto', md: '100%'}} 
                                        src={
                                            hero
                                        }
                                    />
                                </Box>
                            </Flex> */}
                        </Stack>
                        </Container>
        </Box>
    )
}

