import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from '../styles/trips.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTrip, getTripsData } from '../redux/homeReducer/home.actions'
import { AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export default function Trips() {

    const dispatch = useDispatch()
    const [trips, setTrips] = useState([])
    const { isAuth, token } = useSelector(s => s.auth);
    const toast = useToast()
    const router = useNavigate()

    useEffect(() => {
        dispatch(getTripsData(token)).then((r) => {
            setTrips(r)
        })

    }, [isAuth, dispatch, token])

    const handleDelete = (e, id) => {
        e.stopPropagation()
        dispatch(deleteTrip(id, token)).then((r) => {
            toast({
                title: r ? 'Trip deleted successfully!' : 'Server Error!',
                position: 'top',
                status: r ? 'success' : 'error',
                duration: 5000,
                isClosable: true,
            })
            let store = trips.filter((ele) => ele._id !== id)
            setTrips(store)
        })
    }

    const handleClick = (id,uniId) => {
        router('/singleTour/' + id + '/' + uniId)
    }

    return (
        <Box id={styles.trips}>
            {(!isAuth || !trips?.length) && <Flex id={styles.emptyContainer} gap={5} textAlign={'start'} m={'auto'} mt={20}>
                <Box w={['100%', '100%', '50%']} >
                    <Text as={'b'} fontSize={19}>Travelling soon? Save your amazing ideas all in one place with Trips.</Text>
                    <Text color={'gray'} mt={6} fontSize={'sm'}>Save traveller-recommended places for your trip</Text>
                    <Text color={'gray'} mt={6} fontSize={'sm'}>View the things to do, restaurants and hotels you saved on a map</Text>
                    <Text color={'gray'} mt={6} fontSize={'sm'}>Easily access all your saves while travelling, wherever you go</Text>
                    <Button mt={6} size={'sm'} borderRadius={3} bg={'black'} color={'white'}>Get started</Button>
                </Box>
                <Box w={['0', '0', '50%']} >
                    <Image src='https://static.tacdn.com/img2/trips/trips-logged-out-page-image-v4-small.png' />
                </Box>
            </Flex>}

            <Box mt={20} id={styles.allTrips}>

                {
                    trips && trips.map((ele, i) => {
                        return <Box
                            onClick={() => handleClick(ele.productId._id, ele._id)}
                            position={'relative'}
                            boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
                            textAlign={'start'}
                            p={1}
                            key={i}>
                            <Box
                                onClick={(e) => handleDelete(e, ele._id)}
                                position={'absolute'}
                                bg={'black'}
                                p={1}
                                borderRadius={50}
                                cursor={'pointer'}
                                right={2}
                                top={2}
                            >
                                <AiOutlineDelete cursor={'pointer'} color='white' size={'25px'} />
                            </Box>
                            <Image objectFit={'cover'} w={'100%'} h={'150px'} src={ele.productId.thumbnail} />
                            <Text fontSize={'sm'} as={'b'}>{ele.productId.title}</Text>
                            <br />
                            <Text color={'green.600'} fontSize={'sm'} as={'b'}> ₹{ele.productId.rate}</Text>
                        </Box>
                    })
                }

            </Box>


        </Box>
    )
}
