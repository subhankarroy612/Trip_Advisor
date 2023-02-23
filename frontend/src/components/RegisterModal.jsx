import React from 'react'
import { AiOutlineEye, AiFillEye } from 'react-icons/ai'
import { BsChevronLeft } from 'react-icons/bs'
import { Box, Button, Link, Divider, Flex, Img, Input, InputGroup, InputRightElement, Text, Checkbox } from '@chakra-ui/react'


export default function RegisterModal({ handleClick }) {

  const [show, setShow] = React.useState(false)

  return (
    <Box  p={'20px'}>

      <Button
        onClick={() => handleClick('home')}
        position={'relative'}
        left={-10}
        top={-6}
        variant={'ghost'} bg='white'>
        <BsChevronLeft size={'20px'} />
      </Button>

      <Img mt={'6vh'} w={'190px'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/1024px-TripAdvisor_Logo.svg.png' />
      <Box w={'290px'} mt={'2vh'}>
        <Text fontSize={'2xl'} as='b' >Join to unlock the best of Tripadvisor.</Text>
      </Box>


      <form style={{
        lineHeight: '40px',
        marginTop: '3vh'
      }} >

        <Flex gap={5}>
          <Box>
            <Text as={'b'} fontSize={'xs'} >First Name</Text>
            <Input placeholder='First Name' type={'text'} />
          </Box>
          <Box>
            <Text as={'b'} fontSize={'xs'} >Last Name</Text>
            <Input placeholder='Last Name' type={'text'} />
          </Box>
        </Flex>

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

        <Flex lineHeight={'none'} mt='5' gap={2}>
          <Checkbox />
          <Text fontSize={'sm'} background={'1px solid black'} >Yes, inform me on deals & new features. I can opt out at any time.
          </Text>
        </Flex>

        <Flex m={'auto'} mt={'2vh'} w={'80%'} flexDirection='column' gap={'25px'} >
          <Button borderRadius={'50px'} h='50px' bg={'black'} color='white'>Join</Button>

          <Box position={'relative'} p={'5px'}>
            <Text
              p={'5px'}
              position={'absolute'}
              top={-5}
              bg='white'
              zIndex={'100'}
              left={'70px'}
            >Already a member?</Text>
            <Divider borderColor={'gray'} />
          </Box>

          <Box>
            <Text fontSize={'md'}><Link onClick={() => handleClick('login')} style={{ textDecoration: 'underline', fontWeight: 'bolder' }}>Log in</Link> using your Tripadvisor account</Text>
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
