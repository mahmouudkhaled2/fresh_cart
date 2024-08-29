import Slider from 'react-slick';
import slide1 from './../assets/images/slider-image-1.jpg'
import slide2 from './../assets/images/slider-image-2.jpeg'
import slide3 from './../assets/images/slider-image-3.jpeg'
import slide4 from './../assets/images/slider-image-4.jpeg'
import slide5 from './../assets/images/slider-image-5.jpg'
import slide6 from './../assets/images/slider-image-6.jpg'

export default function MainSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1, 
        arrows: false,
        autoplay: true, 
        autoplaySpeed: 3000,
        easing: 'linear',
        focusOnSelect: true,
      };

  return (
    <header>
        <section className='main-slide flex py-16 px-10 relative'>
                <div className="slider-container w-full md:w-3/4">
                <Slider {...settings}>
                    <div>
                        <img src={slide1} className='w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400] xl:h-[450px] cursor-grab ' alt="slide 1" />
                    </div>
                    <div>
                        <img src={slide2} className='w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400] xl:h-[450px] cursor-grab' alt="slide 2" />
                    </div>
                    <div>
                        <img src={slide3} className='w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400] xl:h-[450px] cursor-grab' alt="slide 3" />
                    </div>
                    <div>
                        <img src={slide4} className='w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400] xl:h-[450px] cursor-grab' alt="slide 4" />
                    </div>
                </Slider>
                </div>
            <div className='hidden md:block'>
                <img src={slide5} className='w-full h-[175px] xl:h-[225px]' alt="" />
                <img src={slide6} className='w-full h-[175px] xl:h-[225px]' alt="" />
            </div>
        </section>
    </header>
  )
}
