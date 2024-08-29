import logo from './../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
import { WishListContext } from '../Context/WishListContext';

const Navbar = () => {

  const {userLogin, setUserLogin} = useContext(AuthContext)
  const {numOfItems} = useContext(CartContext)
  const {count} = useContext(WishListContext)

  const navigate = useNavigate()


  const logOut = () => {
    setUserLogin(null);
    localStorage.removeItem('userToken');
    navigate('/login');
  }

  const toggleNavbar = () => {
    const navbarSticky = document.getElementById('navbar-sticky');
    
    if (navbarSticky.classList.contains('h-[0]')) {
        navbarSticky.classList.replace('h-[0]', 'h-[360px]')
    } else {
      navbarSticky.classList.replace('h-[360px]', 'h-[0]')
    }
  }

  return (
    <>        
      <nav className="bg-main-light  dark:bg-gray-900 fixed w-full top-0 start-0 z-[99999] border-b border-gray-200 dark:border-gray-600 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap lg:flex-nowrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="Flowbite Logo" />
          </Link>

          <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button onClick={toggleNavbar} type="button" id='nav-toggler' className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>


          <div className="items-center justify-between w-full lg:flex lg:w-4/5 h-[0] lg:h-auto overflow-hidden lg:overflow-visible transition-all duration-500" id="navbar-sticky">
            <ul className="flex flex-col  lg:justify-center w-full lg:w-3/5 p-4 lg:p-0 my-4 font-medium lg:space-x-3 rtl:space-x-reverse lg:flex-row lg:my-0">
              {userLogin !== null ? 
              <>
                <li>
                  <NavLink to="/" onClick={toggleNavbar} className="block py-2 px-3 text-gray-900 rounded relative" aria-current="page">Home</NavLink>
                </li>
                <li>
                  <NavLink to="products" onClick={toggleNavbar} className="block py-2 px-3 text-gray-900 rounded  lg:hover:text-green-500 relative  lg:dark:hover:bg-transparent">Products</NavLink>
                </li>
                <li>
                  <NavLink to="categories" onClick={toggleNavbar} className="block py-2 px-3 text-gray-900 rounded  lg:hover:text-green-500 relative  lg:dark:hover:bg-transparent">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="brands" onClick={toggleNavbar} className="block py-2 px-3 text-gray-900 rounded  lg:hover:text-green-500 relative  lg:dark:hover:bg-transparent">Brands</NavLink>
                </li>
                <li>
                  <NavLink to="allorders" onClick={toggleNavbar} className="block py-2 px-3 text-gray-900 rounded  lg:hover:text-green-500 relative  lg:dark:hover:bg-transparent">Orders</NavLink>
                </li>
              </>
              : 
                null
              }  
            </ul>

            <ul className='flex items-center pl-7 pb-4 lg:p-0 lg:border-0 border-b-2'>
            {userLogin !== null &&
              <div className='flex items-center'>
                <li className='py-2 pr-3 relative'>
                    <Link to="wish_list" onClick={toggleNavbar} className="block text-gray-900 rounded  lg:hover:text-green-500 relative  lg:dark:hover:bg-transparent">
                    <i className="fa-solid fa-heart text-xl"></i>
                    </Link>
                    <span className={`${count == 0 ? 'bg-red-700' : 'bg-green-700'} w-5 h-5 rounded-full flex justify-center items-center absolute bottom-[80%] text-white text-[11px]`}>{count}</span>
                </li>

                <li className='py-2 pr-3 relative '>
                  <Link to="cart" onClick={toggleNavbar} className="block text-gray-900 rounded  lg:hover:text-green-500 relative  lg:dark:hover:bg-transparent">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  </Link>
                  <span className={`${numOfItems == 0 ? 'bg-red-700' : 'bg-green-700'} w-5 h-5 rounded-full flex justify-center items-center absolute bottom-[80%] left-[3px] text-white text-[11px]`}>{numOfItems}</span>
                </li> 
              </div>
               }

              <li className={`flex gap-3 ${userLogin !== null ? 'border-x-2 border-gray-300 ml-3 px-3 py-2' : ''}`}>
                <a href="https://www.linkedin.com/in/mahmouud-khaled" target='_blank' aria-label="LinkedIn Profile Link"><i className='fab fa-linkedin  text-lg md:text-md lg:text-lg'></i></a>
                <a href="https://github.com/mahmouudkhaled2" target='_blank' aria-label="GitHub Profile Link"><i className='fab fa-github  text-lg md:text-md lg:text-lg'></i></a>
                <a href="https://www.facebook.com/MahmouudKhaled1" target='_blank' aria-label="Facebook Profile Link"><i className='fab fa-facebook-f text-lg md:text-md lg:text-lg'></i></a>
              </li>
            </ul>
            

            <ul className=' '>  
              <li className='flex gap-3'>
                {
                userLogin === null ? 
                <div className='flex flex-col lg:flex-row gap-3 mt-3 ml-7 lg:m-0'>
                  <Link to="login" onClick={toggleNavbar} className='hover:text-green-500'>Login</Link>
                  <Link to="register" onClick={toggleNavbar} className='hover:text-green-500'>Sign Up</Link>
                </div> 
                : <span 
                  onClick={() => {
                  logOut()
                  toggleNavbar()
                  }} 
                  className='hover:text-green-500 cursor-pointer font-semibold mt-3 ml-7 lg:m-0'>Log out <i className="fa-solid fa-arrow-right-from-bracket ml-1"></i></span>
                }
                
                
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      <div className="offset-nav h-[60px]"></div>
    </>
  )
}

export default Navbar