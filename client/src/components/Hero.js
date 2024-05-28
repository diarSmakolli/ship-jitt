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

// import CheckIcon from chakra ui icons
import { CheckIcon } from '@chakra-ui/icons';



export default function Hero() {
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
        >
            <Container maxW='6xl'>
            <Stack
                            align={'center'}
                            spacing={{ base: 8, md: 10 }}
                            py={{ base: 20, md: 0 }} // for medium was 24 py
                            pt={{base: 0, md: 12}}
                            direction={{ base: 'column', md: 'row' }}>
                            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                                <Heading
                                    display={{base: 'none', md: 'block'}}
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{ base: '4xl', lg: '6xl' }}
                                    >

                                    <Text
                                        as={'span'}
                                        position={'relative'}
                                        fontFamily={'Questrial'}
                                        lineHeight={'1.5'}
                                        fontWeight={700}
                                        className='text-select'
                                        color={useColorModeValue('#fff', 'black')}
                                        
                                    >

                                       Supercharge your projects with <br />
                                        <Box ml={2} display='inline'>
                                            <Text as='span' className='text-gradient' 
                                            // border='1px solid rgb(150, 152, 157)' 
                                            rounded={{base: '2xl', md: '3xl'}} pr={4}> 
                                                {' '} Ship jitt
                                            </Text>
                                        </Box>
                                        
                                    </Text>


                                </Heading>

                                <Heading
                                    display={{base: 'block', md: 'none'}}
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{ base: '4xl', lg: '6xl' }}
                                    textAlign={'center'}
                                    >

                                    <Text
                                        as={'span'}
                                        position={'relative'}
                                        fontFamily={'Poppins'}
                                        lineHeight={'1.5'}
                                        fontWeight={700}
                                        className='text-select'
                                        color={useColorModeValue('#fff', 'black')}
                                        
                                    >

                                       Supercharge your projects with <br />
                                        <Box ml={2} display='inline'>
                                            <Text as='span' className='text-gradient' 
                                            border='1px solid rgb(150, 152, 157)' 
                                            rounded={{base: '2xl', md: '3xl'}} pr={3} pl={2}>
                                                {' '} Ship jitt
                                            </Text>
                                        </Box>
                                        
                                    </Text>


                                </Heading>

                                <Text color={useColorModeValue('#CFCFCF', 'gray.700')}
                                    opacity={'0.8'}
                                    fontSize={'lg'} fontWeight={500}
                                    fontFamily={'Epilogue'}
                                    textAlign={{base: 'center', md: 'left'}}
                                >
                                    The NodeJS boilerplate with all you need to build your SaaS
                                    or any other web app and make your first $ online fast.
                                </Text>
                                <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'row', sm: 'row' }}>
                                    <Button
                                        rounded={'5px'}
                                        size={'lg'}
                                        fontWeight={'500'}
                                        px={6}
                                        color="black"
                                        bg={'white'}
                                        _hover={{ bg: 'gray.100' }}
                                        as='a'
                                        href='/contact'
                                        fontFamily={'Bricolage Grotesque'}
                                        width={{base: 'full', sm: 'auto'}}
                                    >
                                        Get started with <Text as='span'>Ship jitt</Text>
                                    </Button>



                                </Stack>
                            </Stack>
                            <Flex
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
                                            'https://shipfa.st/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdemo.a9a3174c.png&w=3840&q=75'
                                        }
                                    />
                                </Box>
                            </Flex>
                        </Stack>
                        </Container>
        </Box>
    )
}