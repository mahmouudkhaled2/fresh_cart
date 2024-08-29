/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


export default function VerifyCode() {
  
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [loding, setLoding] = useState(false)
  const [resStatus , setResStatus] = useState('');
  const [resMessage , setResMessage] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleVerification = (values) => {

    const resetCode = {
      resetCode: values.otp
    };
    setLoding(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', resetCode)
      .then(api => {
        if (api.data.status === "Success") {
          navigate('/reset_password');
          
        }
        setLoding(false);
      })
      .catch(error => {
        setResStatus(error.response.data.statusMsg)
        setResMessage(error.response.data.message)
        setLoding(false);
        });
  };

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d+$/, 'Must be digits only')
        .min(4, 'OTP must be at least 4 digits')
        .max(6, 'OTP must be no more than 6 digits')
        .required('OTP is required'),
    }),
    onSubmit: handleVerification,
  });


  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      navigate('/')
    }
  }, [])

  
  return (
    <>

      <Helmet>
          <title> Fresh Cart | Reset Code Verification </title>
      </Helmet>
      
      <div className="w-[95%] mx-auto py-16">
        {resStatus === 'fail' ? <p className="p-4 mb-6 max-w-xl mx-auto my-8 text-sm text-center text-red-700 rounded-lg bg-red-100 dark:bg-gray-700 dark:text-red-400">{resMessage}</p> :
          <div className="p-4 mb-6 max-w-xl mx-auto my-8 text-sm text-center text-green-700 rounded-lg bg-green-100 dark:bg-gray-700 dark:text-green-400" role="alert">
          Reset Code Sent to Your Email
        </div>
        }

        <div className="max-w-md mx-auto my-8 text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-lg shadow-green-200">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
            <p className="text-[15px] text-slate-500">Enter the verification code that was sent to your email.</p>
            
          </header>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-center gap-3">
              <input
                type="text"
                className="w-3/4 h-9 sm:h-12 md:h-14 text-center text-[18px] sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-0 md:px-4 outline-none focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100"
                maxLength="6"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="otp"
                ref={inputRef}
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="block w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 my-5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ">
                { loding ? <i className="fas fa-spinner fa-spin"></i> : 'Verify'}
              </button>
          </div>
          </form>
          {formik.errors.otp && formik.touched.otp && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.otp}
            </div>
          )}
          <div className="text-sm text-slate-500 mt-4">
            Didn't receive code?{' '}
            <a className="font-medium text-green-500 hover:text-green-600" href="#0">
              Resend
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
