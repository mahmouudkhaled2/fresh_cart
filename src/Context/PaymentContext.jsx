/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"
import axios from "axios";
import Swal from 'sweetalert2'

export const PaymentContext = createContext()

export default function PaymentContextProvide({children}) {
    const [allOrders, setAllOrders] = useState([]);
    const [paymentType, setPaymentType] = useState('');
    const [loading, setLoading] = useState(false);
    
    function onlinePayment(cartId, shippingAddress) {
        setLoading(true)
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {shippingAddress}, 
        {
            headers: { token: localStorage.getItem('userToken') }, 
            params: { url : 'http://localhost:5173'}
        })
        .then( data => {
            window.location.href = data.data.session.url
            setLoading(false)
            return data
        })
        .catch( error => {
            setLoading(false)
            return error
        })
    }
    
    function cashPayment(cartId, shippingAddress) {
        setLoading(true)
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {shippingAddress}, { headers: { token: localStorage.getItem('userToken') } })
        .then( data => {
            setLoading(false)    
            Swal.fire({
                text: 'The Payment Has Been Done Successfully!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            .then((data) => {
                if (data.isConfirmed)
                    window.location.href = 'http://localhost:5173/allorders'
            })
            return data
            })
        .catch( error => {
            setLoading(false)
            return error
        })
    }

  return <PaymentContext.Provider value={{onlinePayment, cashPayment, paymentType, setPaymentType, allOrders, setAllOrders , loading}}>
            {children}
         </PaymentContext.Provider>
}
