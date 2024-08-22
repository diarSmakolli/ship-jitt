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
import navbar from '../images/navbar.png';

import { FaDiscord, FaClipboard, FaBars, FaRegCheckCircle } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';
import Docs from './Docs';
import Navbar from '../components/Navbar';
import {useAuth} from '../auth/authContext';
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


function DocsNavbar() {
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
    import {
        Box,
        Flex,
        Text,
        IconButton,
        Button,
        Stack,
        Collapse,
        Icon,
        Link,
        Popover,
        PopoverTrigger,
        PopoverContent,
        useColorModeValue,
        useBreakpointValue,
        useDisclosure,
        Container,
        Image,
        Menu,
        MenuButton,
        MenuList,
        MenuItem,
      } from '@chakra-ui/react';
      import {
        HamburgerIcon,
        CloseIcon,
        ChevronDownIcon,
        ChevronRightIcon,
      } from '@chakra-ui/icons';
      import {useAuth} from '../auth/authContext';
      
      export default function WithSubnavigation() {
        const { isOpen, onToggle } = useDisclosure();
        const { user, loading, logout } = useAuth();
      
        console.log('Navbar user: ', user);
      
        let defaultProfilePicture = "https://www.gravatar.com/avatar/938610872fd268285c3d4024cfa46360.png?d=retro&r=g";
        let profilePicture;
      
      
        return (
          <Box py={2}>
              <Container maxW='6xl'>
            <Flex
              bg={'transparent'}
              color={useColorModeValue('gray.600', 'white')}
              minH={'60px'}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderBottom={0}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.900')}
              align={'center'}>
              <Flex
                flex={{ base: 1, md: 'auto' }}
                ml={{ base: -2 }}
                display={{ base: 'flex', md: 'none' }}>
                <IconButton
                  onClick={onToggle}
                  icon={
                    isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                  }
                  variant={'ghost'}
                  aria-label={'Toggle Navigation'}
                />
              </Flex>
              <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                <Text
                  textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                  fontFamily={'Bricolage Grotesque'} 
                  color='gray.50'
                  fontSize={'3xl'}
                  fontWeight={'500'}
                  >
                  Ship jitt
                </Text>
      
                <Flex display={{ base: 'none', md: 'flex' }} ml={10} mt={3}>
                  <DesktopNav />
                </Flex>
              </Flex>
      
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                {loading ? null : !user ? (
                    <>
                      <Button
                        as={'a'}
                        fontSize={'sm'}
                        color='white'
                        fontWeight={400}
                        variant={'link'}
                        href={'/auth/signin'}
                      >
                        Sign In
                      </Button>
                      <Button
                        as={'a'}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'black'}
                        bg={'white'}
                        href={'/auth/signup'}
                        _hover={{
                          bg: 'white.200',
                        }}
                      >
                        Get started
                      </Button>
                    </>
                  ) : (
                    <>
                        <Menu>
                          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width={'100px'} height={'50px'} rounded='3xl'>
                          <Image src={user.profile_picture == null ? defaultProfilePicture : profilePicture}
                            width={'40px'} height={'40px'} rounded={'full'} />
                          </MenuButton>
                          <MenuList zIndex={10}>
                            <MenuItem color='black' fontFamily={'Bricolage Grotesque'} fontWeight={600}>{user.first_name} {user.last_name}</MenuItem>
                            <MenuItem as='a' href='/profile'>Profile</MenuItem>
                            <MenuItem>Customer support</MenuItem>
                            <MenuItem>Docs</MenuItem>
                            <MenuItem onClick={logout}>Log out</MenuItem>
                          </MenuList>
                        </Menu>
                    </>
                  )}
              </Stack>
            </Flex>
      
            <Collapse in={isOpen} animateOpacity>
              <MobileNav />
            </Collapse>
      
            </Container>
          </Box>
        );
      }
      
      const DesktopNav = () => {
        const linkColor = useColorModeValue('white', 'gray.200');
        const linkHoverColor = useColorModeValue('white', 'white');
        const popoverContentBgColor = useColorModeValue('white', 'gray.800');
      
        return (
          <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
              <Box key={navItem.label}>
                <Popover trigger={'hover'} placement={'bottom-start'}>
                  <PopoverTrigger>
                    <Link
                      p={2}
                      href={navItem.href ?? '#'}
                      fontSize={'md'}
                      fontWeight={500}
                      color={linkColor}
                      _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                      }}>
                      {navItem.label}
                    </Link>
                  </PopoverTrigger>
      
                  {navItem.children && (
                    <PopoverContent
                      border={0}
                      boxShadow={'xl'}
                      bg={popoverContentBgColor}
                      p={4}
                      rounded={'xl'}
                      minW={'sm'}>
                      <Stack>
                        {navItem.children.map((child) => (
                          <DesktopSubNav key={child.label} {...child} />
                        ))}
                      </Stack>
                    </PopoverContent>
                  )}
                </Popover>
              </Box>
            ))}
          </Stack>
        );
      };
      
      const DesktopSubNav = ({ label, href, subLabel }) => {
          return (
              <Link
                  href={href}
                  role={'group'}
                  display={'block'}
                  p={2}
                  rounded={'md'}
                  _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                  <Stack direction={'row'} align={'center'}>
                      <Box>
                          <Text
                              transition={'all .3s ease'}
                              _groupHover={{ color: 'pink.400' }}
                              fontWeight={500}>
                              {label}
                          </Text>
                          <Text fontSize={'sm'}>{subLabel}</Text>
                      </Box>
                      <Flex
                          transition={'all .3s ease'}
                          transform={'translateX(-10px)'}
                          opacity={0}
                          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                          justify={'flex-end'}
                          align={'center'}
                          flex={1}>
                          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                      </Flex>
                  </Stack>
              </Link>
          );
      };
      
      const MobileNav = () => {
          return (
              <Stack
                  bg={useColorModeValue('white', 'gray.800')}
                  p={4}
                  display={{ md: 'none' }}>
                  {NAV_ITEMS.map((navItem) => (
                      <MobileNavItem key={navItem.label} {...navItem} />
                  ))}
              </Stack>
          );
      };
      
      const MobileNavItem = ({ label, children, href }) => {
          const { isOpen, onToggle } = useDisclosure();
      
          return (
              <Stack spacing={4} onClick={children && onToggle}>
                  <Flex
                      py={2}
                      as={Link}
                      href={href ?? '#'}
                      justify={'space-between'}
                      align={'center'}
                      _hover={{
                          textDecoration: 'none',
                      }}>
                      <Text
                          fontWeight={600}
                          color={useColorModeValue('gray.600', 'gray.200')}>
                          {label}
                      </Text>
                      {children && (
                          <Icon
                              as={ChevronDownIcon}
                              transition={'all .25s ease-in-out'}
                              transform={isOpen ? 'rotate(180deg)' : ''}
                              w={6}
                              h={6}
                          />
                      )}
                  </Flex>
      
                  <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                      <Stack
                          mt={2}
                          pl={4}
                          borderLeft={1}
                          borderStyle={'solid'}
                          borderColor={useColorModeValue('gray.200', 'gray.700')}
                          align={'start'}>
                          {children &&
                              children.map((child) => (
                                  <Link key={child.label} py={2} href={child.href}>
                                      {child.label}
                                  </Link>
                              ))}
                      </Stack>
                  </Collapse>
              </Stack>
          );
      };
      
      const NAV_ITEMS = [
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'Pricing',
          href: '/',
        },
        {
          label: 'Demo',
          href: '/',
        },
        {
          label: 'Customer Support',
          href: '/contact-us',
        },
        {
          label: 'Docs',
          href: '/docs',
        },
      ];
    `



    return (
        <Flex direction="column" bg="hsl(240 10% 3.9%)">

            <Helmet>
                <title>Docs | Navbar | ShipJitt</title>
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

                <Box display={{ base: 'none', md: 'flex' }} bg='hsl(240 10% 3.9%)' width={'100%'} minH='100vh' pl={80}>
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
                                    Docs {' > '} Components {' > '} Navbar
                                </Text>


                                <Text
                                    fontFamily={'Geist Sans'}
                                    color='#fff'
                                    fontSize={'4xl'}
                                    fontWeight={700}
                                    mt='2'
                                >
                                    Navbar Component
                                </Text>

                                <Text mt={5}
                                    fontFamily={'Geist Sans'}
                                    color='gray.100'
                                    fontWeight={400}
                                    fontSize={'md'}
                                >
                                    A responsive header with you logo left, links right. Links with CTA are hidden on mobile and accessible with burger menu. <br />
                                    Add your own logo in the /Navbar.js file.
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
                                            <Image src={navbar} alt="Navbar" />
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



export default DocsNavbar;