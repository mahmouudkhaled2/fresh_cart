/* eslint-disable react/prop-types */
import { useContext, useEffect} from "react"
import { CartContext } from "./../Context/CartContext"
import { useFormik } from "formik";
import { initFlowbite } from "flowbite";
import {PaymentContext} from "../Context/PaymentContext";

export default function PaymentModal({btnTitle, inputId, paymentType, modalId}) {

    const {cartId} = useContext(CartContext);    
    const {onlinePayment, cashPayment, loading} = useContext(PaymentContext);

    const handlePayment = (shippingAddress) => {
        if (paymentType === 'online')
            onlinePayment(cartId, shippingAddress)
        else 
            cashPayment(cartId, shippingAddress)
    }

    const formik = useFormik({
        initialValues: {
            "details": "",
            "phone": "",
            "city": ""
        }, 
        onSubmit: handlePayment
    })

    useEffect(() => {
        initFlowbite();
    }, []);
    
    return (
        <div>
        {/* Modal toggle */}
        <button data-modal-target={modalId} data-modal-toggle={modalId} className="block w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-4" type="button">
            {btnTitle}
        </button>
        {/* Main modal */}
        <div id={modalId} tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Please Enter Your Information
                </h3>
                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={modalId}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={formik.handleSubmit} action="#">
                    <div>
                        <label htmlFor={`${inputId.details}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
                        <input type="text" name="details" id={`${inputId.details}`}
                        value={formik.values.details} onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your address details"/>
                    </div>

                    <div>
                        <label htmlFor={`${inputId.phone}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
                        <input type="text" name="phone" id={`${inputId.phone}`}
                        value={formik.values.phone} onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your phone number"/>
                    </div>

                    <div>
                        <label htmlFor={`${inputId.city}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your City</label>
                        <input type="text" name="city" id={`${inputId.city}`}
                        value={formik.values.city} onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your city name"/>
                    </div>

                    <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {loading ? <i className="fas fa-spinner"></i> : 'Pay Now'}
                    </button>

                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
  )
}
