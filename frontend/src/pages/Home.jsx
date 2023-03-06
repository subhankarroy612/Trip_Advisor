import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.css'
import { MdBed } from 'react-icons/md';
import { TbRoad } from 'react-icons/tb';
import { AiOutlineHome } from 'react-icons/ai';
import { MdRestaurantMenu } from 'react-icons/md';
import { CiGlobe } from 'react-icons/ci';
import { SlPlane } from 'react-icons/sl';
import Places from '../components/Places';
import axios from 'axios'
import { Url } from '../components/Url';

let fullScreenBtns = [
  { label: 'Hotels' },
  { label: 'Things to Do' },
  { label: 'Holiday Homes' },
  { label: 'Restaurants' },
  { label: 'Travel Stories' },
  { label: 'Flights' },
]



export default function Home() {

  const [p1, setP1] = useState([])

  useEffect(() => {
      getP1()
  }, []);

  const getP1 = async () => {
    let res = await axios(Url + '/getData/places')
    setP1(res.data)
  }


  return (
    <Box id={styles.home}>

      <Box
        mt={'18px'}
        id={styles.topbtns}
      >
        {
          fullScreenBtns.map((ele, i) => {
            return <Button
              h={'50px'}
              borderRadius={'10px'}
              colorScheme='black'
              variant={'outline'}
              bg={'white'}
              color={'black'}
              key={i}>

              <Flex
                w={'full'}
                alignItems='center'
                justifyContent={'space-between'}
              >
                <Text fontSize={'sm'}>{ele.label}</Text>
                {i === 0 && <MdBed size={'25px'} />}
                {i === 1 && <TbRoad size={'25px'} />}
                {i === 2 && <AiOutlineHome size={'25px'} />}
                {i === 3 && <MdRestaurantMenu size={'25px'} />}
                {i === 4 && <CiGlobe size={'25px'} />}
                {i === 5 && <SlPlane size={'25px'} />}
              </Flex>
            </Button>

          })
        }
      </Box>

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

        { p1 && <Places data={p1} />}
      </Box>

    </Box >
  )
}
