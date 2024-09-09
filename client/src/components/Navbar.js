import React from 'react';
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
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Divider,

} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useAuth } from '../auth/authContext';
import { BsThreeDotsVertical, BsChatSquareQuote } from 'react-icons/bs';
import { RiShutDownLine, RiRestartLine, RiFileShredLine, RiNotification4Line } from 'react-icons/ri';
import { MdNotifications } from "react-icons/md";
import axios from 'axios';
import { useEffect } from 'react';
import logo from '../images/shipjitt.png';
import logo_white from '../images/logo-white.png';



export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, loading, logout } = useAuth();
  const [notifications, setNotifications] = React.useState([]);
  const [unreadCount, setUnreadCount] = React.useState(0);

  let defaultProfilePicture = "https://www.gravatar.com/avatar/938610872fd268285c3d4024cfa46360.png?d=retro&r=g";
  let profilePicture;
  if (user && user.profile_picture) {
    profilePicture = `http://localhost:6099/api/users/profile-picture/${user.profile_picture}`;
  }

  useEffect(() => {
    if (!loading && user) { // Only proceed when not loading and user is available
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`http://localhost:6099/api/users/notifications/${user.id}`, {
            withCredentials: true,
          });
          setNotifications(response.data.notifications);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchUnreadCount = async () => {
        try {
          const response = await axios.get(`http://localhost:6099/api/users/notifications/unread/${user.id}`, {
            withCredentials: true,
          });
          setUnreadCount(response.data.count);
        } catch (error) {
          console.log(error);
        }
      };
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [loading, user]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:6099/api/users/notifications/marked/${notificationId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Optimistically update the notification list
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification
        )
      );

      // Optimistically decrease unread count
      setUnreadCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
 
    } catch (error) {
      console.log("Error marking notification as read:", error);
    }
  };

  return (
    <Box py={2}>
      <Container maxW='6xl'>
        <Flex
          bg={'transparent'}
          color={'gray.700'}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={0}
          borderStyle={'solid'}
          borderColor={'gray.200'}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              _focus={{ color: 'white' }}
              _hover={{ color: 'white', bg: 'transparent' }}
              icon={
                isOpen ? <CloseIcon w={3} h={3} color='white' _focus={{ color: 'white' }} _hover={{ color: 'white', bg: 'transparent' }} /> : <HamburgerIcon w={5} h={5} color='white' _focus={{ color: 'white' }} _hover={{ color: 'white', bg: 'transparent' }} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            {/* <Text
              textAlign={{ base: 'center', md: 'left' }}
              fontFamily={'Bricolage Grotesque'}
              color='gray.50'
              fontSize={'3xl'}
              fontWeight={'500'}
            >
              Ship jitt
            </Text> */}

            <Image src={logo} width={'100px'} h='auto' />
            {/* <Image src={logo_white} width={'100px'} h='auto' /> */}

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

                  {/* NOTIFICATION MODAL */}

                  <Popover placement="bottom" isLazy>
                    <PopoverTrigger>
                      <IconButton
                        aria-label="More server options"
                        icon={<MdNotifications w={24} />}
                        variant="solid"
                        w={'50px'}
                      />


                    </PopoverTrigger>
                    <Text
                      color='black' fontWeight={'600'} pos='absolute' right='308px'
                      fontSize={'xs'} bg='rounded' mt={1}
                    >
                      {unreadCount ? unreadCount : 0}
                    </Text>
                    <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }} maxW={'400px'}>
                      <PopoverArrow />
                      <PopoverBody>
                        <Stack>
                          <Text color='#000' fontFamily={'Epilogue'} fontWeight={600}>Notifications</Text>
                          <Divider />
                          {notifications.length > 0 ? (
                            notifications.map(notification => (
                              <Box
                                key={notification.id}
                                p={2}
                              >
                                <Text fontWeight="bold" fontFamily={'Epilogue'} color='#000' 
                                onClick={() => handleMarkAsRead(notification.id)}
                                as='a' href='/notifications'
                                >{notification.title}</Text>
                                <Text>{notification.message}</Text>
                                {/* <Text>{notification.read ? 'Read' : 'Unread'}</Text> */}
                                <Text align={'end'}>{notification.createdAt}</Text>
                                <Divider mt={1} />
                              </Box>
                              
                            ))
                          ) : (
                            <Text>No notifications</Text>
                          )}
                            <Box>
                              <Button
                                as='a'
                                href='/notifications'
                                size='sm'
                                bg='black'
                                color='white'
                                _hover={{
                                  bg: '#000'
                                }}
                                w='100%'
                                rightIcon={<BsChatSquareQuote />}
                              >
                                View all
                              </Button>
                            </Box>
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>

                  {/* END NOTIFICATION MODAL */}


                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width={'100px'} height={'50px'} rounded='3xl'>
                    <Image src={user.profile_picture == null ? defaultProfilePicture : profilePicture}
                      width={'40px'} height={'40px'} rounded={'full'} />
                  </MenuButton>
                  <MenuList zIndex={10}>
                    <MenuItem color='black' fontFamily={'Bricolage Grotesque'} fontWeight={600}>{user.first_name} {user.last_name}</MenuItem>
                    <MenuItem as='a' href='/dashboard'>Dashboard</MenuItem>
                    <MenuItem as='a' href='/profile'>Profile</MenuItem>
                    <MenuItem as='a' href='/notifications'>Notifications</MenuItem>
                    <MenuItem as='a' href='/invoices'>Invoices</MenuItem>
                    <MenuItem as='a' href='/contact-us'>Customer support</MenuItem>
                    <MenuItem as='a' href='/docs'>Docs</MenuItem>
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
      bg={'#000'}
      p={4}
      display={{ md: 'none' }} minHeight={'100vh'} >
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
          fontWeight={500}
          color={'gray.300'}
          fontFamily={'Epilogue'}
          fontSize={'xl'}

        >
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