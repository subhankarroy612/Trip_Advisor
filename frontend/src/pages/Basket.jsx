import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styles from '../styles/basket.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBasket, getBasketData } from '../redux/homeReducer/home.actions'
import { BsCircleFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

export default function Basket() {

  const [basket, setBasket] = useState([])
  const { token, isAuth } = useSelector(s => s.auth)
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0);
  const toast = useToast()

  useEffect(() => {
    dispatch(getBasketData(token))
      .then((r) => {
        setBasket(r)

        if (basket?.length) {
          let sum = r.reduce((acc, ele, i) => {
            return acc + (ele.pax * ele.productId.rate)
          }, 0)
          setTotal(sum)
        }
      })
  }, [isAuth, dispatch, token, basket?.length]);

  const handleDelete = (id) => {
    dispatch(deleteBasket(id, token)).then((r) => {
      toast({
        title: r ? 'Item deleted successfully!' : 'Server error!',
        position: 'top',
        status: r ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
      })
      if (r) {
        dispatch({type:'decBasketCount'})
        let items = basket.filter((ele, i) => ele._id !== id);
        setBasket(items)
      }
    })
  }

  return (
    <Box id={styles.basket}>

      {(!isAuth || !basket?.length) && <Box mt={20} textAlign={'start'}>
        <Text as='b' fontSize={'4xl'}>Basket</Text>
        <br />
        <Text as='b' fontSize={'3xl'}>Your Basket is Empty</Text>
        <br />
        <Box mt={10}>
          <Text as='b' fontSize={'3xl'}>Add Things to Do to your basket. Now you can shop for tours, attractions, and experiences. <Link style={{ textDecoration: 'underline' }} to={'/'}>Explore Now</Link></Text>
        </Box>
      </Box>}



      <Flex gap={5} mt={20} position={'relative'} id={styles.basketContainer}>

        <Box w={'65%'} id={styles.basketChild}>

          {

            basket && basket.map((ele, i) => {
              return <Flex mb={8} key={i} gap={2}
                boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}
              >

                <Box w={'200px'}>
                  <Image
                    h={'full'}
                    w={'200px'} src={ele?.productId?.thumbnail} alt={'pic'} />
                </Box >

                <Box textAlign={'start'} w={'full'} p={6} >
                  <Flex mb={'2'} justifyContent={'flex-end'} color={'red'} >
                    <AiFillDelete onClick={() => handleDelete(ele._id)} cursor={'pointer'} />
                  </Flex>
                  <Text as={'b'} fontSize={'md'}>{ele?.productId?.title}</Text>
                  <Flex color={'#2f9e44'} gap={0.5} fontSize={12} mt={4}>
                    <BsCircleFill />
                    <BsCircleFill />
                    <BsCircleFill />
                    <BsCircleFill />
                    <BsCircleFill />
                  </Flex>
                  <Flex mt={4} justifyContent={'space-between'}>
                    <Text color={'gray'} fontSize={'sm'}>{ele?.pax} Adult x ₹{ele?.productId?.rate}</Text>
                    <Text as={'b'} fontSize={'sm'}>Total ₹{ele?.pax * ele?.productId?.rate}</Text>
                  </Flex>
                </Box>

              </Flex>
            })

          }
        </Box>

        {(isAuth && basket?.length) && <Box id={styles.checkout}>
          <Text as={'b'} fontSize={'2xl'}>Review Order Details</Text>

          <Flex mt={10} justifyContent={'space-between'}>
            <Text color={'gray'}>Booking Fee</Text>
            <Text color={'gray'}>0</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text color={'gray'}>Subtotal</Text>
            <Text color={'gray'}>{total}</Text>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Text >Total ({basket?.length})</Text>
            <Text >{total}</Text>
          </Flex>

          <Text mt={10} color={'gray'} fontSize={'xs'}>No additional taxes & fees</Text>

          <Button bg={'yellow.400'} w={'full'} mt={10}>Checkout</Button>
        </Box>}

      </Flex>





    </Box>
  )
}
