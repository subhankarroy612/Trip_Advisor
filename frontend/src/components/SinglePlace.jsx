import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSinglePlace } from '../redux/homeReducer/home.actions'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import styles from '../styles/singlePlace.module.css'
import TopButtons from './TopButtons'

export default function SinglePlace() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const [place, setPlace] = useState({})

  useEffect(() => {
    dispatch(getSinglePlace(id)).then((r) => {
      setPlace(r);
    })
  }, [dispatch, id])

  return (
    <Box id={styles.singlePlace}>
      <Flex mt={'5vh'} mb={'3vh'} gap={4} flexWrap='wrap' lineHeight={['15px', '25px', '35px']}>
        <Text fontSize={['2xl', '4xl', '5xl']} color={'red'} as='b'>Explore</Text>
        <Text fontSize={['2xl', '4xl', '5xl']} as='b'>{place.title}</Text>
      </Flex>
      <TopButtons />

      <Flex gap={1} mt={'3vh'} h={'400px'} >
        <Box id={styles.imageLeftSec} w={'60%'} >
          <Image h={'100%'} w='100%' src={place?.images?.img1} />
        </Box>
        <Flex id={styles.imageRightSec} flexDirection={'column'} gap={1} w={'60%'} >
          <Box h={'50%'}>
            <Image h={'100%'} w='100%' src={place?.images?.img2} />
          </Box>
          <Box h={'50%'}>
            <Image h={'100%'} w='100%' src={place?.images?.img3} />
          </Box>
        </Flex>
      </Flex>

      <Box mt={'6vh'} textAlign={'start'}>
        <Text as={'b'} fontSize={'3xl'}>About {place.title}</Text>
        <Text color={'gray.700'}>{place.about}</Text>
      </Box>

    </Box>
  )
}
