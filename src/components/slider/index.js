import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from "react-router-dom";
import './index.css';
import Slider1 from "../../images/latest_headphone.jpg";
import Slider2 from "../../images/recent_laptop.jpg";
import Slider3 from "../../images/recsmart_11zon.jpg";
import Slider1Mobile from "../../images/latest_headphone_mobile.jpg";
import Slider2Mobile from "../../images/recent_laptop_mobile.jpg";
import Slider3Mobile from "../../images/recsmart_11zon_mobile.jpg";

const HomeSlider = () => {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: "linear",
        fade: true,
        arrows: true
    };
    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: "linear",
        fade: true,
        arrows: false
        
    };

    return (
        <section className='homeSlider mt-5'>
            <div className='container-fluid'>
                <Slider {...settings} className='home_slider_Main'>
                    <div className='item' onClick={() => navigate(`/category/headphone`)}>
                        <img src={Slider1}  className='img1' alt="imageeee" />
                        <div className='info'>
                            <h2 className=' mb-3'>Fresh Arrivals</h2>
                            <p>Click Here For Headphone<br />  Related Deals</p>
                        </div>
                    </div>
                    <div className='item' onClick={() => navigate(`/category/laptop`)}>
                        <img src={Slider2}  className='img1' alt="imageeee" />
                        <div className='info'>
                            <h2 className=' mb-3'>Fresh Arrivals</h2>
                            <p>Click Here For Laptop<br />  Related Deals</p>
                        </div>
                    </div>
                    <div className='item' onClick={() => navigate(`/category/smartphone`)}>
                        <img src={Slider3}  className='img1' alt="imageeee" />
                        <div className='info'>
                            <h2 className=' mb-3'>Fresh Arrivals</h2>
                            <p>Click Here For Smartphone<br />  Related Deals</p>
                        </div>
                    </div>
                </Slider>
                <Slider {...settings1} className='home_slider_Main2'>
                    <div className='item2' onClick={() => navigate(`/category/headphone`)}>
                        <img src={Slider1Mobile}  className='img1' alt="imageeee" />
                        <div className='info2'>
                            <h2 className=' mb-3'>Fresh Arrivals</h2>
                            <p>Click Here For Headphone<br />  Related Deals</p>
                        </div>
                    </div>
                    <div className='item2' onClick={() => navigate(`/category/laptop`)}>
                        <img src={Slider2Mobile}  className='img1' alt="imageeee" />
                        <div className='info2'>
                            <h2 className=' mb-3'>Fresh Arrivals</h2>
                            <p>Click Here For Laptop<br />  Related Deals</p>
                        </div>
                    </div>
                    <div className='item2' onClick={() => navigate(`/category/smartphone`)}>
                        <img src={Slider3Mobile}  className='img1' alt="imageeee" />
                        <div className='info2'>
                            <h2 className=' mb-3'>Fresh Arrivals</h2>
                            <p>Click Here For Smartphone<br />  Related Deals</p>
                        </div>
                    </div>
                </Slider>
                
            </div>
        </section>
    )
}

export default HomeSlider;
