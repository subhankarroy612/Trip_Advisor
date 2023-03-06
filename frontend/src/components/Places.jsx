import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Image, Text } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import '../styles/places.css'

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
            top={'42%'}
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
            top={'42%'}
            left={0}
            zIndex={10}
            borderRadius={100}
            onClick={onClick}><AiOutlineArrowLeft fontSize={25} /></Box>

    );
}

export default function Places({ data }) {

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
    return (
        <Box
            position={'relative'}
        >
            <Slider {...settings}>
                {
                    data.map((ele, i) => {
                        return <div
                            key={i}>
                            <Image
                                src={ele.thumbnail} />
                            <Text
                                backdropFilter={'blur(2px)'}
                                as={'b'}
                                pl='10px'
                                fontSize={'3xl'}
                                color={'white'}
                                position='absolute'
                                bottom={2}
                            >{(ele.title).substring(0, 12)}</Text>
                        </div>
                    })
                }
            </Slider>
        </Box>
    );
}