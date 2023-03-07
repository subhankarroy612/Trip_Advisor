import { Box, Image, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.css'
import Places from '../components/Places';
import { useDispatch } from 'react-redux';
import { getP1 } from '../redux/homeReducer/home.actions';
import TopButtons from '../components/TopButtons';


export default function Home() {

  const [p1, setP1] = useState([])
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(getP1()).then((r) => {
      setP1(r)
    })
  }, [dispatch]);


  return (
    <Box id={styles.home}>

      <TopButtons/>

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

        {p1 && <Places data={p1} />}
      </Box>

    </Box >
  )
}
