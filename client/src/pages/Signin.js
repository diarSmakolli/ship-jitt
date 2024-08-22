
import { useState } from 'react';
import axios from 'axios';
import {
Button,
Flex,
FormControl,
FormLabel,
Heading,
Image,
Input,
Link,
Spinner,
Stack,
Text,
useToast,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

export default function Signin() {
const toast = useToast();

const [formData, setFormData] = useState({
  email: '',
  password: '',
  timeZone: '',
});
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });

  // Clear errors on change
  if (name === 'email') setEmailError('');
  if (name === 'password') setPasswordError('');
};

const handleSubmit = async (e) => {
  e.preventDefault();

  let hasError = false;

  if (!formData.email) {
    setEmailError('Email is required');
    hasError = true;
  }

  if (!formData.password) {
    setPasswordError('Password is required');
    hasError = true;
  }

  if (hasError) {
    return; // Stop the form submission if there are errors
  }

  setIsLoading(true);
  try {
    const response = await axios.post(
      'http://localhost:6099/api/users/login',
      {
        ...formData,
        updatedAt: new Date().toISOString(),
      },
      {
        withCredentials: true,
      }
    );
    console.log('Response:', response);
    console.log('Response Data:', response.data);

    localStorage.setItem('token', response.data.token);

    toast({
      title: 'Success',
      description: response.data.message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } catch (error) {
    console.error('Error Response:', error.response);
    const { response } = error;

    switch (response.data.statusCode) {
      case 403:
        toast({
          title: 'Forbidden',
          description: response.data.message,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        break;
      case 400:
        toast({
          title: 'Bad request',
          description: response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
      case 401:
        toast({
          title: 'Unauthorized',
          description: response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
      case 404:
        toast({
          title: 'Not found',
          description: response.data.message,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        break;
      default:
        toast({
          title: 'Internal Server Error',
          description:
            "An Error has occurred and we're working to fix the problem!",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
    }
  } finally {
    setIsLoading(false);
  }
};

return (
  <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} background={'#0d1117'}>

    <Helmet>
      <title>Sign in | ShipJitt</title>
    </Helmet>


    <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Stack spacing={4} w={'full'} maxW={'md'}>
        <form onSubmit={handleSubmit}>
          <Heading fontSize={'2xl'} color='gray.200' fontFamily={'Bricolage Grotesque'}>Sign in to your account</Heading>

          <FormControl id="email" mt={10}>
            <FormLabel color='gray.200'>Email address</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)" color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }}
            />
          </FormControl>

          {emailError && (
            <Text py={0} color='red.500' fontSize={'md'} fontFamily={'Bricolage Grotesque'}>
              {emailError}
            </Text>
          )}

          <FormControl id="password" mt={5}>
            <FormLabel color='gray.200'>Password</FormLabel>
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)" color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }}
            />
          </FormControl>

          {passwordError && (
            <Text py={0} color='red.500' fontSize={'md'} fontFamily={'Bricolage Grotesque'}>
              {passwordError}
            </Text>
          )}

          <Stack spacing={6} mt={2}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Link color='gray.200' href='/forgot-password' fontFamily={'Bricolage Grotesque'}>Forgot password?</Link>
              
            </Stack>

            <Link color='gray.200' fontSize={'md'} fontFamily={'Bricolage Grotesque'}>
                By signing in, you agree to our <Link href='/tos'>Terms of Service</Link> and <Link href='/privacy-policy'>Privacy policy</Link>
            </Link>


            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Sign in'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
    <Flex flex={1}>
      <Image
        alt={'Login Image'}
        objectFit={'cover'}
        src={
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
      />
    </Flex>
  </Stack>
);
}
