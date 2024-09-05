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
import usermodel from '../images/usermodel.png';
import hero from '../images/compare.png';

import { FaDiscord, FaClipboard, FaBars, FaRegCheckCircle } from 'react-icons/fa';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Docs from './Docs';
import Navbar from '../components/Navbar';
import { useAuth } from '../auth/authContext';
import { Helmet } from 'react-helmet-async';
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
                <IconButton
                    icon={<FaRegCheckCircle />}
                    position="absolute"
                    top="8"
                    right="8"
                    size="xs"
                    color='white'
                    bg="transparent"
                    _hover={{ bg: 'hsl(240 3.7% 15.9%)' }}
                />
            )}
        </Box>
    );
};

const CodePreview = ({ code }) => {
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
                <IconButton
                    icon={<FaRegCheckCircle />}
                    position="absolute"
                    top="8"
                    right="8"
                    size="xs"
                    color='white'
                    bg="transparent"
                    _hover={{ bg: 'hsl(240 3.7% 15.9%)' }}
                />
            )}
        </Box>
    );
};

function DocsHero() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, loading, logout, hasAccess } = useAuth();
    const [activeButton, setActiveButton] = useState('button1');




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

    const authcontext = `
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    let toast = useToast();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        getUser(decodedToken.id);
      } else {
        setLoading(false);
      }
  
    }, []);
  
    const handleTokenExpired = () => {
      toast({
        title: 'Session Expired',
        description: 'Your session has expired. Please login again.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        logout();
      }, 3000);
    };
  
  
    const login = (token) => {
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      getUser(decodedToken.id);
    };
  
    const logout = async () => {
      try {
        await axios.post('http://localhost:6099/api/users/logout', {}, {
          withCredentials: true
        });
      } catch (error) {
        console.error('Error logging out:', error);
      } finally {
        localStorage.removeItem('token');
        setUser(null);
      }
    };
  
    const getUser = async (userId, token) => {
      try {
        const response = await axios.get('http://localhost:6099/api/users/userId', { // userid is an variable which determianted in each component from this authcontext
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401 && error.response.data.message === 'Token has expired.') {
          handleTokenExpired();
          console.log(error);
        } else {
          console.error('Error fetching user:', error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    const isAdmin = () => {
      return user && user.isAdmin;
    };
  
    const hasAccess = () => {
      return user && user.hasAccess;
    };
  
    const isVerify = () => {
      return user && user.isVerify;
    }
  
    return (
      <AuthContext.Provider value={{ user, login, logout, isAdmin, hasAccess, isVerify, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };`;

    const authRoutes = `
// login user if isVerified is true if not send email verify account  ✅
router.post('/login', async (req, res) => {
    const { email, password, verification_token, createdBy, timeZone, updatedAt } = req.body;
    try {

        if(!email || !password) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Email and password are required.'
            });
        }
    
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found.'
            });
        }

        if(user.deletedAt) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'This user has been deleted.'
            })  
        }

        const selectedTimeZone = timeZone || process.env.DEFAULT_TIMEZONE;

        const updatedAtTimeZone = moment().tz(selectedTimeZone).format();

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'Invalid password.'
            });
        }

        if (!user.isVerify) {
            // Resend verification email
            const verificationToken = jwt.sign({ email: email }, process.env.SECRETJWT, { expiresIn: '1h' });
            await User.update({ verification_token: verificationToken, updatedAt: updatedAtTimeZone }, { where: { email: email } });

            await sendVerificationEmail(email, verificationToken);

            return res.status(403).json({
                status: 'error',
                statusCode: 403,
                message: 'Email not verified. Verification email sent.'
            });
        }
        
       
        const token = jwt.sign({ id: user.id }, process.env.SECRETJWT, { expiresIn: '1h' });

        res.cookie('token', token, {httpOnly: true, secure: false });

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            token: token,
            message: 'User logged in successfully.',
        });
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
});
`;

    const protectedRouteByMiddleware = `
const verifyToken = async(req, res, next) => {
    try {   
        const token = req.cookies['token'];

        if(!token) {
            return res.status(401).json({
                status: 'error', 
                statusCode: 401,
                message: 'Token missing.'
            });
        }


        // const decoded = jwt.verify(token, process.env.SECRETJWT);

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRETJWT);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    status: 'error',
                    statusCode: 401,
                    message: 'Token has expired.'
                });
            } else {
                return res.status(401).json({
                    status: 'error',
                    statusCode: 401,
                    message: 'Token is invalid.'
                });
            }
        }
        
        if(!decoded) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'Token is invalid.'
            })
        }

        const user = await User.findOne({ id: decoded.id });

        if(!user) {
            res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'User not found'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("An Error has occurred and we're working to fix the problem!");
        console.error(error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: "An Error has occurred and we're working to fix the problem!"
        });
    }
};
`;

    const privateRouteReactJs = `
const PrivateRoute = ({ children }) => {
    const { user, loading, isVerify, logout } = useAuth();
  
    if (loading) return null; // Optionally add a loading spinner here
  
    console.log(user);
  
    if (user && !isVerify()) {
      logout(); // Automatically log out if user is not verified
      return null; // Optionally display a message or redirect to a different page
    }
  
    return user && isVerify() ? children : <Navigate to="/" />;
  };
`;

    const pricingComponent = `
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

... then the logic frontend return( ) to handle the links which route in the link of the stripe to pay the plan.
`;

    const stripeWebhook = `stripe listen --forward-to localhost:6099/api/stripe/webhook`;

    const navbarCode = `
    // Services.js -- Features

    import React from 'react';
    import { Box, Text, SimpleGrid, Image } from '@chakra-ui/react';
    import { CheckIcon } from '@chakra-ui/icons';
    
    const Services = () => {
        return (
            <Box py={10}>
                <Text 
                textAlign={'center'} 
                color='white' 
                fontFamily={'Epilogue'}
                fontSize={{ base: '2xl', md: '5xl' }}
                fontWeight={'500'}
                >
                    Compare with <br />
                    everything you need
                </Text>
    
                <SimpleGrid columns={{base: 1, md: 3}} spacing={4} mt={10}>
                    <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Image src="https://cdn-icons-png.flaticon.com/128/10490/10490223.png" width='50px' height='50px'/>
    
                        <Text mt={2} color='white' fontSize={'2xl'} fontFamily="Geist Sans" fontWeight={500}>Emails</Text>
    
                        <Text mt={2} color='hsl(240 5% 64.9%)' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Send transactional emails
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> DNS setup to avoid spam folder.
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Webhook to receive & forward emails
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Mailgun integration
                        </Text>
    
    
    
                    </Box>
    
                    <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Image src="https://cdn-icons-png.flaticon.com/128/10473/10473692.png" width='50px' height='50px'/>
    
                        <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>Payments</Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Create checkout sessions
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Handle endpoints to update the user account (one-time payments).
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Tutorial to setup your account in Stripe.
                        </Text>
    
                      
    
    
    
                    </Box>
    
                    <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Image src="https://cdn-icons-png.flaticon.com/128/10645/10645744.png" width='50px' height='50px'/>
    
                        <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>Authentication</Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Custom authentication
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Save user in database.
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Private protected routes.
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Features like update password, update profile picture, verify email, forgot password.
                        </Text>
    
    
    
                    </Box>
    
                    <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Image src="https://cdn-icons-png.flaticon.com/128/9850/9850774.png" width='50px' height='50px'/>
    
                        <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>Database</Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Postgres Schema
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> MongoDB in the future...
                        </Text>
    
    
    
                    </Box>
    
                    <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Image src="https://cdn-icons-png.flaticon.com/128/1292/1292765.png" width='50px' height='50px'/>
    
                        <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>SEO</Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Blog
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> All meta tags to rank on search engines.
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> SEO-optimized UI components
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Structured data markup for Rich Snippets
                        </Text>
    
    
                    </Box>
    
                    <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Image src="https://cdn-icons-png.flaticon.com/128/16359/16359637.png" width='50px' height='50px'/>
    
                        <Text mt={2} color='white' fontSize={'2xl'} fontFamily={'Geist Sans'} fontWeight={500}>Others</Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Chakra UI integration.
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                        <CheckIcon /> Chakra UI 20+ themes, Components, animations, and sections like this features section.
                        </Text>
    
                        <Text mt={2} color='#8b949e' fontSize={'md'} fontFamily={'Geist Sans'} fontWeight={400}>
                            <CheckIcon /> Copy paste code templates
                        </Text>
    
    
    
    
                    </Box>
                </SimpleGrid>
    
            </Box>
        );
    };
    
    export default Services;
    `;



    return (
        <Flex direction="column" bg="hsl(240 10% 3.9%)">

            <Helmet>
                <title>Docs | Hero | ShipJitt</title>
            </Helmet>


            <Flex flex="1">
                <Box width={{ base: '100%', md: '300px' }} color="white" padding="8" maxH={'100vh'} bg='hsl(240 10% 3.9%)' pos={'fixed'} overflowY={'scroll'} zIndex={'10'} className='scroller'>
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

                <Box display={{ base: 'flex', md: 'none' }} bg='#000' width={'100%'} py={10}>

                    <Container maxW={'container.md'}>
                    <Box bg='hsl(240 10% 3.9%)' height={'full'}>
                        <Box rounded='xl' bg='hsl(240 10% 3.9%)'>
                            <Box bg="hsl(240 10% 3.9%)" pb={10}>

                                <Text
                                    fontFamily="Epilogue"
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={400}
                                    fontSize={'sm'}
                                    mt={24}
                                >
                                    Docs {' > '} Components {' > '} Services
                                </Text>


                                <Text
                                    fontFamily="Epilogue"
                                    color='#fff'
                                    fontSize={'2xl'}
                                    fontWeight={700}
                                    mt='2'
                                >
                                    Services Component
                                </Text>

                                <Text mt={5}
                                    fontFamily="Epilogue"
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    The Service component is a great way to showcase the services you offer. It's a simple and effective way to communicate what you do and how you can help your customers.
                                </Text>

                                <Box mt={5}>
                                    <Button onClick={() => setActiveButton('button1')} mr={3} size='sm'>
                                        Preview
                                    </Button>
                                    {user && hasAccess() ?
                                        <Button onClick={() => setActiveButton('button2')} size='sm'>
                                            Code
                                        </Button>
                                        : <Button as='a' href='/' size='sm'>Get Code</Button>}
                                </Box>

                                {activeButton === 'button1' && (
                                    <Box position="relative" color="white" p="4" borderRadius="md">
                                        <Code display="block" whiteSpace="pre" width='90%' p={6} overflowX="auto" bg="rgb(24 24 27)" border='1px solid hsl(240 3.7% 15.9%)' borderRadius="md" color='gray.300'>
                                            <Image src={hero} alt="Navbar" />
                                        </Code>
                                    </Box>
                                )}

                                {activeButton === 'button2' && (
                                    <CodeBlock code={navbarCode} />
                                )}

                            </Box>
                        </Box>
                    </Box>
                    </Container>
                </Box>

                <Box display={{ base: 'none', md: 'flex' }} bg='hsl(240 10% 3.9%)' width={'100%'} minH='100vh' pl={80}>
                    <Box bg='hsl(240 10% 3.9%)' height={'full'}>
                        <Box rounded='xl' bg='hsl(240 10% 3.9%)'>
                            <Box bg="hsl(240 10% 3.9%)" pb={10}>

                                <Text
                                    fontFamily="Epilogue"
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={400}
                                    fontSize={'sm'}
                                    mt={24}
                                >
                                    Docs {' > '} Components {' > '} Services
                                </Text>


                                <Text
                                    fontFamily="Epilogue"
                                    color='#fff'
                                    fontSize={'4xl'}
                                    fontWeight={700}
                                    mt='2'
                                >
                                    Services Component
                                </Text>

                                <Text mt={5}
                                    fontFamily="Epilogue"
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    The Service component is a great way to showcase the services you offer. It's a simple and effective way to communicate what you do and how you can help your customers.
                                </Text>

                                <Box mt={5}>
                                    <Button onClick={() => setActiveButton('button1')} mr={3} size='sm'>
                                        Preview
                                    </Button>
                                    {user && hasAccess() ?
                                        <Button onClick={() => setActiveButton('button2')} size='sm'>
                                            Code
                                        </Button>
                                        : <Button as='a' href='/' size='sm'>Get Code</Button>}
                                </Box>

                                {activeButton === 'button1' && (
                                    <Box position="relative" color="white" p="4" borderRadius="md">
                                        <Code display="block" whiteSpace="pre" width='90%' p={6} overflowX="auto" bg="rgb(24 24 27)" border='1px solid hsl(240 3.7% 15.9%)' borderRadius="md" color='gray.300'>
                                            <Image src={hero} alt="Navbar" />
                                        </Code>
                                    </Box>
                                )}

                                {activeButton === 'button2' && (
                                    <CodeBlock code={navbarCode} />
                                )}

                            </Box>
                        </Box>
                    </Box>
                </Box>



            </Flex>
        </Flex>
    );
}



export default DocsHero;