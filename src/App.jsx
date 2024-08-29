import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Cart from './Components/Cart';
import NotFound from './Components/NotFound';
import Categories from './Components/Categories';
import Brands from './Components/Brands';
import Products from './Components/Products';
import ForgetPassword from './Components/ForgetPassword';
import VerifyCode from './Components/VerifyCode';
import ResetPassword from './Components/ResetPassword';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import ProductDetails from './Components/ProductDetails';
import ProInCategory from './Components/ProInCategory';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext';
import WishList from './Components/WishList';
import WishListContextProvider from './Context/WishListContext';
import Checkout from './Components/Checkout';
import AllOrders from './Components/AllOrders';
import PaymentContextProvide from './Context/PaymentContext';


const query = new QueryClient()

function App() {
  const routes = createHashRouter([
    { path: '/', element: <Layout />, children: [
      { index: true, element:<ProtectedRoute> <Home /> </ProtectedRoute>  },
      { path: 'login', element:  <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgetpassword', element: <ForgetPassword />   },
      { path: 'verify_code', element: <VerifyCode />},
      { path: 'reset_password', element: <ResetPassword /> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'wish_list', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'product_details/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: 'categories/:name', element: <ProtectedRoute> <ProInCategory /> </ProtectedRoute> },
      { path: 'categories/:name/:id', element: <ProtectedRoute> <ProInCategory /> </ProtectedRoute> },
      { path: 'products/:name/:id', element: <ProtectedRoute> <ProInCategory /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute>  },
      { path: 'checkout', element: <ProtectedRoute> <Checkout /> </ProtectedRoute>  },
      { path: 'allorders', element: <ProtectedRoute> <AllOrders /> </ProtectedRoute>  },
      { path: '*', element: <NotFound /> },
    ]},
  ]);

                
      return    <AuthContextProvider>
                  <CartContextProvider>
                    <PaymentContextProvide>
                      <WishListContextProvider>
                        <QueryClientProvider client={query}>
                          <RouterProvider router={routes} />
                          <ReactQueryDevtools initialIsOpen={false} />
                          <Toaster position="top-center" containerStyle={{ top: 80, left: 20, bottom: 20,right: 20,}}/>
                        </QueryClientProvider>
                      </WishListContextProvider>
                    </PaymentContextProvide>
                  </CartContextProvider> 
                </AuthContextProvider>
}

export default App;