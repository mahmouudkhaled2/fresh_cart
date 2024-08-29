/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import useMutationCart from '../Hooks/useMutationCart';
import { HiArchiveBoxXMark } from "react-icons/hi2";
import {WishListContext} from '../Context/WishListContext';
import Loading from './Loding';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet-async';


export default function WishList() {

    const [isLoading, setIsLoading] = useState(false);
    const {addItem} = useContext(CartContext)
    const {mutate:addProduct} = useMutationCart(addItem);
    const {allItems, setAllItems, getWishList, removeWishListItem} = useContext(WishListContext)
    const { user } = useContext(AuthContext);

    async function getWishListData() {
        setIsLoading(true)
        const data = await getWishList()
        setAllItems(data?.data.data)
        setIsLoading(false)
    }

    function removeItemFromLocalStorage(key, ItemToRemove) {
        let array = JSON.parse(localStorage.getItem(key)) || [];

        array = array.filter(item => item !== ItemToRemove);

        localStorage.setItem(key, JSON.stringify(array));
    }

    function DeleteItem (id) {
        removeItemFromLocalStorage(`wishList_${user}`, id)
        removeWishListItem (id)
    }

    useEffect(() => {
        getWishListData()
    }, [])

    if (isLoading) {
        return <>
        <Loading/> 
        <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
        </> 
    }
    
  return (
    <>
        <Helmet>
          <title> Fresh Cart | The Wish List </title>
        </Helmet>

        <section className="py-16 px-10">
            <h2 className='px-3 pb-4 mb-10 text-center text-4xl font-semibold text-gray-700 border-b-2 border-gray-300'>The Wish List</h2>
            <div className="row flex flex-wrap gap-y-10">

                {allItems?.length !== 0 ? 
                allItems?.map((item, index) => 
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-3">
                    <div className="item">
                        <img src={item?.imageCover} className='w-full' alt={item?.title} />
                        <div className='flex justify-between mt-2'>
                            <span className='text-sm text-gray-500'>{item?.category?.name}</span>
                            <span className='font-semibold'>{item?.price} <small>EGP</small></span>
                        </div>
                        <h3 className='font-semibold truncate'>{item?.title}</h3>
                        <span className='text-sm text-gray-500'>{item?.brand?.name}</span>

                        <div className='flex mt-4'>
                            <button onClick={() => {addProduct(item?.id)}} className='w-1/2 py-2 px-4 text-sm bg-green-600 hover:bg-green-800 text-gray-100'>
                                Add To Cart
                            </button>

                            <button onClick={() => {DeleteItem(item?.id)}} className='w-1/2 py-2 px-4 text-sm  border-green-600 border-2 hover:text-red-700'>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>)
                
                :
                <div className="w-full text-center py-[75px]">
                <HiArchiveBoxXMark size={120} className='text-green-500 mx-auto mb-6'/>
                <span className='text-gray-500'>Wish List Is Empty, Add Your Favorite Products </span>
                </div>
                }
            </div>
        </section>
    </>
  )
}


