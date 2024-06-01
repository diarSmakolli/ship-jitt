import React from 'react';
import {
    Box,
    Flex,
    SimpleGrid,
    Center,
    Text,
    VStack,
    HStack,
    Container,
    Image,
    Button,
    FormLabel,
    Input
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {useAuth} from '../auth/authContext';
import axios from 'axios';

function Profile() {
    const { user, loading } = useAuth();
    const [profilePicture, setProfilePicture] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    let profilePictureUrl = `http://localhost:6099/api/users/profile-picture/${user.profile_picture}`;
    

    


    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSave = async () => {
        try {
            if (profilePicture) {
                const formData = new FormData();
                formData.append('profile_picture', profilePicture);
                formData.append('updatedAt', new Date().toISOString());
                formData.append('updatedBy', user.id);
                formData.append('timeZone', Intl.DateTimeFormat().resolvedOptions().timeZone);

                await axios.post(`http://localhost:6099/api/users/update-profile-picture/${user.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            await axios.put(`http://localhost:6099/api/users/${user.id}`, {
                first_name: firstName,
                last_name: lastName,
                updatedAt: new Date().toISOString(),
                updatedBy: user.id,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });

            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <Box background={'#0d1117'}>


            <Box>
                <Navbar />
            </Box>

            <Container maxW='6xl'>

                <Text color='white' fontFamily={'Bricolage Grotesque'} fontSize={'4xl'}>
                    Profile Information
                </Text>

                <Text color='gray.200' fontFamily={'Bricolage Grotesque'} fontSize={'md'}>
                    Update your account's profile information and email address.
                </Text>


                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)' mt={10}>

                    <HStack>
                        <Image src={profilePictureUrl} width='100px' height='100px' 
                            rounded={'full'}
                        />
                    </HStack>

                    <Input type='file' onChange={handleProfilePictureChange} mt={5} />

                    {/* <Button bg='white' as="input" color='black' mt={5} type="file" onChange={handleProfilePictureChange}>
                        Select a new photo
                    </Button> */}

                    <Text color='gray.400' mt={3}>
                        Maximum size of 2MB
                    </Text>

                    <FormLabel mt={10} color='gray.200'>
                        First name
                    </FormLabel>
                    <Input type='text' width='40%' color='gray.200' value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <FormLabel mt={10} color='gray.200'>
                        Last name
                    </FormLabel>
                    <Input type='text' width='40%' color='gray.200' value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    {/* // email cannot be updated */}
                    <FormLabel mt={10} color='gray.200'>
                        Email
                    </FormLabel>
                    <Input type='text' width='40%' color='gray.200' value={user.email} disabled />


                    <HStack>
                        <Button bg='white' color='black' mt={5} onClick={handleSave}>
                            Save
                        </Button>
                    </HStack>

                </Box>




                <Text color='white' fontFamily={'Bricolage Grotesque'} fontSize={'4xl'} mt={10}>
                    Change password
                </Text>

                <Text color='gray.200' fontFamily={'Bricolage Grotesque'} fontSize={'md'}>
                    Ensure your account is using a long, random password to stay secure.
                </Text>


                <Box bg="rgba(0,0,0,.5)" p={9} borderRadius="1.5rem" border='1.5px solid rgba(255,255,255,.12)' mt={10}>

                    <FormLabel mt={10} color='gray.200'>
                        First name
                    </FormLabel>
                    <Input type='text' width='40%' color='gray.200' />

                    <FormLabel mt={10} color='gray.200'>
                        Last name
                    </FormLabel>
                    <Input type='text' width='40%' color='gray.200' />

                    <FormLabel mt={10} color='gray.200'>
                        Email
                    </FormLabel>
                    <Input type='text' width='40%' color='gray.200' />


                    <HStack>
                        <Button bg='white' color='black' mt={5}>
                            Save
                        </Button>
                    </HStack>

                </Box>


                <Text color='white' fontFamily={'Bricolage Grotesque'} fontSize={'4xl'} mt={10}>
                    Delete my account permamently
                </Text>

                <Text color='gray.200' fontFamily={'Bricolage Grotesque'} fontSize={'md'}>
                    Do you really want to delete permamently your account? This action cannot be undone.
                </Text>

                <Button bg='red.500' color='white' mt={5}>
                    Delete my account
                </Button>


                
                <Box py={10}>
                    <Footer />
                </Box>
                


            </Container>
        </Box>
    )
}

export default Profile