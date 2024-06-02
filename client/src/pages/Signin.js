// import {
//     Button,
//     Checkbox,
//     Flex,
//     FormControl,
//     FormLabel,
//     Heading,
//     Input,
//     Link,
//     Stack,
//     Image,
//     useToast,
//     Spinner,
//     Text,
//   } from '@chakra-ui/react';
//   import { useState } from 'react';
//   import axios from 'axios';
  
//   export default function SplitScreen() {

//     const toast = useToast();

//     const [formData, setFormData] = useState({
//       email: '',
//       password: '',
//       timeZone: ''
//     });
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
  
//     const [isLoading, setIsLoading] = useState(false);
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     };
  
//     const handleSubmit = async (e) => {
      
//       if(formData.email == '' || formData.email == null) {
//         setEmailError('Email is required');
//         return;
//       }

//       if(formData.password == '' || formData.password == null) {
//         setPasswordError('Password is required');
//         return;
//       }

//       e.preventDefault();
//       setIsLoading(true);
//       try {
//         const response = await axios.post('http://localhost:6099/api/users/login', {
//           ...formData,
//           updatedAt: new Date().toISOString() // Adjust this according to your backend requirements
//         }, {
//           withCredentials: true
//         });
//         console.log('Response:', response);
//         console.log('Response Data:', response.data);

//         localStorage.setItem('token', response.data.token);

//         toast({
//           title: 'Success',
//           description: response.data.message,
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });

//         setTimeout(() => {
//           window.location.href = '/';
//         }, 2000);

//       } catch (error) {
//         console.error('Error Response:', error.response);
//         if (error.response) {
//           console.error('Error Response Data:', error.response.data);
//           toast({
//             title: 'Error',
//             description: error.response.data.message,
//             status: 'error',
//             duration: 3000,
//             isClosable: true,
//           });
//         } else {
//           toast({
//             title: 'Error',
//             description: "An Error has occurred and we're working to fix the problem!",
//             status: 'error',
//             duration: 3000,
//             isClosable: true,
//           });
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
    



//     return (
//       <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}
//       background={'#0d1117'}
//       >

//         <Flex p={8} flex={1} align={'center'} justify={'center'}>
//           <Stack spacing={4} w={'full'} maxW={'md'}>
//           <form onSubmit={handleSubmit}>
//             <Heading fontSize={'2xl'} color='gray.200' fontFamily={'Bricolage Grotesque'}>Sign in to your account</Heading>

//             <FormControl id="email" mt={10}>
//               <FormLabel color='gray.200'>Email address</FormLabel>
//               <Input 
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               type="email" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
//             </FormControl>
            
//             {emailError ? (
//             <Text py={0} color='red.500' fontSize={'lg'} fontFamily={'Bricolage Grotesque'}>
//               {emailError}
//             </Text>
//             ) : null}

//             <FormControl id="password" mt={5}>
//               <FormLabel color='gray.200'>Password</FormLabel>
//               <Input 
//               name='password'
//               value={formData.password}
//               onChange={handleChange}
//               type="password" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
//             </FormControl>

//             {passwordError ? (
//             <Text py={0} color='red.500' fontSize={'lg'} fontFamily={'Bricolage Grotesque'}>
//               {passwordError}
//             </Text>
//             ) : null}

//             <Stack spacing={6} mt={2}>
//               <Stack
//                 direction={{ base: 'column', sm: 'row' }}
//                 align={'start'}
//                 justify={'space-between'}>
//                 <Link color='gray.200'>Forgot password?</Link>
//               </Stack>
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading ? <Spinner /> : 'Sign in'}
//               </Button>
//             </Stack>
//             </form>
//           </Stack>
//         </Flex>
//         <Flex flex={1}>
//           <Image
//             alt={'Login Image'}
//             objectFit={'cover'}
//             src={
//               'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//             }
//           />
//         </Flex>
//       </Stack>
//     );
//   }


import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useToast,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

export default function SplitScreen() {
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

    if (formData.email === '' || formData.email == null) {
      setEmailError('Email is required');
      hasError = true;
    }

    if (formData.password === '' || formData.password == null) {
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
          updatedAt: new Date().toISOString(), // Adjust this according to your backend requirements
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
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
        toast({
          title: 'Error',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description:
            "An Error has occurred and we're working to fix the problem!",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} background={'#0d1117'}>
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
                <Link color='gray.200'>Forgot password?</Link>
              </Stack>
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
