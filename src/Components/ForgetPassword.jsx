/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import  axios from 'axios';
import { Helmet } from 'react-helmet-async';

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [statusMessage, setstatusMessage] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate()


    const handleVerification = (data) => {
        setLoading(true)

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
        .then(api => {
            setstatusMessage(api.data.statusMsg);
            setMsg(api.data.message)
            navigate('/verify_code')
            setLoading(false)
        })
        .catch(api => {
            setstatusMessage(api.response.data.statusMsg)
            setMsg(api.response.data.message)
            setLoading(false)
        })
    }

    let formik = useFormik({
        initialValues: {
            email: '',
        },

        onSubmit: handleVerification
    })

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
          navigate('/')
        }
      }, [])

    return (
        <>
        <Helmet>
          <title> Fresh Cart | Forget Password </title>
        </Helmet>
        <div className="content max-w-xl mx-auto py-24">
            {statusMessage !== 'success' && statusMessage ? <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {msg} </div> 
            : null}

            <h2 className="mb-5 text-2xl font-bold">Please enter your email for verification code</h2>
            <form onSubmit={formik.handleSubmit}>
                {/* Email Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" id="floating_email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=""/>
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Enter Your Email Address:
                    </label>
                </div>


                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                { loading ? <i className="fas fa-spinner fa-spin"></i> : 'Verify'}
                </button>

            </form>
        </div>
        </>
  )
}



export function ForgetPasswordElement() {

    const navigate = useNavigate();

    const toForgetPassword = () => {
        navigate('/forgetpassword')
    }
    return (
        <span onClick={toForgetPassword} className='text-green-500 cursor-pointer'>forget your password?</span>
    )   
 
}