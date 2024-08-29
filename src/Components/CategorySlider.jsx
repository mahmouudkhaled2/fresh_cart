import Slider from "react-slick";
import useGetAllData from "../Hooks/useGetData";
import getAllData from "../APIs/getAllData.api";
import { Bars } from "react-loader-spinner";


export default function CategorySlider() {

  const {data, isLoading} = useGetAllData('categories', () => getAllData('categories'));
  
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
          breakpoint: 1279,
          settings: {
              slidesToShow: 5,
          }
          },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
  };

  
  if (isLoading)  
    <div className="pt-3">
      <Bars height="30" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
    </div> 

  return (
    <>
    {isLoading ? 
      <div className="pt-3 flex items-center justify-center h-[300px] border-y-2 border-gray-300">
      <Bars height="30" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
      </div> 
      :
      <section className="py-8 px-10 border-y-2 border-gray-300">
        <h2 className="text-3xl font-light text-gray-700 pb-5 ">Shop Pupular Categories</h2>
        <Slider {...settings}>
          {data?.data.data?.map((cat, index) => 
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <div className="category cursor-pointer">
                <img src={cat?.image} className="w-full h-[250px]" alt={cat?.name} />
                <h2 className="py-3 text-2xl text-gray-600 text-center">{cat?.name}</h2>
              </div>
            </div>
          )}
        </Slider>
      </section>
      }
    </>
    
    
  )
}
