/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {

    if (localStorage.getItem('userToken') !== null) 
    {
        return props.children
    }
    else 
    {
        return <Navigate to={'/login'}/>
    }
}
