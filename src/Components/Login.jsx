/* eslint-disable react-hooks/exhaustive-deps */
import axios  from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import {ForgetPasswordElement} from "./ForgetPassword";
import { AuthContext } from "./../Context/AuthContext";
import { Helmet } from "react-helmet-async";

export default function Login () {

  const { setUserLogin, setUser } = useContext(AuthContext);
  const [loginStatus, setLoginStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let loginSchema = Yup.object().shape({
      "email": Yup.string().email('Invalid Email').required('Email is required.'),
      "password": Yup.string().required('Password is required.')
  })


  function handleLogin (loginData) {
    setLoading(true)

      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, loginData)
      .then(apiResponse => {

        if (apiResponse.data.message === 'success') 
          {
          localStorage.setItem('userToken', apiResponse.data.token)
          localStorage.setItem('userEmail', apiResponse.data.user.email)
          setUserLogin(localStorage.getItem('userToken'));
          setUser(localStorage.getItem('userEmail'))
          setLoginStatus(apiResponse.data.message);
          }
        navigate('/')
        setLoading(false);
      })
      .catch(apiResponse => {
        setLoginStatus(apiResponse.response.data.message);
        setLoading(false);
      })  
    }

  let formik = useFormik({
    initialValues: {
      "email":"",
      "password":""
  }, 

  validationSchema: loginSchema,
  onSubmit: handleLogin
  })

  useEffect(() => {

  if (localStorage.getItem('userToken')) {
    navigate('/')
  }
  
  }, [])

  return (
    <>
      <Helmet>
        <title> Fresh Cart | Login Page </title>
      </Helmet>
      <div className="content max-w-xl mx-auto py-24 px-5">
      {loginStatus !== 'success' && loginStatus ? <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {loginStatus} </div> : null}
      
        <div className="heading mb-12 text-center">
          <h2 className="mb-5 text-4xl font-bold text-center font-sans text-green-700 underline">Login</h2>
          <p className="text-gray-600">Welcome back! login to access the FreshCart</p>
          <p className="text-gray-600">Did you <ForgetPasswordElement/></p>
        </div>

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

            {formik.errors.email && formik.touched.email && <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-2" role="alert"> {formik.errors.email} </div>
            }
          </div>

          {/* Password Input */}
          <div className="relative z-0 w-full mb-2 group">
            <input type="password" name="password" id="floating_password" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""/>
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Your Password:
            </label>

            {formik.errors.password && formik.touched.password && <div className="px-4 py-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.password} </div>
            }
          </div>

          {/* Submit Button */}

            <div className="flex justify-center">
              <button type="submit" className="block w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5">
                { loading ? <i className="fas fa-spinner fa-spin"></i> : 'Log in'}
              </button>
            </div>
            <p className="text-gray-700 font-semibold text-[12px] text-center my-2">OR</p>
            
            <div className="text-center flex justify-center">
                <Link to={'/register'} className="w-full bg-green-700 hover:bg-green-800 text-white text-sm py-2.5 rounded-lg">Create a New Account</Link>
            </div>

        </form>
      </div>
      
    </>
  );
}


