/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios  from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';
export const CartContext = createContext();

export default function CartContextProvider (props) {


    const baseURL = `https://ecommerce.routemisr.com/api/v1/cart`
    const token = localStorage.getItem('userToken');

    const [numOfItems , setNumOfItems] = useState(0)
    const [subtotal , setSubtotal] = useState(0)
    const [Items, setItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const [cartId, setcartId] = useState('')
    const {userLogin} = useContext(AuthContext)

    //Add Product To Cart
    function addItem (productId) {
        return axios.post(baseURL, { productId }, { headers: { token } })
        .then(({data}) => {
            if (data?.status === 'success') 
            setNumOfItems(data.numOfCartItems);
            setItems(data.data.products)
            toast.success(data?.message);
            return data
        })
        .catch(() => toast.error('Something went wrong, Try again'))
    }

    //Get All Cart items
    function getCartItems () {
        setLoading(true)
        return axios.get(baseURL, { headers: { token } })
        .then(data => {
            setItems(data.data.data.products);
            setcartId(data.data.data._id);
            setNumOfItems(data.data.numOfCartItems);
            setLoading(false);
            return data
        })
        .catch(err => {
            setLoading(false)
            return err
        })
    }
        
    // Delete Specific Item 
    function deleteItem (productId) {
        return axios.delete(`${baseURL}/${productId}`, { headers: { token } })
        .then(({data}) => data )
        .catch(error => error );
    }

    //Update Quantity
    function updateCount (count , id) {
        return axios.put(`${baseURL}/${id}`, { count  }, { headers: { token } })
        .then(({data}) => data)
        .catch(error => error);
    }

    // Clear All Items 
    function clearAllCart () {
        return axios.delete(`${baseURL}`, { headers: { token } })
        .then(({data}) =>  {
            return data})
        .catch(error => error );
    }

    useEffect(() => {
        if(localStorage.getItem("userToken"))
            getCartItems()
    }, [userLogin, numOfItems])

    return <CartContext.Provider value={ { addItem, getCartItems, deleteItem,   updateCount,   clearAllCart, numOfItems, setNumOfItems, subtotal, setSubtotal, Items, setItems, loading, cartId} }>
            {props.children}
        </CartContext.Provider>
    

}



