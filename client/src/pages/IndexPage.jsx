import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import Image from "../Image"


export default function IndexPage(){
    const [places , setPlaces]=useState([])
    useEffect(()=>{
        axios.get('https://back-booking-app.onrender.com/api/places').then( res =>{
            setPlaces([...res.data,...res.data,...res.data,...res.data,...res.data]);
        })
    },[])

    return (
        <div className="mt-16 mx-6 gap-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            { places?.length >0 && places?.map(place=>(
                    <Link to={'/room/'+place?._id} key={Math.random()}>
                        <div className="bg-grey-500 rounded-xl">
                        
                            {place?.photos?.[0] && (
                                <Image className="rounded-xl aspect-square object-cover" src={place?.photos?.[0]} alt="" />
                            )}
                        </div>
                        <div className="mt-2 mb-4">
                            <h4 className="text-base font-bold ">{place?.address}</h4>
                            <h2 className="text-base font-thin leading-4 "> {place?.title} </h2>
                            
                            <div className="mt-3 ">
                                <h2 className="text-md "> {} <strong>{"$"+place?.price}</strong>  {" / Night"} </h2>
                            </div>
                        </div>
                        
                        
                    </Link>
                    
                ))
                
            }

        </div>

    )
}


