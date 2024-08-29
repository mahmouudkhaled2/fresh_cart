import Loading from "./Loding";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import xMark from './../assets/images/cart-xmark.png'
import { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const { getCartItems, deleteItem, updateCount, clearAllCart, subtotal, setSubtotal, Items, setItems, setNumOfItems, loading } = useContext(CartContext);

  async function getAllItems() {
    let data = await getCartItems();
    setSubtotal(data?.data?.data.totalCartPrice);
    setItems(data?.data?.data.products);
  }

  async function updateQuantity(count, id) {
    let data = await updateCount(count, id);
    setItems(data?.data.products);
    setSubtotal(data?.data.totalCartPrice);
  }

  async function delItem(id) {
    let data = await deleteItem(id);
    setItems(data?.data.products);
    setSubtotal(data?.data.totalCartPrice);
    setNumOfItems(data.numOfCartItems);
  }

  async function clearAllItems() {
    clearAllCart();
    setItems([]);
    setNumOfItems(0);
  }

  useEffect(() => {
    getAllItems();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
        <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title> Fresh Cart | Shopping Cart </title>
      </Helmet>
      <section className="py-20 px-3">
        <div className="bg-gray-100">
          <div className="max-w-5xl mx-auto flex justify-between items-center p-6 mb-6 border-b-2 border-gray-300">
            <h1 className="text-center text-2xl text-green-700 font-bold font-mono">Cart Items</h1>
            <button
              type="button"
              onClick={clearAllItems}
              className={`block bg-red-700 text-white py-1.5 px-3 rounded-md ${Items?.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Clear Cart
            </button>
          </div>

          {Items.length === 0 ? (
            <div className="text-center py-10">
              <img src={xMark} className="w-28 mx-auto mb-6" alt="empty cart image" />
              <span>Cart is empty, add some products</span>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl justify-between px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3 flex flex-col gap-y-6">
                {Items?.map(item => (
                  <div key={item?._id} className="justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img src={item?.product.imageCover} alt={item?.product.title} className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-md lg:text-lg font-bold text-gray-900">{item?.product.title}</h2>
                        <p className="text-sm text-light text-gray-400">{item?.product?.brand?.name}</p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block">
                        <div className="flex items-center border-gray-100">
                          <button
                            onClick={() => { updateQuantity(item?.count - 1, item?.product?._id) }}
                            disabled={item?.count === 1}
                            className={`border-none outline-none rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-green-50 ${item?.count === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            -
                          </button>
                          <span className="px-3">{item?.count}</span>
                          <button
                            onClick={() => { updateQuantity(item?.count + 1, item?.product.id) }}
                            disabled={item?.count === item?.product?.quantity}
                            className={`border-none outline-none rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-green-50 ${item?.count === item?.product?.quantity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex gap-x-2 sm:gap-x-0 items-center justify-between">
                          <p className="text-sm sm:text-md">{item?.price} EGP</p>
                          <HiArchiveBoxXMark
                            onClick={() => { delItem(item?.product?._id) }}
                            className="text-md sm:text-lg text-[#db2323] hover:text-[#ff3c3c] cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:w-1/3">
                <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0">
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">{subtotal ? subtotal : '0'} <small>EGP</small></p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">{subtotal ? '45' : '0'} <small>EGP</small></p>
                  </div>
                  <hr className="my-[1.457rem]" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div>
                      <p className="mb-1 text-lg text-end font-bold">{subtotal ? subtotal + 45 : '0'} <small>EGP</small></p>
                      <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                  <Link to={'/checkout'}>
                    <button className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-green-50 hover:bg-green-600">Check out</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;





















// /* eslint-disable react-hooks/exhaustive-deps */
// import Loading from "./Loding";
// import { HiArchiveBoxXMark } from "react-icons/hi2";
// import xMark from './../assets/images/cart-xmark.png'
// import { useContext, useEffect } from "react";
// import { CartContext } from "../Context/CartContext";
// import { Link } from "react-router-dom";
// import { Helmet } from 'react-helmet-async';

// const Cart = () => {
//    const {getCartItems, deleteItem, updateCount, clearAllCart , subtotal, setSubtotal, Items, setItems, setNumOfItems, loading} = useContext(CartContext)

//   async function getAllItems () {
//       let data = await getCartItems();
//       setSubtotal(data?.data?.data.totalCartPrice)
//       setItems(data?.data?.data.products)
//   }

//   async function updateQuantity (count, id) {
//     let data = await updateCount(count , id);
//     setItems(data?.data.products)
//     setSubtotal(data?.data.totalCartPrice)
//   }

//   async function delItem (id) {
//     let data = await deleteItem(id);
//     setItems(data?.data.products)
//     setSubtotal(data?.data.totalCartPrice)
//     setNumOfItems(data.numOfCartItems)
//   }

  
//   async function clearAllItems () {
//     clearAllCart();
//     setItems([])
//     setNumOfItems(0)
//   }


//   useEffect(() => { 
//     getAllItems()
//   } , [])

//   if (loading) {
//     return <>
//     <Loading/> 
//     <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
//     </> 
//   }
  
//   return (
//     <>
//         <Helmet>
//           <title> Fresh Cart | Shopping Cart </title>
//         </Helmet>
//       <section className="py-20 px-3">
//         <div className="bg-gray-100">
//           <div className="max-w-5xl mx-auto flex justify-between items-center p-6 mb-6 border-b-2 border-gray-300">
//             <h1 className="text-center text-2xl  text-green-700 font-bold font-mono">Cart Items</h1>
//             <button 
//               type="button" 
//               onClick={clearAllItems} 
//               className={`${Items?.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} block bg-red-700 text-white py-1.5 px-3 rounded-md`}>
//               Clear Cart
//             </button>
//           </div>

//           {Items.length == 0 ? 
//             <div className="text-center py-10">
//               <img src={xMark} className="w-28 mx-auto mb-6" alt="empty cart image" />
//               <span>Cart is empty , add some products</span>
//             </div>
//           :
//             <div className="mx-auto max-w-5xl justify-between px-6 md:flex md:space-x-6 xl:px-0">
//               <div className="rounded-lg md:w-2/3 flex flex-col gap-y-6">
//                 {Items?.map(item => <div key={item?._id} className="justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
//                     <img src={item?.product.imageCover} alt={item?.product.title} className="w-full rounded-lg sm:w-40" />
//                     <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                       <div className="mt-5 sm:mt-0">

//                         <h2 className="text-md lg:text-lg font-bold text-gray-900">{item?.product.title}</h2>
//                         <p className="text-sm text-light text-gray-400">{item?.product?.brand?.name}</p>
//                       </div>
//                       <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block ">
//                         <div className="flex items-center border-gray-100">
//                         <button 
//                           onClick={() => { updateQuantity(item?.count - 1, item?.product?._id) }} 
//                           disabled={item?.count === 1}  
//                           className={`${item?.count === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} border-none outline-none rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-green-50`}>
//                           - 
//                         </button>

//                         <span className="px-3">{item?.count}</span>

//                         <button 
//                           onClick={() => { updateQuantity(item?.count + 1, item?.product.id) }}
//                           disabled={item?.count === item?.product?.quantity}
//                           className={`${item?.count === item?.product?.quantity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} border-none outline-none rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-green-50`}>
//                           + 
//                         </button>
//                         </div>
//                         <div className="flex gap-x-2 sm:gap-x-0 items-center justify-between">
//                           <p className="text-sm sm:text-md">{item?.price} EGP</p>
//                           <HiArchiveBoxXMark onClick={() => {delItem(item?.product?._id)}} className="text-md sm:text-lg text-[#db2323] hover:text-[#ff3c3c] cursor-pointer"/>
//                         </div>
//                       </div>
//                     </div>
//                   </div>)}
//               </div>
//               {/* Sub total */}
//               <div className="md:w-1/3">
//                 <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0">
//                     <div className="mb-2 flex justify-between">
//                       <p className="text-gray-700">Subtotal</p>
//                       <p className="text-gray-700">{subtotal ? subtotal : '0'} <small>EGP</small></p>
//                     </div>
//                     <div className="flex justify-between">
//                       <p className="text-gray-700">Shipping</p>
//                       <p className="text-gray-700">{subtotal ? '45' : '0'} <small>EGP</small></p>
//                     </div>
//                     <hr className="my-[1.457rem]"/>
//                     <div className="flex justify-between">
//                       <p className="text-lg font-bold">Total</p>
//                       <div className>
//                         <p className="mb-1 text-lg text-end font-bold">{subtotal ? subtotal + 45 : '0'} <small>EGP</small></p>
//                         <p className="text-sm text-gray-700">including VAT</p>
//                       </div>
//                     </div>
//                     <Link to={'/checkout'}>
//                       <button className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-green-50 hover:bg-green-600">Check out</button>
//                     </Link>
//                 </div>
//               </div>
//             </div>
//           }
//         </div>
//       </section>  
//     </>
//   )
// }

// export default Cart