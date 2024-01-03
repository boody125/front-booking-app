import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import UploadPictures from '../UploadPictures'
import Perks from "../Perks";
import axios from "axios";

import AccountNavigationBar from "../AccountNavigationBar";



export default function PlacesFormPage() {
    let {id} = useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState(1);
    const [price,setPrice]=useState(null);
    const [redirect,setRedirect]=useState(false)

    useEffect(()=>{
      if (!id){
        return;
      }else{
        axios.get('https://back-booking-app.onrender.com/api/places/'+id).then(response=>{
          const {data}= response;
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhotos(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setPrice(data.price)
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);

        })
      }

    },[id])

    function inputHeader(text){
        return(
          <h2 className="text-2xl mt-4">{text}</h2>
        )
        
      }
    
      function inputDescription(text){
        return(
          <p className="text-gray-500 text-sm">{text}</p>
        )
      }
      
      function jointInput(header,text){
        
        return(
          <>
            {inputHeader(header)}
            {inputDescription(text)}
          </>
        )
      }

      async function addPlaces(ev){
        ev.preventDefault();

        const placeData ={
          title, address ,addedPhotos, 
          description, perks, extraInfo, price,
          checkIn, checkOut, maxGuests
        }

        if (id){
          console.log(placeData)
          const {data:response}=await axios.put('/place', {
            id, ...placeData
          })
        }else{
          const {data:response}=await axios.post('/place', placeData)
        }
        
        
        setRedirect(true)
        
      }

      async function deletePlace(ev){
        ev.preventDefault();
        if (id){
          
          const {data:response}=await axios.delete(`/place/${id}`)

          setRedirect(true)

        }
      }



      if (redirect){
        return <Navigate to={'/account/places'}/>
      }
      

  return (
    <div>
            <AccountNavigationBar/>
            <form onSubmit={addPlaces} >
              {jointInput("Title","Put a suitable title for your place")}
              <input className="text-gray-500 text-sm" value={title} onChange={ev=>setTitle(ev.target.value)} type="text" placeholder="title .. Name your property"/>
              {jointInput("Your Address","Enter your full address details")}
              <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="Your address" />
              {jointInput("Your Pictures","Put a suitable title for your place")}

              <UploadPictures addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

              {jointInput('Your Description','How would you describe your place')}
              <textarea value={description} onChange={ev=>setDescription(ev.target.value)} name="" id="" cols="70" rows="5"></textarea>


              {jointInput('Perks','Select your perks')}

              <Perks selected={perks} onChange={setPerks}/>
               
              {jointInput('Extra Information','More info you want to add to the client.')}
              <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} name="" id="" cols="40" rows="5"></textarea>
              {jointInput('Price & CheckIn / Out ','Your check in and chect out times.')}
            
              <div className="grid sm:grid-cols-4 gap-2">
                <div>
                  <h2 className="text-md mt-4">price per night</h2>
                  <input value={price} 
                         onChange={ev=>setPrice(ev.target.value)} type="text" placeholder="$"/>
                </div>
                <div>
                  <h2 className="text-md mt-4">Check in time</h2>
                  <input value={checkIn} 
                         onChange={ev=>setCheckIn(ev.target.value)} type="text" placeholder="12:00"/>
                </div>
                <div>
                  <h2 className="text-md mt-4">Check Out time</h2>
                  <input value={checkOut} 
                         onChange={ev=>setCheckOut(ev.target.value)} type="text" placeholder="9:00"/>
                </div>
                <div>
                  <h2 className="text-md mt-4">Max no of guests</h2>
                  <input value={maxGuests} 
                         onChange={ev=>setMaxGuests(ev.target.value)} type="text" placeholder="4"/>
                </div>
                
              </div>

                
              <div>
                <button className="primary mt-4">SAVE</button>
                {!!id &&(
                  <button onClick={deletePlace} className="secondary mt-1">Delete</button>
                )}
                
              </div>
              
            </form>
          </div>

  
  )
}
