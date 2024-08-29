/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { PaymentContext } from "../Context/PaymentContext"
import Loading from "./Loding"
import axios from "axios";
import xMark from './../assets/images/cart-xmark.png'
import { Helmet } from 'react-helmet-async';

export default function AllOrders() {

  const {allOrders, setAllOrders} = useContext(PaymentContext);
  const [loading, setLoading] = useState(false)

  function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const token = localStorage.getItem('userToken'); 
  const decodedToken = parseJwt(token);
  const userId = decodedToken?.id; 

  function getAllOrders(userId) {
    setLoading(true)
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then(data => { 
            setAllOrders(data.data) 
            setLoading(false)
        return data
    })
    .catch(error => {
        setLoading(false)
        return error
    })
}

  useEffect(() => {
        getAllOrders(userId)
}, [])

  if (loading) {
    return <>
    <Loading/> 
    <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
    </> 
  }
  
  return (
    <>
        <Helmet>
          <title>Fresh Cart | My Orders</title>
        </Helmet>
      <section className="py-16 px-10">
        <p className="m-3 text-2xl font-semibold">The Last Order:</p>
        <div className="row flex flex-wrap gap-y-6 border-y-2 border-slate-300 py-5">

          {userId !== '' && userId !== 'undefined' && allOrders.length > 0 ? 
          allOrders[allOrders.length - 1]?.cartItems?.map((item, index) => 
          <div key={index} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
            <div className="orderBox mx-3">
                <img src={item?.product?.imageCover} className="w-full" alt="" />
                <h3 className="truncate mt-3 font-semibold text-xl sm:text-lg">{item?.product.title}</h3>
                <p>Count: <span>{item?.count}</span></p>
                <p>Price: <span>{item?.price}</span></p>
            </div>
          </div>
          ) 
          : 
          <div className="w-full text-center py-16">
            <img src={xMark} className="w-28 mx-auto" alt="" />
            <p>There Are No Orders Yet </p>
          </div>
          }
        </div>

        {userId !== '' && userId !== 'undefined' && allOrders.length > 0 ? 
        <div>
          <div className="mt-6 flex flex-wrap">
            <p className="w-full md:w-[48.5%] mb-3 md:mr-[10px] lg:mr-[14px] 2xl:mr-[21px] text-md lg:text-lg font-semibold p-2 bg-green-700 text-white">Subtotal: <span className="text-gray-100 font-light lg:text-md">{allOrders[allOrders.length - 1]?.totalOrderPrice} <small>EGP</small></span></p>
            <p className="w-full md:w-1/2 mb-3 text-md lg:text-lg font-semibold p-2 bg-green-700 text-white">Shiping Price: <span className="text-gray-100 font-light lg:text-md">{allOrders[allOrders.length - 1]?.shippingPrice} <small>EGP</small></span></p>
          </div>
          <p className="text-md lg:text-lg font-semibold p-2 bg-green-700 text-white">Total Price: <span className="text-gray-100 font-light lg:text-md">{allOrders[allOrders.length - 1]?.totalOrderPrice + allOrders[allOrders.length - 1]?.shippingPrice} <small>EGP</small></span></p>
        </div>
        : ''} 

      </section>
    </>
  )
}
