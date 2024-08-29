/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AuthContext } from "./AuthContext";

export const WishListContext = createContext()


export default function WishListContextProvider({children}) {

const [allItems, setAllItems] = useState([]);
const [count, setCount] = useState(0);
const {userLogin} = useContext(AuthContext)

function getWishList() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: localStorage.getItem('userToken')}
    })
    .then(data => {
        setAllItems(data?.data.data)
        setCount(data?.data.count)
        return data
    })
    .catch(error => {
        return error
    })
}

function addToWishList(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId } , {
        headers: { token: localStorage.getItem('userToken')}
    })
    .then(data => {
        setCount(data?.data.data.length)
        toast.success(data.data.message)
    })
    .catch(error => error)
}


function removeWishListItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: localStorage.getItem('userToken')}
    })
    .then(() => {
        toast.success('Item has been Deleted')
        getWishList()
    })
    .catch(() => {
        toast.error('Something went wrong, Try again')
    })
}

useEffect(() => {
    if(localStorage.getItem('userToken'))
        getWishList();
}, [userLogin])

  return <WishListContext.Provider value={{allItems, setAllItems, getWishList, addToWishList, removeWishListItem, count}} >
        {children}
    </WishListContext.Provider>
  
}
