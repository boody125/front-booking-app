import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingCard from "../BookingCard";
import { areIntervalsOverlapping, format } from "date-fns";
import Image from "../Image";


export default function Room() {
    const [place , setPlace]=useState(null)
    const [intervals, setIntervals]=useState(null)
    const [showPhotos , setShowPhotos]=useState(false)

    
    let {id}= useParams()
    useEffect(()=>{
        async function callRoom (){
            const {data:response}= await axios.get('/room'+id)
            // console.log(response)
            setIntervals(response[1])
            setPlace(response[0])
            
        }
        callRoom()
        
    },[])

    

    if (showPhotos){
        return (
            <div  className=" absolute bg-black min-h-screen inset-0 ">
                <div>
                    <button className="fixed flex left-28 top-10 bg-white rounded-2xl shadow" onClick={()=>{setShowPhotos(false)}}>
                        

                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-16 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                        </svg>
                    </button>
                </div>
                <div className=" grid grid-cols-2 bg-black gap-4 p-52 ">
                    {place?.photos?.length > 0 && place.photos.map(photo =>(
                        <Image onClick={()=>{setShowPhotos(true)}} src={photo}  className="h-3/4 w-full h-fcursor-pointer ull" />
                    ))}
                </div>
                
            </div>

        )
    }
    
  return (
    place!==null && (
        <div className="px-36 p-6 my-12 ">


            <h1 className=" font-semibold text-3xl mb-1.5">{place.title}</h1>
            <h3 className="inline-flex "> 
                
                <div className="inline-flex mr-6 ">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    4.35
                </div>
                <a target="_blank" className="flex gap-1 underline " rel="noreferrer" href={"https://maps.google.com.sa/?q="+place.address}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>

                        {place.address}
                        
                </a>
                
            </h3>
            <div className="grid grid-cols-4 gap-2 mt-6 md:grid-cols-2 sm:grid-cols-2  xs:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="col-span-2">
                    {place.photos?.[0] && 
                        (
                            <div className= "">
                                    <Image onClick={()=>{setShowPhotos(true)}}  src={place.photos[0]} className="cursor-pointer aspect-[4/3] focus:border-blue-400 rounded-2xl w-full object-cover z-0"/>  
                            </div>     
                        )      
                    }
                    
                </div>

                <div className="grid gap-2">
                    {place.photos?.[1] && 
                        (
                            
                            <div className= "">
                                    <Image onClick={()=>{setShowPhotos(true)}}  src={place.photos[1]} className="cursor-pointer aspect-[4/3] rounded-2xl w-full object-cover z-0"/>  
                            </div>        
                        )      
                    }                    
                    {place.photos?.[2] && 
                        (
                            <div className= " ">
                                    <Image onClick={()=>{setShowPhotos(true)}}  src={place.photos[2]} className="cursor-pointer aspect-[4/3] rounded-2xl w-full object-cover z-0"/>  
                            </div>
                        )      
                    }                    
                </div>
                <div className="grid gap-2 relative ">
                    {place.photos?.[3] && 
                            
                        (
                            <div className= "">
                                <Image onClick={()=>{setShowPhotos(true)}}  src={place.photos[3]} className="cursor-pointer aspect-[4/3] rounded-2xl w-full object-cover z-0"/>  
                            </div>        
                        )      
                    }
                    {place.photos?.[4] && 
                        (    
                            <div className= "">
                                <Image onClick={()=>{setShowPhotos(true)}}  src={place.photos[4]} className="cursor-pointer aspect-[4/3] rounded-2xl w-full object-cover z-0"/>  
                            </div>         
                        )      
                    }
                    <button onClick={()=>{setShowPhotos(true)}}className="flex gap-2 absolute bottom-3 right-6 rounded-2xl px-3 py-2 bg-white border border-black shadow ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>

                        Show all photos
                    </button>
                </div>
                
            </div>
            <div className="grid grid-cols-3 grid-rows-2 ">
                
                <div className="col-start-1 col-span-2 sm:col-span-2 row-start-1 row-span-2">
                        <div>
                            <h1 className="font-bold text-4xl mb-6"> Description </h1>
                            <p className="text-xl"> {place.description}</p>
                        </div>
                        <div className="mt-6">
                            <p className="text-xl"> <strong>- Check In :</strong> {place.checkIn} </p>
                            <p className="text-xl"> <strong> - Check Out : </strong> {place.checkOut}</p>
                            <p className="text-xl">  <strong>- Max No. of Guests :  </strong>{place.maxGuests}</p>
                        </div>
                        <div className="mt-10">
                            <h1 className="font-bold text-2xl  mb-6"> Extra Info </h1>
                            <p className="text-xl"> {place.extraInfo}</p>
                        </div>
                </div>
                
                
                <BookingCard place={place} intervals={intervals}/>
                
              
            </div>
        </div>
    ) )
}
