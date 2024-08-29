/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"; 
import useMutationCart from "../Hooks/useMutationCart";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./../Context/CartContext";
import { WishListContext } from "../Context/WishListContext";
import { AuthContext } from "../Context/AuthContext";




export default function Item({product , slider}) {

    const {addItem} = useContext(CartContext)
    const {addToWishList, removeWishListItem , allItems} = useContext(WishListContext)
    const {mutate:addProduct} = useMutationCart(addItem);
    const [isInWishList, setIsInWishList] = useState(false);
    const { user } = useContext(AuthContext);
    // console.log(user);
    
    useEffect(() => {
        let wishList = JSON.parse(localStorage.getItem(`wishList_${user}`)) || [];
        const isItemInWishList = wishList.includes(product.id);
        setIsInWishList(isItemInWishList);
      }, [allItems,product.id]);
    
      const handleWishListToggle = () => {
        let wishList = JSON.parse(localStorage.getItem(`wishList_${user}`)) || [];
        if (isInWishList) {
          wishList = wishList.filter(id => id !== product.id);
          removeWishListItem(product.id);
        } else {
          wishList.push(product.id);
          addToWishList(product.id);
        }
        localStorage.setItem(`wishList_${user}`, JSON.stringify(wishList));
        setIsInWishList(!isInWishList);
      };


return (
    <div className={`w-full ${slider ? '' : 'sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'}`}>
      <div className="product bg-white shadow-md rounded-xl duration-500 hover:scale-[1.04] hover:shadow-xl p-4 mx-3">
        <img src={product?.imageCover} alt={product?.title} className="w-full rounded-t-xl object-fill" />
        <div>
          <span className="text-gray-400 mr-3 uppercase text-xs">{product?.category?.name}</span>
          <p className="text-lg font-bold text-black truncate block capitalize">{product?.title}</p>
          <div className="flex justify-between items-center">
            <p className="text-black cursor-auto my-3">{product?.price} <small>EGP</small></p>
            <span>{product?.ratingsAverage} <i className="fas fa-star text-yellow-300"></i></span>
          </div>
          <div className="flex items-center justify-between">
            <Link to={`/product_details/${product?.id}`}>
              <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Details
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <span onClick={handleWishListToggle} className="text-2xl cursor-pointer">
                <i className={`fa-heart ${isInWishList ? 'fas text-red-600' : 'far'}`}></i>
              </span>

              <span onClick={() => addProduct(product?.id)} className="fav-icon cursor-pointer hover:text-green-700 text-2xl">
                <i className="fa-solid fa-cart-plus" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
