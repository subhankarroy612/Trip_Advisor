import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Image } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import '../styles/places.css'

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <Box
            cursor={'pointer'}
            p={2}
            bg={'black'}
            color={'white'}
            position={'absolute'}
            border={'3px solid black'}
            top={'45%'}
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
            bg={'black'}
            color={'white'}
            border={'3px solid black'}
            position={'absolute'}
            top={'45%'}
            left={0}
            zIndex={10}
            borderRadius={100}
            onClick={onClick}><AiOutlineArrowLeft fontSize={25} /></Box>

    );
}



export default function ToursCarousel({ data }) {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        centerPadding: "60px",
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <Box
            position={'relative'}
        >
            <Slider {...settings}>
                <div>
                    <Image h={['300px','300px','500px']} src={data?.img1} />
                </div>
                <div>
                    <Image h={['300px','300px','500px']} src={data?.img2} />
                </div>
            </Slider>
        </Box>
    );
}

