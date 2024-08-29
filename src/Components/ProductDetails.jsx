import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import Loading from './Loding';
import RelatedProducts from "./RelatedProducts";
import useGetAllData from "./../Hooks/useGetData";
import getAllData from "./../APIs/getAllData.api";
import useMutationCart from "./../Hooks/useMutationCart";
import { useContext } from "react";
import { CartContext } from "./../Context/CartContext";
import { Helmet } from "react-helmet-async";


export default function ProductDetails() {

    const {id} = useParams()

    const {addItem} = useContext(CartContext)
    
    const {data, isLoading} = useGetAllData(id , () => getAllData(`products/${id}`));

    const details = data?.data.data;

    const {mutate:addProduct} = useMutationCart(addItem);

    if (isLoading) {
        return <>
        <Loading/> 
        <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
        </> 
    }

    return (
    <>
        <Helmet>
          <title> Fresh Cart | Product Details </title>
        </Helmet>
        <section className="py-16">
            <div className="w-full lg:w-3/4 row flex flex-col md:flex-row justify-between mx-auto px-6 lg:px-0" >
                <div className="w-full md:w-2/5">
                    <div className="p-0 lg:py-10 lg:pl-8 bg-slate-100 ">
                        <Swiper className="w-[350px]" 
                        spaceBetween={5}
                        effect="cards"
                        modules={[EffectCards]}
                        persliderotate={2}
                        >
                        {details.images.map((src, idx) => (
                            <SwiperSlide key={idx}>
                            <img src={src} className="p-0 m-0 w-full rounded-lg" alt={details.title} />
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-between md:w-2/5 lg- rounded-lg mt-6 md:m-0 bg-white p-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{details.title}</h2>
                        <span className="text-gray-500 mr-3 uppercase text-xs">{details.category?.name}</span>
                            
                            <div className="my-4">
                                <span className="text-[18px] font-semibold my-4 text-gray-800">Price: </span>
                                <span className="text-gray-500 mr-3 uppercase text-md">{details.price}<small>EGP</small></span>
                            </div>

                            <div className="mb-4">
                                <span className="font-semibold text-gray-800">Brand: </span>
                                <span className="text-gray-500 mr-3 uppercase text-sm">{details.brand?.name}</span>
                            </div>
                            <div>
                                <p className="font-semibold  text-gray-800">Description: </p>
                                <p className="text-gray-600">{details.description}</p>
                            </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mt-6 mb-2">
                            <p className="font-semibold text-gray-800">Ratings: <span className="text-sm font-light">({details.ratingsQuantity})</span></p>

                            <span className="text-[18px] font-semibold text-gray-800">{details.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                        </div>

                        <button onClick={()=>{addProduct(details?.id)}} type="button" className="w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-md px-5 py-1.5 rounded-sm text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            ADD TO CART <i className="fa-solid fa-cart-plus ml-2 text-md" />
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <RelatedProducts categoryName={details?.category?.name} categoryId={details?.category?._id} />
            </div>
        </section>
    </>
    )
}

