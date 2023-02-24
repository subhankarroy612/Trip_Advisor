import React, { useState } from 'react'
import { AiOutlineEye, AiFillEye } from 'react-icons/ai'
import { BsChevronLeft } from 'react-icons/bs'
import { Box, Button, Link, Divider, Flex, Img, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { login } from '../redux/authReducer/auth.actions';

export default function LoginModal({ handleClick, onClose }) {

    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [show, setShow] = React.useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        if (!data.email || !data.password) {
            setLoading(false)
            return toast({
                title: 'Please fill all the details!',
                status: 'error',
                duration: 5000,
                position: 'top',
                isClosable: true,
            })
        }

        dispatch(login(data)).then((r) => {
            if (r)
                onClose()
            return toast({
                title: r ? 'Login successful!' : 'Invalid credentials!',
                status: r ? 'success' : 'error',
                duration: 5000,
                position: 'top',
                isClosable: true,
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Box p={'20px'}>

            <Button
                onClick={() => handleClick('home')}
                position={'relative'}
                left={-10}
                top={-6}
                variant={'ghost'} bg='white'>
                <BsChevronLeft size={'20px'} />
            </Button>

            <Img mt={'6vh'} w={'190px'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/1024px-TripAdvisor_Logo.svg.png' />
            <Box w={'250px'} mt={'2vh'}>
                <Text fontSize={'2xl'} as='b' >Welcome back.</Text>
            </Box>


            <form
                onSubmit={handleSubmit}
                style={{
                    lineHeight: '40px',
                    marginTop: '3vh'
                }} >

                <Text as={'b'} fontSize={'xs'} >Email address</Text>
                <Input onClick={handleChange} name={'email'} placeholder='Email' type={'email'} />
                <Text as={'b'} fontSize={'xs'}>Password</Text>
                <InputGroup size='md'>
                    <Input
                        onClick={handleChange}
                        name={'password'}
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? <AiFillEye fontSize={'25px'} /> : <AiOutlineEye fontSize={'25px'} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <Text as={'u'} background={'1px solid black'} >Forgot password?</Text>

                <Flex m={'auto'} mt={'2vh'} w={'80%'} flexDirection='column' gap={'25px'} >
                    <Button
                        isLoading={loading}
                        loadingText={'Submitting'}
                        type='submit'
                        borderRadius={'50px'}
                        h='50px'
                        bg={'black'}
                        color='white'
                    >Sign in</Button>

                    <Box position={'relative'} p={'5px'}>
                        <Text
                            p={'5px'}
                            position={'absolute'}
                            top={-5}
                            bg='white'
                            zIndex={'100'}
                            left={'80px'}
                        >Not a member?</Text>
                        <Divider borderColor={'gray'} />
                    </Box>

                    <Box>
                        <Text fontSize={'md'}><Link onClick={() => handleClick('register')} style={{ textDecoration: 'underline', fontWeight: 'bolder' }}>Join</Link> to unlock the best of Tripadvisor</Text>
                    </Box>

                </Flex>
            </form>

            <Flex mt={'1vh'}>
                <Text fontSize={'xs'} textAlign='center' p={'15px'}>
                    By proceeding, you agree to our Terms of Use and confirm you have read our Privacy and Cookie Statement.
                </Text>
            </Flex>

            <Flex>
                <Text fontSize={'xs'} textAlign='center'>
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </Text>
            </Flex>
        </Box>
    )
}
