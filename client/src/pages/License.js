import React from 'react';
import { Box, Container, Text, Button } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';


function License() {
    return (
        <div>
        <Helmet>
            <title>Licenses | ShipJitt</title>
        </Helmet>
        <Box bg='#000'>

            <Container maxW='2xl'>

                <Box py={10}>

                    <Button as='a' href='/' size='sm'>
                        Back
                    </Button>


                    <Text fontFamily={'Bricolage Grotesque'} fontWeight={600} fontSize={'4xl'} color='gray.300' mt={3}>
                        ShipJitt Boilerplate License
                        Agreement
                    </Text>


                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'lg'} color='gray.300' mt={5}>
                        <Text as='span' fontWeight={600}>TL;DR;</Text>
                        <br />
                        <Text as='span' fontWeight={600}>Personal License</Text>: Build unlimited project as an individual.
                        <br />
                        <Text as='span' fontWeight={600}>Team License</Text>: Build unlimited projects as team.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'md'} color='gray.300' mt={5}>
                        This License Agreement ("Agreement") is entered into by and between
                        ShipJitt, represented by Dijar Smakolli, whose contact information is
                        whose contact information is: dijar@shipjitt.com and you, the user ("License"),
                        regarding the use of ShipJitt software ("Software") coding boilerplate
                        available at https://shipjitt.com ("Website"). By
                        downloading, accessing, or using the Product, License agrees to be bound by the terms of this Agreement.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'xl'} color='gray.300' mt={5} fontWeight={600}>
                        1. Grant of License
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'xl'} color='gray.300' mt={5} fontWeight={600}>
                        1.1 Personal License
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'md'} color='gray.300' mt={2}>
                        ShipJitt grants License a non-exclusive, non-transferable license to use the Software
                        for personal use, including the right to reproduce, display, and create derivative works.
                        This license is limited to a single user and cannot be shared or transferred to another user.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'xl'} color='gray.300' mt={5} fontWeight={600}>
                        2. Restrictions
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'md'} color='gray.300' mt={2}>
                        License shall not sell, rent, lease, sublicense, distribute, or otherwise transfer the Software
                        to any third party. License shall not use the Software for any illegal or unauthorized purpose.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'xl'} color='gray.300' mt={5} fontWeight={600}>
                        3. Ownership and Intellectual Property
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'md'} color='gray.300' mt={2}>
                        ShipJitt retains all rights, title, and interest in and to the Software, including all copyrights,
                        patents, trade secrets, trademarks, and other intellectual property rights. License shall not
                        remove, alter, or obscure any proprietary notices in the Software.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'xl'} color='gray.300' mt={5} fontWeight={600}>
                        4. Warranty and Disclaimer
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'md'} color='gray.300' mt={2}>
                        The Software is provided "as is" without warranty of any kind. ShipJitt disclaims all warranties,
                        express or implied, including the warranties of merchantability, fitness for a particular purpose,
                        and non-infringement. License uses the Software at its own risk.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'xl'} color='gray.300' mt={5} fontWeight={600}>
                        5. Limitation of Liability
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'md'} color='gray.300' mt={2} fontWeight={600}>
                        In no event shall ShipJitt be liable for any damages arising out of the use or inability to use the Software,
                        including but not limited to direct, indirect, special, incidental, or consequential damages. License's sole
                        remedy shall be to cease using the Software.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'xl'} color='gray.300' mt={5} fontWeight={600}>
                        6. Governing Law and Jurisdiction
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'md'} color='gray.300' mt={2}>
                        This Agreement shall be governed by the laws of Kosovo. Any dispute arising under this Agreement
                        shall be resolved by the courts of the Kosovo.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'lg'} color='gray.300' mt={5} fontWeight={600}>
                        7. Entire Agreement
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'md'} color='gray.300' mt={2}>
                        This Agreement constitutes the entire agreement between ShipJitt and License regarding the Software
                        and supersedes all prior agreements and understandings, whether written or oral.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'lg'} color='gray.300' mt={5}>
                        Last updated: 22 August 2024.
                    </Text>

                    <Text fontFamily={'Bricolage Grotesque'} fontSize={'lg'} color='gray.300' mt={5}>
                        ShipJitt
                        <br />
                        Contact Information: dijar@shipjitt.com
                    </Text>

                </Box>

            </Container>

        </Box>
        </div>
    )
}

export default License