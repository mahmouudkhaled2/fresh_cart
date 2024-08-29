/* eslint-disable react/prop-types */

import { createContext, useEffect, useState} from "react";
export const AuthContext = createContext();

export default function AuthContextProvider(props) {

    const [userLogin, setUserLogin] = useState(null);
    const [user, setUser] = useState('');

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null)
            {
             setUserLogin(localStorage.getItem('userToken'))
            }

        if (localStorage.getItem('userToken') !== null) {
            setUser(localStorage.getItem('userEmail'))
        }    

    }, [])
    
  return <AuthContext.Provider value={{ userLogin, setUserLogin, user, setUser}}>
        {props.children}
    </AuthContext.Provider>
  
}



