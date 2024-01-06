import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import {Navigate, Link, useParams} from "react-router-dom"
import axios from "axios"

import AccountNavigationBar from "../AccountNavigationBar"


export default function ProfilePage() {
  const [redirect,setRedirect]= useState(null)
  const {user,setUser,userReady}= useContext(UserContext)

  
  async function logout(){
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }
  
  
  

  if (userReady && !user && !redirect){
    return <Navigate to="/login" />
  }

  
  

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <div>
      <AccountNavigationBar/>
      
        <div className="text-center max-w-lg mx-auto">
          logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">logout</button>
        </div>


    </div>
  )
}
