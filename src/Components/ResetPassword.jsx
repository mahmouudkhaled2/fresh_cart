/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useFormik } from "formik";
import  * as Yup  from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';


export default function ResetPassword() {

  const [loding, setLoding] = useState(false)
  const navigate = useNavigate()

  const [isError , setIsErorr] = useState(false);
  const [errorMsg , setErrorMsg] = useState('');


  const handleResetPassword = (data) => {
    setLoding(true)
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, data )
    .then(() => {
      navigate('/login')
      setLoding(false)
    })
    .catch(error => {
      console.error(error)
      setLoding(false)
      setIsErorr(true)
      setErrorMsg(error.response.data.message)
    })
  }

  const validationSchema = Yup.object().shape({
    "email": Yup.string().email('Invalid Email').required('Email is required.'),
    "newPassword": Yup.string().matches(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password must be 8+ characters & include both uppercase and lowercase letters.').required('Password is required.') ,
  })

  const formik = useFormik({
    initialValues: {
      "email":"",
      "newPassword": ""
  },
  validationSchema,

    onSubmit: handleResetPassword
  })

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Helmet>
          <title> Fresh Cart | Reset Password </title>
      </Helmet>

      <div className="max-w-md mx-auto py-24">

        {isError && <p className="p-4 mb-6 max-w-xl mx-auto my-8 text-sm text-center text-red-700 rounded-lg bg-red-100 dark:bg-gray-700 dark:text-red-400">{errorMsg}</p>}

        <h2 className="mb-5 text-3xl text-green-600 font-bold">Reset Your Password:</h2>
        <form onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-6 group">
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

              {formik.errors.email && formik.touched.email && <div className="px-4 py-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.email} </div>
              }
            </div>




            <div className="relative z-0 w-full mb-6 group">
              <input type="password" name="newPassword" id="floating_password" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=""/>
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Enter a New Password:
              </label>

              
              {formik.errors.newPassword && formik.touched.newPassword && <div className="px-4 py-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.newPassword} </div>
              }
            </div>


            <div className="flex justify-center">
                <button type="submit" className="block w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
                  { loding ? <i className="fas fa-spinner fa-spin"></i> : 'RESET'}
                </button>
            </div>
        </form>
      </div>
    </>
  )
}
