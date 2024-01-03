import { useContext, useState } from "react";
import { Link , Navigate} from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect , setRedirect]=useState(false)
  const{setUser}=useContext(UserContext);
  async function handleSubmit(e){
    e.preventDefault();
    try {
      const {data}=await axios.post('https://back-booking-app.onrender.com/api/login',{
        email:email,
        password:password
      })
      
      setUser(data)

      alert("Login sucessfull")
      
      setRedirect(true)
    } catch (error) {
      console.log(error)
      alert("Login failed")
    }
  }

  if (redirect){
    return <Navigate to={"/"}/>
  }
  return (
    <div className="flex items-center justify-around mt grow ">
        <div className="mb-64">
            <h1 className="text-4xl text-center mb-12">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <input type="email" 
                placeholder="example@email.com" 
                value={email} 
                onChange={e=> setEmail(e.target.value)}/>

                <input type="password" placeholder="password" 
                value={password} 
                onChange={e=> setPassword(e.target.value)}/>
                <button className="primary">Login</button>
                <div className="text-center text-gray-500 py-2">
                    Don`t have an account yet ?
                    <Link className="underline text-black" to="/register"> Register now</Link>
                </div>
            </form>
            
        </div>
    </div>
  )
}
