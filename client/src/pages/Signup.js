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
//       first_name: '',
//       last_name: '',
//       email: '',
//       password: '',
//       timeZone: ''
//     });
//     const [firstNameError, setFirstNameError] = useState('');
//     const [lastNameError, setLastNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     const [isLoading, setIsLoading] = useState(false); 
  
//     const [message, setMessage] = useState('');
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     };
  
//     const handleSubmit = async (e) => {


//       if(formData.first_name == '' || formData.first_name == null) {
//         setFirstNameError('First name is required');

//       }

//       if(formData.last_name == '' || formData.last_name == null) {
//         setLastNameError('Last name is required');

//       }

//       if(formData.email == '' || formData.email == null) {
//         setEmailError('Email is required');

//       }

//       if(formData.password == '' || formData.password == null) {
//         setPasswordError('Password is required');

//       }

    

//       e.preventDefault();
//       setIsLoading(true);
//       try {
//         const response = await axios.post('http://localhost:6099/api/users/register', { // Ensure this URL matches your backend
//           ...formData,
//           createdAt: new Date().toISOString() // Adjust this according to your backend requirements
//         });
//         console.log(response.data);
//         console.log(response.data);

//         toast({
//           title: 'Account created.',
//           description: response.data.message,
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });

//         setMessage(response.data.message);
//       } catch (error) {
//         if (error.response) {
//           setMessage(error.response.data.message);
//           console.log(error.response.data.message);

//           toast({
//             title: 'An error occurred.',
//             description: error.response.data.message,
//             status: 'error',
//             duration: 3000,
//             isClosable: true,
//           });

//         } else {
//           setMessage("An Error has occurred and we're working to fix the problem!");
//           console.log("An Error has occurred and we're working to fix the problem!");

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
//             <Heading fontSize={'2xl'} color='gray.200' fontFamily={'Bricolage Grotesque'}>
//                 Create an account in Ship jitt
//             </Heading>
//             <form onSubmit={handleSubmit}>
//             <FormControl id="email">
//               <FormLabel color='gray.200'>First name</FormLabel>
//               <Input 
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               type="text" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
//             </FormControl>

//             {firstNameError ? (
//             <Text py={0} color='red.500' fontSize={'lg'} fontFamily={'Bricolage Grotesque'}>
//               {firstNameError}
//             </Text>
//             ) : null}


//             <FormControl id="email">
//               <FormLabel color='gray.200'>Last name</FormLabel>
//               <Input 
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               type="text" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
//             </FormControl>

//             {lastNameError ? (
//             <Text py={0} color='red.500' fontSize={'lg'} fontFamily={'Bricolage Grotesque'}>
//               {lastNameError}
//             </Text>
//             ) : null}

//             <FormControl id="email">
//               <FormLabel color='gray.200'>Email address</FormLabel>
//               <Input 
//               name='email'
//               value={formData.email}
//               onChange={handleChange}
//               type="email" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
//             </FormControl>

//             <Text py={0} color='red.500' fontSize={'lg'} fontFamily={'Bricolage Grotesque'}>
//               {emailError}
//             </Text>

//             <FormControl id="password">
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
           
            
//             <Stack spacing={6}>
//               <Stack
//                 direction={{ base: 'column', sm: 'row' }}
//                 align={'start'}
//                 justify={'space-between'}>
//                 <Link color='gray.200'>Forgot password?</Link>
//               </Stack>
//               <Button type="submit">
//                 { isLoading ? <Spinner /> : 'Create account'}
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
  Checkbox,
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
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      timeZone: ''
  });
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
      
      // Clear errors on change
      if (name === 'first_name') setFirstNameError('');
      if (name === 'last_name') setLastNameError('');
      if (name === 'email') setEmailError('');
      if (name === 'password') setPasswordError('');
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      let hasError = false;

      if (formData.first_name === '' || formData.first_name == null) {
          setFirstNameError('First name is required');
          hasError = true;
      }

      if (formData.last_name === '' || formData.last_name == null) {
          setLastNameError('Last name is required');
          hasError = true;
      }

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
          const response = await axios.post('http://localhost:6099/api/users/register', {
              ...formData,
              createdAt: new Date().toISOString()
          });

          console.log(response.data);

          toast({
              title: 'Account created.',
              description: response.data.message,
              status: 'success',
              duration: 3000,
              isClosable: true,
          });

          setMessage(response.data.message);
      } catch (error) {
          if (error.response) {
              setMessage(error.response.data.message);
              console.log(error.response.data.message);

              toast({
                  title: 'An error occurred.',
                  description: error.response.data.message,
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
              });

          } else {
              setMessage("An Error has occurred and we're working to fix the problem!");
              console.log("An Error has occurred and we're working to fix the problem!");

              toast({
                  title: 'Error',
                  description: "An Error has occurred and we're working to fix the problem!",
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
                  <Heading fontSize={'2xl'} color='gray.200' fontFamily={'Bricolage Grotesque'}>
                      Create an account in Ship jitt
                  </Heading>
                  <form onSubmit={handleSubmit}>

                      <FormControl id="first_name" mt={5}>
                          <FormLabel color='gray.200'>First name</FormLabel>
                          <Input
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleChange}
                              type="text" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)" color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }} />
                      </FormControl>

                      {firstNameError && (
                          <Text py={0} color='red.500' fontSize={'md'} fontFamily={'Bricolage Grotesque'}>
                              {firstNameError}
                          </Text>
                      )}

                      <FormControl id="last_name" py={3}>
                          <FormLabel color='gray.200'>Last name</FormLabel>
                          <Input
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleChange}
                              type="text" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)" color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }} />
                      </FormControl>

                      {lastNameError && (
                          <Text py={0} color='red.500' fontSize={'md'} fontFamily={'Bricolage Grotesque'}>
                              {lastNameError}
                          </Text>
                      )}

                      <FormControl id="email" py={3}>
                          <FormLabel color='gray.200'>Email address</FormLabel>
                          <Input
                              name='email'
                              value={formData.email}
                              onChange={handleChange}
                              type="email" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)" color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }} />
                      </FormControl>

                      {emailError && (
                          <Text py={0} color='red.500' fontSize={'md'} fontFamily={'Bricolage Grotesque'}>
                              {emailError}
                          </Text>
                      )}

                      <FormControl id="password" py={3}>
                          <FormLabel color='gray.200'>Password</FormLabel>
                          <Input
                              name='password'
                              value={formData.password}
                              onChange={handleChange}
                              type="password" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)" color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)' }} />
                      </FormControl>

                      {passwordError && (
                          <Text py={0} color='red.500' fontSize={'md'} fontFamily={'Bricolage Grotesque'}>
                              {passwordError}
                          </Text>
                      )}

                      <Stack spacing={6}>
                          <Stack
                              direction={{ base: 'column', sm: 'row' }}
                              align={'start'}
                              justify={'space-between'}>
                              <Link color='gray.200' href='/auth/signin'>Already have an account? Sign in here</Link>
                          </Stack>
                          <Button type="submit">
                              {isLoading ? <Spinner /> : 'Create account'}
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
