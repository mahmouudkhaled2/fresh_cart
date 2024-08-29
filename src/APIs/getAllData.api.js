// get all products 
import axios  from 'axios';


// Get All Products
export default function getAllData (endPoint) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`)
}
export function getWishList () {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
}

