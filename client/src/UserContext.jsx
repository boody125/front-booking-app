import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


export const UserContext= createContext({})


export  function UserContextProvider({children}) {
    const param= useParams()
    
    const [user,setUser] = useState(null)
    const [userReady,setUserReady] = useState(false)
    useEffect(()=>{
      async function fetchData(){
        if(!user){
          const {data}=await axios.get('https://back-booking-app.onrender.com/api/profile');
          
          setUser(data)
          setUserReady(true)
          
        }
      }
      fetchData()
    },[])

  return (
    <UserContext.Provider value={{user,setUser,userReady}}>
        {children}
    </UserContext.Provider>
    
  )
}
