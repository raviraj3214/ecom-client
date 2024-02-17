import React from 'react';
import Slider from 'react-slick';
import { useNavigate} from "react-router-dom";
import './index.css';
import Slider1 from "../../images/latest_headphone.webp";
import Slider2 from "../../images/recent_laptop.jpg";
import Slider3 from "../../images/recsmart_11zon.jpg";


const HomeSlider = () => {
    const navigate = useNavigate();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed: 1500,
        cssEase: "linear",
        fade:true,
        arrows:true
    };
    return (
        <section className='homeSlider mt-5'>
            <div className='container-fluid'>
                <Slider {...settings} className='home_slider_Main'>
                    <div className='item' onClick={() => navigate(`/category/headphone`)} >
                    <img src={Slider1} alt="imageeee" style={{ height:"70vh",width:"100vw",objectFit: "cover", objectPosition: "center center", }} ></img>
                    <div className='info'>
                        <h2 className=' mb-3'>Fresh Arrivals</h2>
                        <p>Click Here For Headphone<br/>  Related Deals</p>
                    </div>
                    </div>
                    <div className='item' onClick={() => navigate(`/category/laptop`)}>
                    <img src={Slider2} alt="imageeee" style={{ height:"70vh",width:"100vw",objectFit: "cover", objectPosition: "center center", }}></img>
                    <div className='info'>
                        <h2 className=' mb-3'>Fresh Arrivals</h2>
                        <p>Click Here For Laptop<br/>  Related Deals</p>
                        </div>
                    </div>
                    <div className='item' onClick={() => navigate(`/category/smartphone`)}>
                    <img src={Slider3} alt="imageeee" style={{ height:"70vh",width:"100vw",objectFit: "cover", objectPosition: "left", }}></img>
                    <div className='info'>
                        <h2 className=' mb-3'>Fresh Arrivals</h2>
                        <p>Click Here For Smartphone<br/>  Related Deals</p>
                        </div>
                    </div>
                    
                </Slider>

            </div>
        </section>
    )
}

export default HomeSlider;