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
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import axios from 'axios';
  
  export default function SplitScreen() {

    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      timeZone: ''
    });
  
    const [message, setMessage] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:6099/api/users/register', { // Ensure this URL matches your backend
          ...formData,
          createdAt: new Date().toISOString() // Adjust this according to your backend requirements
        });
        console.log(response.data);
        console.log(response.data);
        setMessage(response.data.message);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("An error occurred. Please try again later.");
        }
      }
    };

    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}
      background={'#0d1117'}
      >
        
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'} color='gray.200' fontFamily={'Bricolage Grotesque'}>
                Create an account in Ship jitt
            </Heading>
            <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel color='gray.200'>First name</FormLabel>
              <Input 
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              type="text" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
            </FormControl>

            <FormControl id="email">
              <FormLabel color='gray.200'>Last name</FormLabel>
              <Input 
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              type="text" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
            </FormControl>

            <FormControl id="email">
              <FormLabel color='gray.200'>Email address</FormLabel>
              <Input 
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              type="email" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
            </FormControl>

            <FormControl id="password">
              <FormLabel color='gray.200'>Password</FormLabel>
              <Input 
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              type="password" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
            </FormControl>
           
            
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Link color='gray.200'>Forgot password?</Link>
              </Stack>
              <Button type="submit">
                Sign up
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

  