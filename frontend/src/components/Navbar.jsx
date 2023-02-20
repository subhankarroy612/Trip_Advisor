import React from 'react'
import styles from '../styles/navbar.module.css'
import { Box, Image, Text } from '@chakra-ui/react'
import { VscEdit } from 'react-icons/vsc'
import { AiOutlineHeart, AiOutlineBell } from 'react-icons/ai'
import { BsCart3 } from 'react-icons/bs'

const navItems = [
  { img: '', label: 'Review' },
  { img: '', label: 'Trips' },
  { img: '', label: 'Alerts' },
  { img: '', label: 'Sign in' },
  { img: '', label: 'Basket' }
]

export default function Navbar() {
  return (
    <div id={styles.navbar}>

      <Image width={'190px'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/1024px-TripAdvisor_Logo.svg.png' />

      <div id={styles.navItems_container}>

        {
          navItems.map((ele, i) => {
            return <Box color={ele.label === 'Sign in' && 'white'} bgColor={ele.label === 'Sign in' && 'black'} className={styles.navItems_child} key={i}>
              {i === 0 && <VscEdit size={'25px'} />}
              {i === 1 && <AiOutlineHeart size={'25px'} />}
              {i === 2 && <AiOutlineBell size={'25px'} />}
              {i === 4 && <BsCart3 size={'25px'} />}
              <Text className={ele.label !== 'Sign in' && styles.navText} as={'b'} fontSize={'sm'}>{ele.label}</Text>
            </Box>
          })
        }

      </div>
    </div>
  )
}
