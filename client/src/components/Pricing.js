import { React, useState } from 'react';
import {
    Box,
    Text,
    SimpleGrid,
    Button,
    VStack,
    HStack,
    useToast,
} from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {useAuth} from '../auth/authContext';
import axios from 'axios';

const starterPriceId = 'price_1PIcjiP1jRGQyMPG1shY69it';
const allinPriceId = 'price_1PIZ7TP1jRGQyMPGkZlMPkmT';
let al;
 
 
const Pricing = () => {
    const toast = useToast();
    const { user, loading } = useAuth();
    const [starterPlanUrl, setStarterPlanUrl] = useState('');
    const [allInPlanUrl, setAllInPlanUrl] = useState('');

    const handleStarterPlan = async () => {

        if(!user) {
            window.location.href = '/auth/signin';
        }

        if(user.priceId === starterPriceId) {
            toast({
                title: 'You already have access to this plan',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // implement the logic if the user have the all in plan and need to buy the starter plan disallow because already have the all in plan
        if(user.priceId === allinPriceId) {
            toast({
                title: 'You already have access to the all in plan',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:6099/api/stripe/create-checkout-session', {
                priceId: starterPriceId,
                userId: user.id,
                email: user.email,
            });
            setStarterPlanUrl(response.data.url);
            console.log(starterPlanUrl);
            window.open(response.data.url, '_blank');
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    const handleAllinPlan = async () => {
        if(!user) {
            window.location.href = '/auth/signin';
        }

        if(user.priceId === allinPriceId) {
            toast({
                title: 'You already have access to this plan',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
            return;
        }


        try {
            const response = await axios.post('http://localhost:6099/api/stripe/create-checkout-session', {
                priceId: allinPriceId,
                userId: user.id,
                email: user.email,
            });
            // window.location.href = response.data.url;
            setAllInPlanUrl(response.data.url);
            console.log(allInPlanUrl);
            window.open(response.data.url, '_blank');
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };
        
    return (
        <Box py={20}>
 
 
            <Button
                bg='transparent'
                color='white'
                border='1.5px solid rgba(255,255,255,.12)'
                rounded='3xl'
                fontFamily={'Geist Sans'}
                fontWeight={500}
            >
                Pricing
            </Button>
 
 
            <Text
                // textAlign={'center'}
                color='white'
                fontFamily={'Geist Sans'}
                fontSize={{ base: 'xl', md: '5xl' }}
                fontWeight={'600'}
            >
                Take flight with Ship Jitt
            </Text>
 
            <Text
                color='#8b949e'
                fontWeight={500}
                fontFamily={'Geist Sans'}
                mt={2}
                fontSize={'lg'}
            >
                Developers all over the world use ShipJitt to build faster,  drive impact <br />
                and focus on doing what matters most: building great software
            </Text>
 
            <Box bg='#000' borderRadius={'20px'}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} mt={20} borderRadius={'1rem'} border='1px solid hsl(240 3.7% 15.9%)'>
 
                <Box
                        // bg="rgba(0,0,0,.5)"
                        bg='transparent'
                        // borderRadius="1.5rem"
                        p={9}
                        // border="1.5px solid rgba(255,255,255,.12)"
                        // borderRight={'1px'}
                        borderRight='1px'
                        borderColor={'hsl(240 3.7% 15.9%)'}
                        textAlign="left"
                    >
                        <VStack align="start">
                            <Text fontSize="2xl" color="white" fontFamily="Syne" fontWeight={600}>Shipjitt starter</Text>
                            <Text mt={2} color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                For individual developers, freelancers, students, and educators that want to build and ship faster.
                            </Text>
                            <HStack align="baseline" mt={4}>
                                <Text fontSize="3xl" color="white" fontWeight="bold" fontFamily="Bricolage Grotesque">$149</Text>
                                <Text fontSize="md" color="#8b949e" fontFamily="Bricolage Grotesque">Pay once, access forever</Text>
                            </HStack>
                            <Button
                                bg="white"
                                color="black"
                                w="full"
                                mt={4}
                                _hover={{ bg: "gray.300" }}
                                onClick={handleStarterPlan}
                            >
                                Get ShipJitt
                            </Button>
                            <Text mt={6} color="#8b949e" fontWeight={500} fontFamily="Poppins" fontSize="sm">What's included</Text>
                            <VStack align="start" spacing={2} mt={2}>
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Full Stack Node.js & React.js boilerplate
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        SEO & Blog
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Mailgun integrations to send transactional emails
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Payment integrations via stripe
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Advanced custom authentication
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        MongoDB, Postgres (Sequelize ORM)
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        20+ Chakra UI Components
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <SmallCloseIcon color="red.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Leaderboard
                                    </Text>
                                </HStack>
 
                                <HStack >
                                <SmallCloseIcon color="red.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Affiliate system
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <SmallCloseIcon color="red.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Lifetime updates
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Box>
 
 
                    {/* plan 2 */}
                   
                    <Box
                        // bg="rgba(0,0,0,.5)"
                        bg='transparent'
                        // borderRadius="1.5rem"
                        p={9}
                        // border="1.5px solid rgba(255,255,255,.12)"
                        // borderRight={'1px'}
                        borderColor={'1.5px solid rgba(255,255,255,.12)'}
                        textAlign="left"
                    >
                        <VStack align="start">
                            <Text fontSize="2xl" color="white" fontFamily="Syne" fontWeight={600}>Shipjitt VIP</Text>
                            <Text mt={2} color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                For individual developers, freelancers, students, and educators that want to build and ship faster.
                            </Text>
                            <HStack align="baseline" mt={4}>
                                <Text fontSize="3xl" color="white" fontWeight="bold" fontFamily="Bricolage Grotesque">$200</Text>
                                <Text fontSize="md" color="#8b949e" fontFamily="Bricolage Grotesque">Pay once, access forever</Text>
                            </HStack>
                            <Button
                                bg="white"
                                color="black"
                                w="full"
                                mt={4}
                                _hover={{ bg: "gray.300" }}
                                onClick={handleAllinPlan}
                            >
                                Get ShipJitt
                            </Button>
                            <Text mt={6} color="#8b949e" fontWeight={500} fontFamily="Poppins" fontSize="sm">What's included</Text>
                            <VStack align="start" spacing={2} mt={2}>
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Full Stack Node.js & React.js boilerplate
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        SEO & Blog
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Mailgun integrations to send transactional emails
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Payment integrations via stripe
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Advanced custom authentication
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        MongoDB, Postgres (Sequelize ORM)
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        20+ Chakra UI Components
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Leaderboard
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Affiliate system
                                    </Text>
                                </HStack>
 
                                <HStack >
                                    <CheckIcon color="green.500" />
                                    <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                        Lifetime updates
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    );
};
 
export default Pricing;



