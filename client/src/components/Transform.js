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
  Center,
} from '@chakra-ui/react'

export default function CallToActionWithVideo() {
  return (
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        justify={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 20 }}
        direction={{ base: 'column', md: 'row' }}>
        
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
              backgroundSize={'100%'}
              src={
                'https://preview.codeless.co/converta/default/wp-content/uploads/2023/02/img-agency-22-min.png'
              }
            />
          </Box>
        </Flex>
        
        
        <Stack flex={1} spacing={{ base: 5, md: 10 }} align='center' justify={'center'} mt={{base: 0, md: 16}}>
            <Box>
            {/* <Center> */}
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '4xl', lg: '4xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              fontFamily={'Bricolage Grotesque'}
              color={useColorModeValue('gray.300', 'black')}
              fontWeight={600}
              >
              Transform your vision into reality with our technology.
            </Text>
           
            
          </Heading>
          <Text color={useColorModeValue('#CFCFCF', 'gray.700')} opacity={'0.8'} fontSize={'lg'} mt={5} fontFamily={'Bricolage Grotesque'}>
          We are more than a software company we are your partner on the road to digital innovation and success. 
          Combining our expertise in software and UI/UX design, we offer customized solutions that meet your needs and goals.
          </Text>
          </Box>
        </Stack>
        
      </Stack>
    </Container>
  )
}
