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
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    let defaultProfilePicture = "https://www.gravatar.com/avatar/938610872fd268285c3d4024cfa46360.png?d=retro&r=g";
    let profilePictureUrl = `http://localhost:6099/api/users/profile-picture/${user.profile_picture}`;

    if(user.profile_picture == null) {
        profilePictureUrl = defaultProfilePicture;
    }
    
    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
        }
    }, [user]);

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
            
            if(firstName != '' || lastName != '') {
            await axios.put(`http://localhost:6099/api/users/${user.id}`, {
                first_name: firstName,
                last_name: lastName,
                updatedAt: new Date().toISOString(),
                updatedBy: user.id,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
        }

            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            await axios.put(`http://localhost:6099/api/users/change-password/${user.id}`, {
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
                updatedAt: new Date().toISOString(),
                updatedBy: user.id,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });

            alert('Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch(error) {
            console.error('Error changing password', error);
        }
    }

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
                        Current password
                    </FormLabel>
                    <Input type='password' 
                    value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                    width='40%' color='gray.200' required />

                    <FormLabel mt={10} color='gray.200'>
                        New password
                    </FormLabel>
                    <Input type='password' 
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    width='40%' color='gray.200' required />

                    <FormLabel mt={10} color='gray.200'>
                        Confirm new password
                    </FormLabel>
                    <Input type='password' 
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    width='40%' color='gray.200' required />


                    <HStack>
                        <Button bg='white' color='black' mt={5} onClick={handleChangePassword}>
                            Change password
                        </Button>
                    </HStack>

                </Box>
                
                <Box py={10}>
                    <Footer />
                </Box>
                


            </Container>
        </Box>
    )
}

export default Profile