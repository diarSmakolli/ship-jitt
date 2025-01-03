import React from 'react';

import {
    Box,
    Flex,
    Heading,
    Text,
    Link,
    Button,
    Stack,
    Image,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    IconButton,
    useClipboard,
    Code,
    Textarea,
    Input,
    InputGroup,
    InputRightElement,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Select,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    StackDivider,
    Divider,
    Switch,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    BoxProps,
    useBreakpointValue,
    DrawerContent,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody, Drawer,
    useDisclosure,
    HStack,
    Container,

} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { FaDiscord, FaClipboard, FaBars } from 'react-icons/fa';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
const { useState } = require('react');


const CodeBlock = ({ code }) => {
    const { hasCopied, onCopy } = useClipboard(code);

    return (
        <Box position="relative" color="white" p="4" borderRadius="md" boxShadow="md" maxW="container.md">
            <Code display="block" whiteSpace="pre" overflowX="auto" p="6" bg="rgb(24 24 27)" border='1px solid hsl(240 3.7% 15.9%)' borderRadius="md" color='gray.300'>
                {code}
            </Code>
            <IconButton
                aria-label="Copy to clipboard"
                icon={<FaClipboard />}
                onClick={onCopy}
                position="absolute"
                top="8"
                right="8"
                size="xs"
                color='white'
                bg="transparent"
                _hover={{ bg: 'hsl(240 3.7% 15.9%)' }}
            />
            {hasCopied && (
                <Text position="absolute" top="20" right="4" fontSize="sm" color="green.300" fontFamily={'Geist Sans'}>
                    Copied!
                </Text>
            )}
        </Box>
    );
};


