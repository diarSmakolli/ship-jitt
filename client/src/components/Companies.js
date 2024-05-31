
// build with chakra ui here in the center and 4 images imline

import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/react';
const Companies = () => {
    return (
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap" py={{base: 10, md: 14}}>
            <Box w={{base: '50%', md: '25%'}} p={2}>
                <Image src="https://cdn-icons-png.flaticon.com/512/9543/9543111.png" width='auto' height={'60px'} alt="Image 4" />
            </Box>
            <Box w={{base: '50%', md: '25%'}} p={2}>
                <Image src="https://ph-static.imgix.net/product-hunt-logo-horizontal-white.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fit=max" 
                width='auto' height='60px' alt="Image 2" />
            </Box>
            <Box w={{base: '50%', md: '25%'}} p={2}>
                <Image src="https://wearecmyk.com/wp-content/uploads/2022/12/Reddit-logo.png"  width='150px' height='70px' alt="Image 3" />
            </Box>
            {/* <Box w={{base: '50%', md: '25%'}} p={2}>
                <Image src="https://github.com/images/modules/site/copilot/logos/sas.svg" width='auto' height='60px' alt="Image 4" />
            </Box> */}
        </Flex>
    );
};

export default Companies;