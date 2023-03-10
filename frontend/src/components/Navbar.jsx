import React, { useEffect, useState } from 'react';
import styles from '../styles/navbar.module.css';
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text, useDisclosure, useToast
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { AiOutlineHeart, AiOutlineBell } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';
import { HiOutlineSearch } from 'react-icons/hi';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import SigninModal from './SigninModal';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { logout } from '../redux/authReducer/auth.actions';
import { useNavigate } from 'react-router-dom';
import { getBasketData, searchResult } from '../redux/homeReducer/home.actions';

const navItems = [
  { label: 'Review' },
  { label: 'Trips' },
  { label: 'Alerts' },
  { label: 'Sign in' },
  { label: 'Basket' }
]
const hamItems = [
  { label: 'Write a review' },
  { label: 'Post photos' },
  { label: 'Alerts' },
  { label: 'Trips' },
  { label: 'Bookings' }
]

const hamItems2 = [
  { label: 'Hotels' },
  { label: 'Things to do' },
  { label: 'Restaurants' },
  { label: 'Flights' },
  { label: 'Holiday homes' },
  { label: 'Shopping' },
  { label: 'Package Holidays' },
  { label: 'Cruises' },
  { label: 'Car Hire' },
]

const profileItems = [
  { label: 'View profile' },
  { label: 'Bookings' },
  { label: 'Account info' },
  { label: 'Sign out' },
]

export default function Navbar() {

  const [ham, setHam] = useState(false);
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenS, onOpen: onOpenS, onClose: onCloseS } = useDisclosure();
  const { isAuth, token } = useSelector(s => s.auth);
  const { basketCount } = useSelector(s => s.home);
  const [profile, setProfile] = useState(false)
  const [userDetails, setUserDetails] = useState({});
  const toast = useToast();
  const router = useNavigate();
  const [text, setText] = useState('')

  useEffect(() => {
    if (token.length)
      setUserDetails(jwt_decode(token))

    dispatch({ type: 'storeModal', payload: onOpen })

    dispatch(getBasketData(token))
      .then((r) => dispatch({ type: 'basketCount', payload: r.length }))

  }, [isAuth, token, userDetails.firstname, dispatch, onOpen]);

  const handleHam = () => {
    setHam(!ham)
  }

  const handleClick = (label) => {

    if (label === 'Sign in') {
      if (isAuth)
        return setProfile(!profile)
      if (!isAuth)
        return onOpen()
    }

    if (label === 'Trips') {
      router('/trips')
    }
    if (label === 'Basket') {
      router('/basket')
    }

  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch({ type: 'basketCount', payload: 0 })
    return toast({
      title: 'Sign out successful!',
      status: 'success',
      position: 'top',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(searchResult(text)).then((r) => {
      if (r.length)
        router('/singlePlace/' + r[0]._id)
      else
        toast({
          title: 'No such place found!',
          position: 'top',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        onCloseS()
    })


  }

  return (
    <div id={styles.navbar}>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody >
            <SigninModal onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal onClose={onCloseS} isOpen={isOpenS} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody >
            <form onSubmit={handleSearch}>
              <Input placeholder='Search places' mt={12} mb={12} onChange={(e) => setText(e.target.value)} />
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <RxHamburgerMenu onClick={handleHam} className={styles.hamburger} size={'20px'} />
      <Box
        position={'absolute'}
        top={'0'}
        left={ham ? '0' : '-100vw'}
        h={'100vh'}
        minW={'340px'}
        transition={'0.5s'}
        bg={'white'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        padding={'20px'}
        zIndex={2000}
      >
        <Flex justifyContent={'flex-end'}>
          <RxCross2 onClick={() => setHam(!ham)} size={'25px'} id={styles.cross} />
        </Flex>

        <Button onClick={!isAuth ? onOpen : undefined} mt={'2vh'} pl={'100px'} pr={'100px'} bg={'black'} color={'white'} borderRadius='50px'>{isAuth ? userDetails.firstname : 'Sign in'}</Button>

        <Flex mt={'2vh'} lineHeight={'40px'} justifyContent={'flex-start'} flexDir={'column'} alignItems={'flex-start'}>

          {
            hamItems.map((ele, i) => {
              return <Text cursor={'pointer'} key={i} as={'b'} fontSize={'lg'}>{ele.label}</Text>
            })
          }

          <Divider mt={'2vh'} mb={'2vh'} />

          {
            hamItems2.map((ele, i) => {
              return <Text key={i} cursor={'pointer'} as={'b'} color={'gray'} fontSize={'sm'}>{ele.label}</Text>
            })
          }
          {
            isAuth &&
            <Text onClick={handleLogout} cursor={'pointer'} as={'b'} color={'gray'} fontSize={'sm'}>Sign out</Text>
          }


        </Flex>

      </Box>

      <Image cursor={'pointer'} onClick={() => router('/')} id={styles.logo} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/TripAdvisor_Logo.svg/1024px-TripAdvisor_Logo.svg.png' />


      <div id={styles.navItems_container}>

        <HiOutlineSearch onClick={onOpenS} cursor={'pointer'} className={styles.search_btn} size={'25px'} />

        {
          navItems.map((ele, i) => {
            return <Box
              position={'relative'}
              onClick={() => handleClick(ele.label)}
              className={`${ele.label !== 'Basket' && styles.hideBtn} ${styles.navItems_child}`} color={ele.label === 'Sign in' && 'white'}
              bgColor={ele.label === 'Sign in' && 'black'}
              key={i}>
              {i === 0 && <VscEdit size={'25px'} />}
              {i === 1 && <AiOutlineHeart size={'25px'} />}
              {i === 2 && <AiOutlineBell size={'25px'} />}
              {i === 4 && <BsCart3 size={'25px'} />}

              {/*This is basket count */}

              {ele.label === 'Basket' && basketCount >= 1 && <Text
                fontSize={'xs'}
                as={'b'}
                bg={'red'}
                color={'white'}
                w={5}
                borderRadius={50}
                position={'absolute'}
                top={0}
                left={5}
              >{basketCount}</Text>}

              <Text
                className={ele.label !== 'Sign in' && styles.navText}
                as={'b'}
                fontSize={'sm'}
              >
                {ele.label === 'Sign in' && isAuth ? userDetails.firstname : ele.label}
              </Text>

              {ele.label === 'Sign in' && profile && <Box id={styles.profileItems}>
                {
                  profileItems.map((ele, i) => {
                    return <Box
                      key={i}
                      onClick={ele.label === 'Sign out' ? handleLogout : undefined}
                      className={styles.profileText}
                      h={'40px'}
                      w='full'>
                      <Text as={'b'}>
                        {ele.label}
                      </Text>
                    </Box>
                  })
                }
              </Box>}


            </Box>
          })
        }


      </div>

    </div >
  )
}
