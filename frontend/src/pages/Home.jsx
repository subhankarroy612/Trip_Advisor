import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.css'
import Places, { CarouselLoader } from '../components/Places';
import { useDispatch } from 'react-redux';
import { getP1, getT1 } from '../redux/homeReducer/home.actions';
import TopButtons from '../components/TopButtons';
import Tours from '../components/Tours';

const explore = [
  { image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/5c/fc/d5/70db3946-e1aa-45c9.jpg?w=400&h=-1&s=1', title: "A food crawl through Houston's Chinatown" },
  { image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/5c/fd/26/41f1ea5b-19ab-4b2e.jpg?w=400&h=-1&s=1', title: 'The perfect two days in London' },
  { image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/5c/fd/47/21b4e52f-c0cb-4759.jpg?w=400&h=300&s=1', title: 'Spring ahead: The best places to travel in April' },
]

export default function Home() {

  const [p1, setP1] = useState([]);
  const [t1, setT1] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getP1()).then((r) => {
      setP1(r)
    })
    dispatch(getT1()).then((r) => {
      setT1(r)
    })
  }, [dispatch]);



  return (
    <Box >


      <Box className={styles.home}>

        <TopButtons />

        <Box
          position={'relative'}
          mt={'20px'}
          h={'350px'}
          id={styles.searchBox}>

          <Image width={'100%'} height={'100%'} src='https://static.tacdn.com/img2/brand/home/homemar2022_dt_trans.webp' alt='pic' />

          <Box
            position={'absolute'}
            zIndex={20}
          >
            <Input
              p={5}
              fontSize={16}
              borderRadius={50}
              id={styles.search}
              placeholder='Where to?' zIndex={'10'} />
          </Box>
        </Box>

        <Box className={styles.places}>

          <Text fontSize={'2xl'} as='b' >Where to go, right now</Text>
          <Text color={'gray'} textAlign={'start'}>Spots at the top of travellers’ must-go lists</Text>

          {p1?.length ? <Places data={p1} /> : <CarouselLoader />}
        </Box>

        <Flex
          mt={20}
          position={'relative'}
          w={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box id={styles.nextTrip}
            p={8}
            textAlign={'start'}
            w={'55%'}
            bg={'#fff5f5'}
          >
            <Text as={'b'} fontSize={'2xl'}>Your next trip starts here</Text>
            <Text>Top-rated hotels that have the Best of the Best crown.</Text>
            <Button
              position={'absolute'}
              bottom={3}
              bg={'black'}
              color={'white'}>See the list</Button>
          </Box>
          <Box w={'45%'} id={styles.nextTripImage}>
            <Image h={180} w={'100%'} objectFit={'cover'} src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f7/1d/a0/caption.jpg?w=1000&h=-1&s=1' />
          </Box>
        </Flex>

        <Box className={styles.places}>

          <Text fontSize={'2xl'} as='b' >Ways to tour Kolkata (Calcutta)</Text>
          <Text color={'gray'} textAlign={'start'}>Book these experiences for a close-up look at Kolkata (Calcutta).</Text>
          {t1?.length ? <Tours data={t1} /> : <CarouselLoader />}
        </Box>

      </Box>

      <Box
        textAlign={'start'}
        w={'100%'}
        bg={'#fff5f5'}
        mt={10}
      >
        <Box className={styles.home}>
          <Text fontSize={'2xl'} as={'b'}>More to explore</Text>

          <Box id={styles.explore}>

            {
              explore.map((ele, i) => {
                return <Box
                  textAlign={'center'}
                  h={280} bg={'white'} key={i}>
                  <Image mb={5} h={200} w={'100%'} src={ele.image} />
                  <Text as={'b'}>{ele.title}</Text>
                </Box>
              })
            }

          </Box>
        </Box>

      </Box>

    </Box >
  )
}
