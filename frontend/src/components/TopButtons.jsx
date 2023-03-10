import React, { memo } from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import styles from '../styles/home.module.css'
import { MdBed } from 'react-icons/md';
import { TbRoad } from 'react-icons/tb';
import { AiOutlineHome } from 'react-icons/ai';
import { MdRestaurantMenu } from 'react-icons/md';
import { CiGlobe } from 'react-icons/ci';
import { SlPlane } from 'react-icons/sl';

let fullScreenBtns = [
    { label: 'Hotels' },
    { label: 'Things to Do' },
    { label: 'Holiday Homes' },
    { label: 'Restaurants' },
    { label: 'Travel Stories' },
    { label: 'Flights' },
]


function TopButtons() {
    return (
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
    )
}

export default memo(TopButtons)
