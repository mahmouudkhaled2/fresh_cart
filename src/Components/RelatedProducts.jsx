/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Item from './Item';
import useGetAllData from "../Hooks/useGetData";
import getAllData from "../APIs/getAllData.api";
import { Bars } from "react-loader-spinner";

export default function RelatedProducts({categoryName , categoryId}) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1279,
            settings: {
                slidesToShow: 4,
            }
            },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };

      const {data, isLoading } = useGetAllData(categoryName, () => getAllData(`products?category=${categoryId}`));

    return <>
        <section className="related-pro py-16 px-10">
            <h2 className="py-5 mb-7 border-b-[1px] border-gray-300 text-green-700 text-3xl font-semibold">Related Products </h2>
            {isLoading ? 
              <div className="flex justify-center items-center h-52">
                <Bars height="30" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
              </div> 
              :
              <Slider {...settings}>
                {data?.data.data.map(product => (
                    <Item key={product.id} product={product} slider={true}/>
                ))}
              </Slider>
            }
            
        </section>
      </>
}