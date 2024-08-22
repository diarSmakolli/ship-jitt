'use client'

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from '@chakra-ui/react'

export default function CallToActionWithVideo() {
  return (
    <Container maxW={'7xl'}>
      <Stack 
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              fontFamily={'Bricolage Grotesque'}
              fontWeight={700}
              color={useColorModeValue('gray.300', 'black')}
              >
              Empowering Businesses through Digital Solutions.
            </Text>
           
            
          </Heading>
          <Text color={useColorModeValue('#CFCFCF', 'gray.700')} 
            opacity={'0.8'}
            fontSize={'md'} fontWeight={500}
            fontFamily={'Epilogue'}
          >
                We offer a wide range software solutions designed to help business of all sizes and industries. 
                Our team work closely with clients to understand their unique needs to create customized solutions 
                that drive growth and efficiency.
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'row', sm: 'row' }}>
            <Button
              rounded={'5px'}
              size={'lg'}
              fontWeight={'500'}
              px={6}
              color="white"
              bg={'#4F00FC'}
              _hover={{bg: '#4F00FC'}}
              as='a'
              href='/contact'
              fontFamily={'Bricolage Grotesque'}
             >
              Get in touch
            </Button>

           

          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
         
          <Box
            position={'relative'}
            height={'auto'}
            rounded={'2xl'}
            width={'full'}
            overflow={'hidden'}>
            
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={
                'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?cs=srgb&dl=pexels-canva-studio-3153201.jpg&fm=jpg'
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}
