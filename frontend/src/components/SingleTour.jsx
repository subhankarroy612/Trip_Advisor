import { Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToBaskets, addToTrips, deleteTrip, getSingleTour } from '../redux/homeReducer/home.actions'
import styles from '../styles/singleTour.module.css'
import ToursCarousel from './ToursCarousel';
import { AiOutlineHeart, AiOutlineMobile } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosTimer } from 'react-icons/io';
import { BiTime } from 'react-icons/bi';
import { VscAccount } from 'react-icons/vsc';

export default function SingleTour() {


    const dispatch = useDispatch()
    const { id, uniId } = useParams();
    const [tour, setTour] = useState({})
    const { isAuth, open, token } = useSelector(s => s.auth)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [c, setC] = useState(1)

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

    }

    const handleBasket = () => {

        dispatch(addToBaskets(id, c, token)).then((r) => {
            dispatch(deleteTrip(uniId, token))
            toast({
                title: r ? 'Item added to basket!' : 'Item already added!',
                position: 'top',
                status: r ? 'success' : 'error',
                duration: 5000,
                isClosable: true,
            })
            onClose()
        })


    }

    return (
        <Box id={styles.singleTour}>

            <Modal size={'3xl'} height={'100vh'} isCentered={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text fontSize={['full', 'full', '2xl']}>{tour.title}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Flex alignItems={'center'} gap={2}>
                            <Button size={'sm'} borderRadius={50} bg={'black'} color={'white'} onClick={() => setC(c => c - 1)} isDisabled={c <= 1}>-</Button>
                            <Button gap={2} size={'sm'} border={'1px solid gray'} borderRadius={50}> <VscAccount size={20} /> {c}</Button>
                            <Button size={'sm'} borderRadius={50} bg={'black'} color={'white'} onClick={() => setC(c => c + 1)}>+</Button>
                        </Flex>

                        <Text color={'gray'} mt={5}> 1 option available </Text>

                        <Box p={5} mt={5} mb={'25vh'} textAlign={'start'} border={'2px solid black'} borderRadius={10}>
                            <Text as={'b'}>{tour.title}</Text>
                            <Text color={'gray'}>Pickup included</Text>
                            <Text color={'gray'}>{c} Adult x ₹{tour.rate}.00</Text>
                            <Text as={'b'}>Total ₹{+tour.rate * c}.00</Text>
                            <Text size={'xs'} color={'gray'}>(No additional taxes or booking fees)</Text>
                        </Box>

                        <Divider mt={5} borderColor={'gray'} />
                    </ModalBody>

                    <ModalFooter>
                        <Button bg={'yellow.400'} mr={3} onClick={handleBasket}>
                            Add to Basket
                        </Button>
                        <Button bg={'yellow.500'}>Reserve Now</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>





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
                        <Button onClick={onOpen} borderRadius={50} p={7} bg={'yellow.400'}>Check availability</Button>
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
