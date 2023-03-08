import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import '../styles/places.css'
import { useNavigate } from "react-router-dom";
import { BsCircleFill } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import styles from '../styles/home.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addToTrips } from "../redux/homeReducer/home.actions";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <Box
            cursor={'pointer'}
            p={2}
            bg={'white'}
            color={'black'}
            position={'absolute'}
            border={'3px solid black'}
            top={'40%'}
            right={0}
            zIndex={10}
            borderRadius={100}
            onClick={onClick}><AiOutlineArrowRight fontSize={25} /></Box>

    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <Box
            cursor={'pointer'}
            p={2}
            bg={'white'}
            color={'black'}
            border={'3px solid black'}
            position={'absolute'}
            top={'40%'}
            left={0}
            zIndex={10}
            borderRadius={100}
            onClick={onClick}><AiOutlineArrowLeft fontSize={25} /></Box>

    );
}

export default function Tours({ data }) {

    const toast = useToast()
    const settings = {
        infinite: true,
        slidesToShow: 4,
        centerPadding: "60px",
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2
                }
            }
        ]
    };
    const dispatch = useDispatch()
    const router = useNavigate();
    const { isAuth, open, token } = useSelector(s => s.auth)

    const handleClick = (id) => {
        router('/singleTour/' + id)
    }

    const postTrips = (e, id) => {
        e.stopPropagation()
        if (!isAuth) {
            return open()
        }
        console.log(id);
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
        <Box
            position={'relative'}
        >
            <Slider {...settings}>
                {
                    data.map((ele, i) => {
                        return <div
                            className={styles.tourCard}
                            key={i}
                            onClick={() => handleClick(ele._id)}
                        >
                            <Box
                                id={styles.tripsIcon}
                                onClick={(e) => postTrips(e, ele._id)}
                                cursor={'pointer'}
                                p={2}
                                borderRadius={50}
                                bg={'white'}
                                position={'relative'}
                                zIndex={10}
                                top={50}
                                width={'fit-content'}
                                left={225}
                            >
                                <AiOutlineHeart size={'25px'} />
                            </Box>

                            <Image
                                src={ele.thumbnail} />
                            <Text
                                className={styles.tourTitle}
                                as={'b'}
                                mt={'5px'}
                            >{ele.title}</Text>
                            <br />
                            <Flex color={'#2f9e44'} gap={0.5} fontSize={12}>
                                <BsCircleFill />
                                <BsCircleFill />
                                <BsCircleFill />
                                <BsCircleFill />
                                <BsCircleFill />
                            </Flex>
                            <Text as={'b'}>from  ₹{ele.rate} per adult</Text>
                        </div>
                    })
                }
            </Slider>
        </Box>
    );
}


