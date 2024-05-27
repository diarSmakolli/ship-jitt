
// build with chakra ui here in the center and 4 images imline

import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/react';
const Companies = () => {
    return (
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap" py={{base: 10, md: 14}}>
            <Box w={{base: '50%', md: '25%'}} p={2}>
                <Image src="https://github.com/images/modules/site/copilot/logos/stripe.svg" alt="Image 1" />
            </Box>
            <Box w={{base: '50%', md: '25%'}} p={2}>
                <Image src="https://github.com/images/modules/site/copilot/logos/duolingo.svg" alt="Image 2" />
            </Box>
            <Box w={{base: '50%', md: '25%'}} p={2}>
                <Image src="https://github.com/images/modules/site/copilot/logos/lemonade.svg" alt="Image 3" />
            </Box>
            <Box w={{base: '50%', md: '25%'}} p={2}>
                <Image src="https://github.com/images/modules/site/copilot/logos/sas.svg" alt="Image 4" />
            </Box>
        </Flex>
    );
};

export default Companies;