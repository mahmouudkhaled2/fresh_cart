import amazonPay from './../assets/images/amazon-pay.png'
import americanExpress from './../assets/images/american-express.png'
import masterCard from './../assets/images/mastercard.png'
import payPal from './../assets/images/paypal.png'
import appleIcon from './../assets/images/apple-logo.png'
import googlePlay from './../assets/images/google-play-icon.png'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="content p-12 bg-main-light border-t-[1px] border-gray-300">
          <div className='txt mb-4 text-center sm:text-start'>
            <h2 className='text-gray-800 text-3xl font-light'>Get the FreshCart app</h2>
            <p className='text-gray-500'>We will send you a link, open it on your phone to download the app.</p>
          </div>

          <div className='form flex flex-col md:flex-row items-start justify-between px-5 mb-5'>
            <div className='w-full md:w-[75%] lg:w-[83%] mb-3 md:mb-0'>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" />
              </div>
            </div>

            <button type="button" className="focus:outline-none w-full md:w-[22%] lg:w-[16%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Share App Link
            </button>

          </div>

          <div className="partners flex flex-col lg:flex-row items-center gap-6 justify-between  py-3 border-y border-gray-300">
            <ul className='flex flex-col sm:flex-row gap-3 items-center'>
              <li className='font-semibold h-6 font-mono text-sm'>Payment Partner:</li>

              <li>
                <img src={amazonPay} className='inline-block w-[60px] mr-3' alt="" />
                <img src={americanExpress} className='inline-block w-[30px] mr-3' alt="" />
                <img src={masterCard} className='inline-block w-[30px] mr-3' alt="" />
                <img src={payPal} className='inline-block w-[50px]' alt="" />
              </li>
            </ul>

            <ul className='flex  flex-col sm:flex-row gap-3 items-center'>
              <li className='font-semibold font-mono text-sm'>Get deliver with FreshCart</li>
              <li>
                <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg px-2 py-1 mr-3   text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30">
                  <img src={appleIcon} className='w-6 mr-[8px]' alt="" />
                  <div className='text-start'>
                    <p className='text-[10px] h-1'>Available on</p>
                    <span className='text-[12px] font-bold'>Apple Store</span>
                  </div>
              </button>

              <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg px-2 py-1 inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30">
                  <img src={googlePlay} className='w-5 mr-[8px]' alt="" />
                  <div className='text-start'>
                    <p className='text-[10px] h-1'>Get It on </p>
                    <span className='text-[12px] font-bold'>Google Play</span>
                  </div>
                </button>
            </li>
              <li>

              </li>
            </ul>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer