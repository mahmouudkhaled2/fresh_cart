// import axios from "axios";
// import Swal from 'sweetalert2'




// export function onlinePayment({cartId, shippingAddress , url}) {
    
//     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {shippingAddress}, {
//         headers: {
//             token: localStorage.getItem('userToken')
//         }
//     })
//     .then( data => {
//         if (data.data.status === 'success') 
//             window.location.href = data.data.session.url
        
//         console.log(data)
//     })
//     .catch( error => console.log(error))
// }


// export function cashPayment({cartId, shippingAddress}) {
//     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {shippingAddress}, {
//         headers: {
//             token: localStorage.getItem('userToken')
//         }
//     })
//     .then( data => {



//         Swal.fire({
//             title: 'Success!',
//             text: 'Do you want to continue',
//             icon: 'success',
//             confirmButtonText: 'Cool'
//           })
//         //   .then((data) => {
//         //     if (data.isConfirmed) {
//         //         window.location.href =  'http://localhost:5173/allorders'
//         //     }
//         //   })
        
        
//           console.log(data)
//          return data
//         })
//     .catch( error => console.log(error))
// }

