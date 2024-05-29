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
  
  export default function SplitScreen() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}
      background={'#0d1117'}
      >
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'} color='gray.200' fontFamily={'Bricolage Grotesque'}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel color='gray.200'>Email address</FormLabel>
              <Input type="email" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
            </FormControl>
            <FormControl id="password">
              <FormLabel color='gray.200'>Password</FormLabel>
              <Input type="password" border='1.5px solid rgba(255,255,255,.12)' bg="rgba(0,0,0,.5)"  color='gray.200' _hover={{ border: '1.5px solid rgba(255,255,255,.12)'}} />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Link color='gray.200'>Forgot password?</Link>
              </Stack>
              <Button>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1716910729414-302a85b5c3ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Nnx8fGVufDB8fHx8fA%3D%3D'
            }
          />
        </Flex>
      </Stack>
    );
  }

  