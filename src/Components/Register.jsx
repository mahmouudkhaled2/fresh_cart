/* eslint-disable react-hooks/exhaustive-deps */
import axios  from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function Register () {

  let signUpSchema = Yup.object().shape({
      "name": Yup.string().min(3, 'minimum: 3 characters').max(30, 'maximum: 30 characters.').required('Name is required.'),
      "email": Yup.string().email('Invalid Email').required('Email is required.'),
      "password": Yup.string().matches(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password must be 8+ characters & include both uppercase and lowercase letters.').required('Password is required.') ,
      "rePassword": Yup.string().oneOf([Yup.ref('password')], "Passwords don't match. Please ensure both passwords are identical").required('Password confirmation is required'),
      "phone":Yup.string().matches(/^(\+2)?01[0125]{1}[0-9]{8}$/, 'phone must be like @example: +2(01012345678)').required('Phone number is required')
  })

  const [alertMsg, setAlertMsg] = useState('')

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const clearForm = () => {
    formik.values.name = '';
    formik.values.email = '';
    formik.values.phone = '';
    formik.values.password = '';
    formik.values.rePassword = '';
  }

  function handleRegister (signupData) {
    setLoading(true)

      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, signupData)
      .then(function(apiResponse)  {
        if (apiResponse.data.message === 'success') {
          setAlertMsg(apiResponse.data.message); //success
          clearForm();
          navigate('/login')
          console.log(apiResponse);
          
        }
        setLoading(false);

      })
      .catch(function (error) {
        setAlertMsg(error.response.data.message); // Account Already Exist
        setLoading(false);
      })  
  }

  let formik = useFormik({
    initialValues: {
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":""
  }, 

  validationSchema: signUpSchema,
  onSubmit: handleRegister
  })

  const showPasswordHandler = (e) => {
    if (e.target.classList.contains('fa-eye')) {
      e.target.parentNode.firstChild.type = 'text';
      e.target.classList.replace('fa-eye' , 'fa-eye-slash');
    } else {
      e.target.parentNode.firstChild.type = 'password';
      e.target.classList.replace('fa-eye-slash', 'fa-eye');
    }
  }

  const displayIconHandler = (e) => {
    if (e.target.value !== '') {
      e.target.parentNode.lastChild.classList.remove('hide');
    } else {
      e.target.parentNode.lastChild.classList.add('hide');
    }
  }

  useEffect(() => {
    const passInputs = document.querySelectorAll('.passField');

    passInputs.forEach(input => {
      input.addEventListener('input', displayIconHandler)
    })
    
    return () => {
      passInputs.forEach(input => {
        input.removeEventListener('input', displayIconHandler)
      })
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Helmet>
          <title> Fresh Cart | Sign Up Page </title>
      </Helmet>

      <div className="content max-w-xl mx-auto py-16 px-4">
      {alertMsg !== 'success' && alertMsg ? <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {alertMsg} </div> : null}
      
      <h2 className="mb-10 text-4xl font-bold text-center font-sans text-green-700">Create An Account</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="name" id="floating_name" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
              className="data-field block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""/>
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Your Name:
            </label>
          </div>

          {formik.errors.name && formik.touched.name && <div className="px-4 py-2 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.name} </div>
          }

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

          {formik.errors.email && formik.touched.email && <div className="px-4 py-2 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.email} </div>
          }

          {/* Phone Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input type="tel" name="phone" id="floating_phone" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""/>
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Your Phone:
            </label>
          </div>

          {formik.errors.phone && formik.touched.phone && <div className="px-4 py-2 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.phone} </div>
          }

          {/* Password Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="password" id="floating_password" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
              className="passField block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""/>
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Enter Your Password:
            </label>
              <i onClick={showPasswordHandler} className="fa-regular fa-eye hide absolute right-5 top-1/2 translate-y-[-50%] cursor-pointer"></i>
          </div>

          {formik.errors.password && formik.touched.password && <div className="px-4 py-2 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.password} </div>
          }

          {/* Repassword Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="rePassword" id="floating_repassword" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
              className="passField block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""/>
            <label
              htmlFor="floating_repassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm Your Password:
            </label>

            <i onClick={showPasswordHandler}  className="fa-regular fa-eye hide absolute right-5 top-1/2 translate-y-[-50%] cursor-pointer"></i>
          </div>

          {formik.errors.rePassword && formik.touched.rePassword && <div className="px-4 py-2 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {formik.errors.rePassword} </div>
          }

          {/* Submit Button */}
            <div className="flex justify-center">
              <button type="submit" className="block w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
                { loading ? <i className="fas fa-spinner fa-spin"></i> : 'SIGNUP'}
              </button>
            </div>
            <p className="text-gray-700 font-semibold text-[12px] text-center my-1">OR</p>
            
            <div className="text-center flex justify-center">
                <Link to={'/login'} className="w-full bg-green-700 hover:bg-green-800 text-white text-sm py-2.5 rounded-lg">I already have account</Link>
            </div>
        </form>
      </div>
    </>
  );
}