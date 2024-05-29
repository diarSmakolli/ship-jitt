import React from 'react';
import {
    Box,
    Center,
    Text,
    SimpleGrid,
    Image,
    Button,
    VStack,
    HStack,
} from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon, CloseIcon } from '@chakra-ui/icons';
 
const PricingCard = ({ title, description, price, pricePeriod, features, ctaText }) => {
    return (
        <Box
            // bg="rgba(0,0,0,.5)"
            bg='transparent'
            // borderRadius="1.5rem"
            p={9}
            // border="1.5px solid rgba(255,255,255,.12)"
            borderLeft={'1px'}
            borderColor={'1.5px solid rgba(255,255,255,.12)'}
            textAlign="left"
        >
            <VStack align="start">
                <Text fontSize="2xl" color="white" fontFamily="Syne" fontWeight={600}>{title}</Text>
                <Text mt={2} color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>{description}</Text>
                <HStack align="baseline" mt={4}>
                    <Text fontSize="3xl" color="white" fontWeight="bold">${price}</Text>
                    <Text fontSize="md" color="#8b949e">{pricePeriod}</Text>
                </HStack>
                <Button
                    bg="white"
                    color="black"
                    w="full"
                    mt={4}
                    _hover={{ bg: "gray.300" }}
                >
                    {ctaText}
                </Button>
                <Text mt={6} color="#8b949e" fontWeight={500} fontFamily="Poppins" fontSize="sm">What's included</Text>
                <VStack align="start" spacing={2} mt={2}>
                    {features.map((feature, index) => (
                        <HStack key={index}>
                            <CheckIcon color="green.500" />
                            <Text color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>{feature}</Text>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
};
 
const Pricing = () => {
 
    const pricingPlans = [
        {
            title: 'Copilot Individual',
            description: 'For individual developers, freelancers, students, and educators that want to code faster and happier.',
            price: 10,
            pricePeriod: 'per month / $100 USD per year',
            features: [
                'Unlimited messages and interactions',
                'Access to all integrations',
                '24/7 support',
            ],
            ctaText: 'Start a free trial'
        },
        {
            title: 'Copilot Business',
            description: 'For organizations ready to improve engineering velocity, code quality, and developer experience.',
            price: 19,
            pricePeriod: 'per user / month',
            features: [
                'Unlimited messages and interactions',
                'Access to all integrations',
                'Priority support',
            ],
            ctaText: 'Buy now'
        },
        {
            title: 'Copilot Enterprise',
            description: 'For companies looking to customize GitHub Copilot to their organization and infuse AI across the developer workflow.',
            price: 39,
            pricePeriod: 'per user / month',
            features: [
                'Unlimited messages and interactions',
                'Dedicated account manager',
                'Custom integrations',
            ],
            ctaText: 'Contact sales'
        }
    ];
 
    return (
        <Box py={20}>
 
 
            <Button
                bg='transparent'
                color='white'
                border='1.5px solid rgba(255,255,255,.12)'
                rounded='3xl'
                fontFamily={'Montserrat'}
                fontWeight={500}
 
            >
                Pricing
            </Button>
 
 
            <Text
                // textAlign={'center'}
                color='white'
                fontFamily={'Bricolage Grotesque'}
                fontSize={{ base: 'xl', md: '6xl' }}
                fontWeight={'600'}
            >
                Take flight with Ship Jitt
            </Text>
 
            <Text
                color='#8b949e'
                fontWeight={500}
                fontFamily={'Poppins'}
                mt={2}
                fontSize={'xl'}
            >
                Developers all over the world use ShipJitt to build faster,  drive impact <br />
                and focus on doing what matters most: building great software
            </Text>
 
            <Box bg='#000' borderRadius={'20px'}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} mt={20}>
 
                <Box
                        // bg="rgba(0,0,0,.5)"
                        bg='transparent'
                        // borderRadius="1.5rem"
                        p={9}
                        // border="1.5px solid rgba(255,255,255,.12)"
                        // borderRight={'1px'}
                        borderRight='1px'
                        borderColor={'1.5px solid rgba(255,255,255,.12)'}
                        textAlign="left"
                    >
                        <VStack align="start">
                            <Text fontSize="2xl" color="white" fontFamily="Syne" fontWeight={600}>Shipjitt starter</Text>
                            <Text mt={2} color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                For individual developers, freelancers, students, and educators that want to build and ship faster.
                            </Text>
                            <HStack align="baseline" mt={4}>
                                <Text fontSize="3xl" color="white" fontWeight="bold">$99</Text>
                                <Text fontSize="md" color="#8b949e">Pay once, access forever</Text>
                            </HStack>
                            <Button
                                bg="white"
                                color="black"
                                w="full"
                                mt={4}
                                _hover={{ bg: "gray.300" }}
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
                            <Text fontSize="2xl" color="white" fontFamily="Syne" fontWeight={600}>Shipjitt starter</Text>
                            <Text mt={2} color="#8b949e" fontSize="md" fontFamily="Poppins" fontWeight={500}>
                                For individual developers, freelancers, students, and educators that want to build and ship faster.
                            </Text>
                            <HStack align="baseline" mt={4}>
                                <Text fontSize="3xl" color="white" fontWeight="bold">$200</Text>
                                <Text fontSize="md" color="#8b949e">Pay once, access forever</Text>
                            </HStack>
                            <Button
                                bg="white"
                                color="black"
                                w="full"
                                mt={4}
                                _hover={{ bg: "gray.300" }}
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