function Docs() {
    const [isOpen, setIsOpen] = useState(false);

    const code = `git clone https://github.com/dijarsmakolli/ship-jitt.git [YOUR_APP_NAME]
cd [YOUR_APP_NAME]
npm install
git remote remove origin
npm run dev for the backend
npm run start for the frontend`;

    const envconf = `DIALECT= example: postgres
HOST=
USERNAME=
PASSWORD=
DATABASE=n
USEREMAIL=
PASSEMAIL=
SECRETJWT=
DEFAULT_TIMEZONE= example: Europe/Paris
MAILGUN_API_KEY=
MAILGUN_DOMAIN=

# Stripe

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=`;

    return (
        <Flex direction="column" bg="#000">
            <Helmet>
                <title>Docs | ShipJitt</title>
            </Helmet>
            <Flex flex="1">
                <Box width={{ base: '100%', md: '300px' }} color="white" padding="8" maxH={'100vh'} bg='#000' pos={'fixed'} overflowY={'scroll'} zIndex={'10'} className='scroller'>
                    <HStack spacing="4" align="start">
                        <Text
                            fontFamily={'Bricolage Grotesque'}
                            color="gray.200"
                            fontSize={'3xl'}
                            fontWeight={'500'}
                        >
                            Ship jitt
                        </Text>

                        <IconButton
                            icon={
                                isOpen ? <CloseIcon w={3} h={3} color='white' _focus={{ color: 'white' }} _hover={{ color: 'white', bg: 'transparent' }} /> : <HamburgerIcon w={5} h={5} color='white' _focus={{ color: 'white' }} _hover={{ color: 'white', bg: 'transparent' }} />
                            }
                            bg='transparent'
                            _focus={{ color: 'white' }}
                            _hover={{ color: 'white', bg: 'transparent' }}
                            aria-label="Open Menu"
                            onClick={() => setIsOpen(true)}
                            display={{ base: 'flex', md: 'none' }}
                            ml='auto'
                        />
                    </HStack>

                    <Box display={{ base: 'none', md: 'block' }} py={10}>
                        <Heading size="sm" color='gray.200' fontFamily="Epilogue"
                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                            Getting started
                        </Heading>

                        <Box rounded='xl' mt={2}>
                            <Heading size="sm" color='gray.200' fontFamily="Epilogue"
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Tutorials
                            </Heading>

                            <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'}
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400} as='a' href='/docs/tutorials/authentication'>
                                Authentication
                            </Text>

                            <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'}
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400} as='a' href='/docs/tutorials/private-page'>
                                Protected routes
                            </Text>

                            <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'}
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400} as='a' href='/docs/tutorials/stripe'>
                                Stripe integration
                            </Text>
                        </Box>

                        <Box rounded='xl' mt={5}>
                            <Heading size="sm" fontFamily="Epilogue" color='gray.200'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Features
                            </Heading>

                            <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'}
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400} as='a' href='/docs/features/database'>
                                Database
                            </Text>

                            <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' as='a' href='/docs/features/emails' display={'flex'}
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Emails
                            </Text>

                            <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/features/payments'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Payments
                            </Text>
                        </Box>

                        <Box rounded='xl' mt={5}>
                            <Heading size="sm" fontFamily="Epilogue" color='gray.200' display={'flex'}
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Components
                            </Heading>

                            <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/navbar'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Navbar
                            </Text>

                            <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/hero'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Hero
                            </Text>

                            <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/fast-access'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Fast Access
                            </Text>

                            <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/services'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Services
                            </Text>

                            <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/pricing'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Pricing
                            </Text>

                            <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/testimonials'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Testimonial
                            </Text>

                            <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/banner'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Banner
                            </Text>

                            <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/footer'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Footer
                            </Text>



                        </Box>

                        <Box rounded='xl' mt={5}>
                            <Heading size="sm" fontFamily="Epilogue" color='gray.200'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Deployment
                            </Heading>
                        </Box>
                    </Box>

                    {/* Hamburger Menu */}


                    {/* Drawer */}
                    <Drawer placement="left" onClose={() => setIsOpen(false)} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent bg="#000" color="white">
                            <DrawerCloseButton />
                            <DrawerHeader color='white'>Menu</DrawerHeader>
                            <DrawerBody>
                                <Box rounded="xl" mt={2}>
                                    <Box rounded='xl' mt={2}>

                                        <Heading size="sm" fontFamily="Epilogue" color='white'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            Introduction
                                        </Heading>


                                        <Heading size="sm" fontFamily="Epilogue" color='white'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            Tutorials
                                        </Heading>

                                        <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'}
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400} as='a' href='/docs/tutorials/authentication'>
                                            Authentication
                                        </Text>

                                        <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'}
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400} as='a' href='/docs/tutorials/private-page'>
                                            Protected routes
                                        </Text>

                                        <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'}
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400} as='a' href='/docs/tutorials/stripe'>
                                            Stripe integration
                                        </Text>
                                    </Box>

                                    <Box rounded='xl' mt={2}>
                                        <Heading size="sm" fontFamily="Epilogue" color='gray.200'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            Features
                                        </Heading>

                                        <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'}
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400} as='a' href='/docs/features/database'>
                                            Database
                                        </Text>

                                        <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' as='a' href='/docs/features/emails' display={'flex'}
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Emails
                                        </Text>

                                        <Text fontFamily="Epilogue" color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/features/payments'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Payments
                                        </Text>
                                    </Box>

                                    <Box rounded='xl' mt={2}>
                                        <Heading size="sm" fontFamily={'Epilogue'} color='gray.200' display={'flex'}
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            Components
                                        </Heading>

                                        <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/navbar'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Navbar
                                        </Text>

                                        <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/hero'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Hero
                                        </Text>

                                        <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/fast-access'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Fast Access
                                        </Text>

                                        <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/services'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Services
                                        </Text>

                                        <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/pricing'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Pricing
                                        </Text>

                                        <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/testimonials'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Testimonial
                                        </Text>

                                        <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/banner'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Banner
                                        </Text>

                                        <Text fontFamily={'Epilogue'} color='hsl(240 5% 64.9%)' display={'flex'} as='a' href='/docs/components/footer'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                            Footer
                                        </Text>
                                    </Box>



                                    <Box rounded='xl' mt={5}>
                                        <Heading size="sm" fontFamily={'Epilogue'} color='gray.200'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            Deployment
                                        </Heading>
                                    </Box>

                                    {/* Add more menu items here */}
                                </Box>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>

                </Box>

                {/* Content Mobile */}

                <Box display={{ base: 'flex', md: 'none' }} bg='#000' width={'100%'} py={20}>

                    <Container maxW={'container.md'}>
                        <Box bg="#000" pb={10} maxW={'100%'} mt={5}>


                            <Text
                                fontFamily={'Epilogue'}
                                color='white'
                                fontSize={'2xl'}
                                fontWeight={600}
                                mt={10}
                            >
                                Getting Started with Ship jitt
                            </Text>


                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'xl'}
                            >
                                Hey maker, welcome to Ship-jitt 👋
                            </Text>

                            <Text
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={500}
                                fontSize={'md'}
                                mt={5}
                            >
                                Here's a quick overview of the boilerplate. Follow along to get your app up and running.
                            </Text>

                            <Text
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={500}
                                fontSize={'md'}
                                mt={5}
                            >
                                Get started with Ship jitt Boilerplate, the trendiest boilerplate for React JS, Node.js, C, Supabase, Stripe & ChatGPT API.
                                Horizon UI Boilerplate comes with over 100+ fully coded & designed frontend components and more than 20+ section & web app page examples
                                giving you the freedom of choosing and combining.
                            </Text>

                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'xl'}
                            >
                                React.js & Node.js project structure
                            </Text>

                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/auth</Code> - Authentication routes
                            </Text>
                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/components</Code> - React components
                            </Text>
                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/images</Code> - Images for the project
                            </Text>
                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/models</Code> - Database models
                            </Text>
                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/middleware</Code> - Middleware functions
                            </Text>
                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/routes</Code> - API routes
                            </Text>
                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/services</Code> - Services for the project
                            </Text>


                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'xl'}
                            >
                                Start a local server
                            </Text>



                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'lg'}
                            >
                                1. In your terminal, run the following commands one-by-one.
                            </Text>

                            <CodeBlock code={code} />

                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'lg'}
                            >
                                2. Configure your environment variables .env file.
                            </Text>

                            <CodeBlock code={envconf} />

                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'lg'}
                            >
                                3. Open http://localhost:3000 to see your site. And voila!
                            </Text>



                            <Text mt={5}
                                fontFamily={'Epilogue'}
                                color='white'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                Now go ahead to the Tutorials section to get the app live within 5 minutes.
                            </Text>




                        </Box>
                    </Container>
                </Box>

                {/* Content */}

                <Box display={{ base: 'none', md: 'flex' }} bg='#000' width={'100%'} pl={80}>
                    <Box bg='#000' height={'full'}>
                        <Box rounded='xl' bg='#000'>
                            {/* bg='hsl(240 10% 3.9%)' */}
                            <Box bg="#000   " pb={10}>

                                <Text
                                    fontFamily={'Epilogue'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={400}
                                    fontSize={'sm'}
                                    mt={24}
                                >
                                    Docs {' > '}
                                </Text>


                                <Text
                                    fontFamily={'Epilogue'}
                                    color='#fff'
                                    fontSize={'4xl'}
                                    fontWeight={700}
                                    mt='2'
                                >
                                    Introduction
                                </Text>


                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='gray.50'
                                    fontWeight={600}
                                    fontSize={'xl'}
                                >
                                    Hey maker, welcome to Ship-jitt 👋
                                </Text>

                                <Text
                                    ffontFamily={'Epilogue'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                    mt={5}
                                >
                                    Here's a quick overview of the boilerplate. Follow along to get your app up and running.
                                </Text>

                                <Text
                                    fontFamily={'Geist Sans'}
                                    color='gray.200'
                                    fontWeight={400}
                                    maxW={'700px'}
                                    fontSize={'md'}
                                    mt={5}
                                >
                                    Get started with Ship jitt Boilerplate, the trendiest boilerplate for React JS, Node.js, Sequelize, Stripe & ChatGPT API.
                                    ShipJitt comes with over 100+ fully coded & designed frontend components and more than 20+ section & web app page examples
                                    giving you the freedom of choosing and combining.
                                </Text>

                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={500}
                                    fontSize={'lg'}
                                >
                                    React.js & Node.js project structure
                                </Text>

                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={500}
                                    fontSize={'md'}
                                >
                                    <Code bg='transparent' border='1px solid rgb(255,255,255,0.3)' color='gray.200' px={3} rounded='lg'>/auth</Code> - Authentication routes
                                </Text>
                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={500}
                                    fontSize={'md'}
                                >
                                    <Code bg='transparent' border='1px solid rgb(255,255,255,0.3)' color='gray.200' px={3} rounded='lg'>/components</Code> - React components
                                </Text>
                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={500}
                                    fontSize={'md'}
                                >
                                    <Code bg='transparent' border='1px solid rgb(255,255,255,0.3)' color='gray.200' px={3} rounded='lg'>/images</Code> - Images for the project
                                </Text>
                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={500}
                                    fontSize={'md'}
                                >
                                    <Code bg='transparent' border='1px solid rgb(255,255,255,0.3)' color='gray.200' px={3} rounded='lg'>/models</Code> - Database models
                                </Text>
                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={500}
                                    fontSize={'md'}
                                >
                                    <Code bg='transparent' border='1px solid rgb(255,255,255,0.3)' color='gray.200' px={3} rounded='lg'>/middleware</Code> - Middleware functions
                                </Text>
                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={500}
                                    fontSize={'md'}
                                >
                                    <Code bg='transparent' border='1px solid rgb(255,255,255,0.3)' color='gray.200' px={3} rounded='lg'>/routes</Code> - API routes
                                </Text>
                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={500}
                                    fontSize={'md'}
                                >
                                    <Code bg='transparent' border='1px solid rgb(255,255,255,0.3)' color='gray.200' px={3} rounded='lg'>/service</Code> - Application services for the project
                                </Text>


                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='gray.100'
                                    fontWeight={500}
                                    fontSize={'xl'}
                                >
                                    Start a local server
                                </Text>



                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    1. In your terminal, run the following commands one-by-one.
                                </Text>

                                <CodeBlock code={code} />

                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    2. Configure your environment variables .env file.
                                </Text>

                                <CodeBlock code={envconf} />

                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    3. Open http://localhost:3000 to see your site. And voila!
                                </Text>



                                <Text mt={5}
                                    fontFamily={'Epilogue'}
                                    color='gray.100'
                                    fontWeight={500}
                                    fontSize={'md'}
                                >
                                    Now go ahead to the Tutorials section to get the app live within 5 minutes.
                                </Text>




                            </Box>
                        </Box>
                    </Box>
                </Box>



            </Flex>
        </Flex>
    );
}



export default Docs;