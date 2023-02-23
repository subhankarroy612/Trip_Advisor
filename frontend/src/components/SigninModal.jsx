import { Box, Button, Img, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineMail } from 'react-icons/ai'

export default function SigninModal() {
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
    </Box>
  )
}
