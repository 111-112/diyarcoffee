import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import Button from "@mui/material/Button";
import banner1 from "../../assets/images/slider/banner5.png";
import banner2 from "../../assets/images/slider/banner8.png";
import banner3 from "../../assets/images/slider/banner7.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@mui/material";

// Import Swiper React components
/*import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Pagination } from 'swiper/core';*/

const images = [`${banner1}`, `${banner2}`, `${banner3}`];

//SwiperCore.use([Pagination]);

const Slider2 = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {images.map((value, index) => (
        <SwiperSlide style={{ display: "block" }} key={index}>
          <Box
            component="img"
            style={{
              width: "100%",
              height: "330px",
            }}
           
            alt="photo slider"
            src={value}
          />
         
          <Button style={{ width: "100%",backgroundColor:"#a27356",color:"#ffffff" }} >
            کاوش در سایت
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider2;
