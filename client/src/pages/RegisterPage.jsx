import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'

export default function RegisterPage() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect , setRedirect]=useState(false)
    
    const [error,setError]=useState(null);

    
    async function registerUser(e){
        e.preventDefault();
        if(password.length<8){
            return setError("Your password is too short , 8 minimum characters");
        }
        try {

            await axios.post('/register',{
                name:name,
                email:email,
                password:password
            })
            setError(null)
            
            alert("Registration is sucessfull, please porceed to the login page !")
            setRedirect(true)

        } catch (error) {
            alert("registration failed")
        }

        
        
    }
    if (redirect){
        return <Navigate to={"/login"}/>
      }
  return (
    <div className="flex items-center justify-around mt-4 grow ">
        <div className="mb-64">
            <h1 className="text-4xl text-center mb-12">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
                <input  type="text" 
                        placeholder="Your Name" 
                        value={name} 
                        onChange={(e)=>{setName(e.target.value)}}
                        required={true}/>
                
                <input  type="email" 
                        placeholder="example@email.com" 
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required={true} />
                
                <input  type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required={true}
                        
                        />
                {error && (
                    <span className="m-1 text-red-400"> {error}</span>
                )}

                <button className="primary">Register</button>

                <div className="text-center text-gray-500 py-2">
                    Have an acoount already ?
                    <Link className="underline text-black" to="/login"> Login </Link>
                </div>
            </form>
            
        </div>
    </div>
  )
}
