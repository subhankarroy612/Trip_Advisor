import React from 'react'
import { AiOutlineEye, AiFillEye } from 'react-icons/ai'
import { BsChevronLeft } from 'react-icons/bs'
import { Box, Button, Link, Divider, Flex, Img, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'


export default function LoginModal({ handleClick }) {

    const [show, setShow] = React.useState(false)

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


            <form style={{
                lineHeight: '40px',
                marginTop: '3vh'
            }} >

                <Text as={'b'} fontSize={'xs'} >Email address</Text>
                <Input placeholder='Email' type={'email'} />
                <Text as={'b'} fontSize={'xs'}>Password</Text>
                <InputGroup size='md'>
                    <Input
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
                    <Button borderRadius={'50px'} h='50px' bg={'black'} color='white'>Sign in</Button>

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
