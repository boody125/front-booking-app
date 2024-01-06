import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {

  const {id} = useParams();
 
  const [booking,setBooking] = useState(null);
  const [redirect,setRedirect]=useState(false)

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        


        
        function found(booking) {
          return booking._id === id;
        }
        console.log(response.data)
        const foundBooking = response.data.find(found)
        if (foundBooking) {
          setBooking(foundBooking);
        }
        
      });
    }
  }, [id]);
  
  async function deleteBooking(ev){
    ev.preventDefault();
    if (id){
      
      const {data:response}=await axios.delete(`/booking/${id}`)

      setRedirect(true)

    }
  }

  if (redirect){
    return <Navigate to={'/account/bookings'}/>
  }


  if (!booking) {
      return '';
  }

  return (
   
      <div className="my-8 px-28">
        <h1 className="text-3xl">{booking.place?.title}</h1>
        
        <AddressLink className="my-2 block">{booking.place?.address}</AddressLink>
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
          <div >
            <h2 className="text-2xl mb-4">Your booking information:</h2>
            <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
          </div>
          <div className="grid gap-3">
            <div className="bg-primary p-6 text-white rounded-2xl">
              <div>Total price</div>
              <div className="text-3xl">${booking.price}</div>
              
            </div>
            <button onClick={deleteBooking} className="secondary w-full h-full">Delete Booking</button>
          </div>
          
      </div>
        <PlaceGallery place={booking.place} />
      
        
      </div>
  
  )
}


