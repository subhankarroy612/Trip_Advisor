import { Box, Button, Divider, Flex, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToTrips, getSingleTour } from '../redux/homeReducer/home.actions'
import styles from '../styles/singleTour.module.css'
import ToursCarousel from './ToursCarousel';
import { AiOutlineHeart, AiOutlineMobile } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosTimer } from 'react-icons/io';
import { BiTime } from 'react-icons/bi';

export default function SingleTour() {


    const dispatch = useDispatch()
    const { id } = useParams();
    const [tour, setTour] = useState({})
    const { isAuth, open, token } = useSelector(s => s.auth)
    const toast = useToast()

    useEffect(() => {
        dispatch(getSingleTour(id)).then((r) => {
            setTour(r);
        })
    }, [dispatch, id]);
    const handleTrips = () => {
        if (!isAuth)
            return open()

        dispatch(addToTrips(id, token)).then((r) => {

            toast({
                title: r ? 'Trip added successfully!' : 'Trip has already been added!',
                position: 'top',
                status: r ? 'success' : 'error',
                duration: 5000,
                isClosable: true,
            })

        })

        //to be added to wishlist    
    }

    return (
        <Box id={styles.singleTour}>



            <Flex gap={2} mt={'7vh'} id={styles.changeTourDir}>
                <Box w={['100%', '100%', '50%']}>
                    {
                        <ToursCarousel data={tour.images} />
                    }
                </Box>

                <Box p={5} w={['100%', '100%', '50%']} textAlign={'start'}>

                    <Flex mb={8} p={5} justifyContent={'flex-end'}>
                        <AiOutlineHeart onClick={handleTrips} cursor={'pointer'} size={'25px'} />
                    </Flex >

                    <Text lineHeight={'28px'} fontSize={'3xl'} as={'b'}>{tour.title}</Text>
                    <Text mt={15} color={'gray.600'}>{tour.about}</Text>
                    <Text mt={15} color={'gray.600'}>from</Text>

                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                        <Text as={'b'} fontSize={'4xl'}>
                            ₹{tour.rate}
                        </Text>
                        <Button borderRadius={50} p={7} bg={'yellow.400'}>Check availability</Button>
                    </Flex>

                    <Text color={'gray.600'}>per adult (price varies by group size)</Text>

                    <Divider mt={5} borderColor={'gray'} />

                    <VStack mt={8} alignItems={'start'}>
                        <Flex gap={2} alignItems={'center'} color={'gray'}>
                            <BsFillPersonFill />
                            <Text>Ages 0-85, max of 100 per group</Text>
                        </Flex>
                        <Flex gap={2} alignItems={'center'} color={'gray'}>
                            <IoIosTimer />
                            <Text>Duration: 3h</Text>
                        </Flex>
                        <Flex gap={2} alignItems={'center'} color={'gray'}>
                            <BiTime />
                            <Text>Start time: Check availability</Text>
                        </Flex>
                        <Flex gap={2} alignItems={'center'} color={'gray'}>
                            <AiOutlineMobile />
                            <Text>Mobile ticket</Text>
                        </Flex>
                    </VStack>

                </Box>
            </Flex>

        </Box>
    )
}
