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

import { FaDiscord, FaClipboard, FaBars, FaRegCheckCircle } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';
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


function DocsStripe() {
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


    return (
        <Flex direction="column" bg="hsl(240 10% 3.9%)">
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
                            icon={<HamburgerIcon />}
                            aria-label="Open Menu"
                            onClick={() => setIsOpen(true)}
                            display={{ base: 'flex', md: 'none' }}
                            ml='auto'
                        />
                    </HStack>

                    <Box display={{ base: 'none', md: 'block' }} py={10}>
                        <Heading size="sm" fontFamily={'Geist Sans'} color='gray.200'
                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                            Getting started
                        </Heading>

                        <Box rounded='xl' mt={2}>
                            <Heading size="sm" fontFamily={'Geist Sans'} color='gray.200'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Tutorials
                            </Heading>


                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Authentication
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                AWS Setup
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Pages
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Protected routes
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Quick launch
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Stripe integration
                            </Text>
                        </Box>

                        <Box rounded='xl' mt={5}>
                            <Heading size="sm" fontFamily={'Geist Sans'} color='gray.200'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Features
                            </Heading>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                API calls
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Authentication
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                AWS Setup
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Pages
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Protected routes
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Quick launch
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Stripe integration
                            </Text>
                        </Box>

                        <Box rounded='xl' mt={5}>
                            <Heading size="sm" fontFamily={'Geist Sans'} color='gray.200'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Components
                            </Heading>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                API calls
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Authentication
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                AWS Setup
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Pages
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Protected routes
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Quick launch
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Stripe integration
                            </Text>
                        </Box>

                        <Box rounded='xl' mt={5}>
                            <Heading size="sm" fontFamily={'Geist Sans'} color='gray.200'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Chakra UI components
                            </Heading>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                API calls
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Authentication
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                AWS Setup
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Pages
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Protected routes
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Quick launch
                            </Text>

                            <Text fontFamily={'Geist Sans'} color='hsl(240 5% 64.9%)'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={400}>
                                Stripe integration
                            </Text>
                        </Box>

                        <Box rounded='xl' mt={5}>
                            <Heading size="sm" fontFamily={'Geist Sans'} color='gray.200'
                                p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                Deployment
                            </Heading>
                        </Box>
                    </Box>

                    {/* Hamburger Menu */}


                    {/* Drawer */}
                    <Drawer placement="left" onClose={() => setIsOpen(false)} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent bg="white" color="white">
                            <DrawerCloseButton />
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <Box rounded="xl" mt={2}>
                                    <Box rounded='xl' mt={2}>

                                        <Heading size="sm" fontFamily={'Poppins'} color='gray.900'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            Introduction
                                        </Heading>


                                        <Heading size="sm" fontFamily={'Poppins'} color='gray.900'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            TUTORIALS
                                        </Heading>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            API calls
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Authentication
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            AWS Setup
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Pages
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Protected routes
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Quick launch
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Stripe integration
                                        </Text>
                                    </Box>

                                    <Box rounded='xl' mt={2}>
                                        <Heading size="sm" fontFamily={'Poppins'} color='gray.200'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            FEATURES
                                        </Heading>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            API calls
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Authentication
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            AWS Setup
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Pages
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Protected routes
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Quick launch
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Stripe integration
                                        </Text>
                                    </Box>

                                    <Box rounded='xl' mt={2}>
                                        <Heading size="sm" fontFamily={'Poppins'} color='gray.900'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            COMPONENTS
                                        </Heading>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            API calls
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Authentication
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            AWS Setup
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Pages
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Protected routes
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Quick launch
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Stripe integration
                                        </Text>
                                    </Box>

                                    <Box rounded='xl' mt={2}>
                                        <Heading size="sm" fontFamily={'Poppins'} color='gray.900'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={600}>
                                            CHAKRA COMPONENTS
                                        </Heading>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            API calls
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Authentication
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            AWS Setup
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Pages
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Protected routes
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Quick launch
                                        </Text>

                                        <Text fontFamily={'Poppins'} color='gray.800'
                                            p={2} rounded='xl' fontSize={'sm'} fontWeight={500}>
                                            Stripe integration
                                        </Text>
                                    </Box>

                                    <Box rounded='xl' mt={5}>
                                        <Heading size="sm" fontFamily={'Poppins'} color='gray.900'
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

                <Box display={{ base: 'flex', md: 'none' }} bg='white' width={'100%'} py={20}>

                    <Container maxW={'container.md'}>
                        <Box bg="white" pb={10} maxW={'100%'} mt={5}>


                            <Text
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.900'
                                fontSize={'2xl'}
                                fontWeight={600}
                                mt={10}
                            >
                                Getting Started with Ship jitt
                            </Text>


                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={600}
                                fontSize={'xl'}
                            >
                                Hey maker, welcome to Ship-jitt 👋
                            </Text>

                            <Text
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={500}
                                fontSize={'md'}
                                mt={5}
                            >
                                Here's a quick overview of the boilerplate. Follow along to get your app up and running.
                            </Text>

                            <Text
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={500}
                                fontSize={'md'}
                                mt={5}
                            >
                                Get started with Ship jitt Boilerplate, the trendiest boilerplate for React JS, Node.js, C, Supabase, Stripe & ChatGPT API.
                                Horizon UI Boilerplate comes with over 100+ fully coded & designed frontend components and more than 20+ section & web app page examples
                                giving you the freedom of choosing and combining.
                            </Text>

                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.900'
                                fontWeight={600}
                                fontSize={'xl'}
                            >
                                React.js & Node.js project structure
                            </Text>

                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/auth</Code> - Authentication routes
                            </Text>
                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/components</Code> - React components
                            </Text>
                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/images</Code> - Images for the project
                            </Text>
                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/models</Code> - Database models
                            </Text>
                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/middleware</Code> - Middleware functions
                            </Text>
                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/routes</Code> - API routes
                            </Text>
                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.700'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                <Code bg='gray.900' border='1px solid rgb(255,255,255,0.3)' color='gray.200' p={1} rounded='lg'>/services</Code> - Services for the project
                            </Text>


                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.900'
                                fontWeight={600}
                                fontSize={'xl'}
                            >
                                Start a local server
                            </Text>



                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.800'
                                fontWeight={600}
                                fontSize={'lg'}
                            >
                                1. In your terminal, run the following commands one-by-one.
                            </Text>

                            <CodeBlock code={code} />

                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.800'
                                fontWeight={600}
                                fontSize={'lg'}
                            >
                                2. Configure your environment variables .env file.
                            </Text>

                            <CodeBlock code={envconf} />

                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.800'
                                fontWeight={600}
                                fontSize={'lg'}
                            >
                                3. Open http://localhost:3000 to see your site. And voila!
                            </Text>



                            <Text mt={5}
                                fontFamily={'Bricolage Grotesque'}
                                color='gray.800'
                                fontWeight={600}
                                fontSize={'md'}
                            >
                                Now go ahead to the Tutorials section to get the app live within 5 minutes.
                            </Text>




                        </Box>
                    </Container>
                </Box>

                <Box display={{ base: 'none', md: 'flex' }} bg='hsl(240 10% 3.9%)' width={'100%'} pl={80}>
                    <Box bg='hsl(240 10% 3.9%)' height={'full'}>
                        <Box rounded='xl' bg='hsl(240 10% 3.9%)'>
                            <Box bg="hsl(240 10% 3.9%)" pb={10}>

                                <Text
                                    fontFamily={'Geist Sans'}
                                    color='hsl(240 5% 64.9%)'
                                    fontWeight={400}
                                    fontSize={'sm'}
                                    mt={24}
                                >
                                    Docs {' > '} Tutorials {' > '} Stripe Integration
                                </Text>


                                <Text
                                    fontFamily={'Geist Sans'}
                                    color='#fff'
                                    fontSize={'4xl'}
                                    fontWeight={700}
                                    mt='2'
                                >
                                    Stripe Integration
                                </Text>


                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    Let's create a Stripe Checkout to set up a stripe payment gateway in your app.
                                    Let our webhook handle the logic to privision access to the user.
                                </Text>

                                <Text
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                    mt={5}
                                >
                                    You need to have Stripe and Database set up before you can start with the integration.
                                </Text>

                                <Text
                                    fontFamily={'Geist Sans'}
                                    color='gray.200'
                                    fontWeight={600}
                                    maxW={'700px'}
                                    fontSize={'xl'}
                                    mt={5}
                                >
                                    Setup
                                </Text>

                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    1. In your stripe dashboard, Click + {' > '} Product Catalog{' > '} Add a product. <br />
                                    Set a name and price for the product, then Click Save. <br /><br />

                                    <Text as='span' fontWeight={600}>Remind: If you want to set up the Subscription, it's the same flow.</Text>
                                </Text>

                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    In the Pricing Section , copy the product Price ID starts with price_ and add to the first plan in the 
                                    {' '} <Code bg='transparent' border='1px solid rgb(255,255,255,0.3)' color='gray.200' px={3} rounded='lg'>Pricing.js</Code>
                                </Text>

                                <CodeBlock code={pricingComponent} />

                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    2. Open http://localhost:3000/ in your browser, log-in and click the button to make a <br />
                                    payment with the credit card number 4242 4242 4242 4242.
                                </Text>

                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    3. Our webhook /api/stripe listens to Stripe events and will handle
                                     the logic to provision <br /> access (or not) to 
                                    the user—See the boolean hasAccess in the User.js schema.
                                </Text>

                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    4. You can add your own logic in /api/stripe like sending abandoned cart emails etc.
                                </Text>



                            

                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
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



export default DocsStripe;