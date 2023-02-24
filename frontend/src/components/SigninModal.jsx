import {
  Box, Button,
  Flex,
  Img,
  Text,
  VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineMail } from 'react-icons/ai'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';


export default function SigninModal({onClose}) {

  const [page, setPage] = useState('home');

  const handleClick = (v) => {
    setPage(v)
  }

  if (page === 'register') return <RegisterModal handleClick={handleClick} />
  if (page === 'login') return <LoginModal onClose={onClose} handleClick={handleClick} />
  if (page === 'home')
    return (
      <Box mt={'6vh'} p={'20px'}>

        <Img w={'190px'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/1024px-TripAdvisor_Logo.svg.png' />
        <Box w={'250px'} mt={'2vh'}>
          <Text fontSize={'2xl'} as='b' >Sign in to unlock the best of Tripadvisor.</Text>
        </Box>

        <VStack w={'100%'} mt={'6vh'} gap={'10px'}>
          <Button
            p={5}
            variant={'outline'}
            w={'100%'}
            borderRadius={'50px'}
            border={'2px solid black'}
            position={'relative'}
          >
            <Box position={'absolute'} left={5}>
              <FcGoogle size={'25px'} />
            </Box>

            Continue with Google
          </Button>

          <Button
            onClick={() => handleClick('login')}
            p={5}
            variant={'outline'}
            w={'100%'}
            borderRadius={'50px'}
            border={'2px solid black'}
            position={'relative'}
          >
            <Box position={'absolute'} left={5}>
              <AiOutlineMail size={'25px'} />
            </Box>
            Continue with email
          </Button>
        </VStack>


        <Flex mt={'14vh'}>
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

