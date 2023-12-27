import React, { useContext, useEffect, useState } from 'react'
import {areIntervalsOverlapping, differenceInCalendarDays, format} from "date-fns"
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function BookingCard({place,intervals}) {
        const [checkIn, setCheckIn]=useState('');
        const [checkOut, setCheckOut]=useState('');
        const [numberOfGuests, setNumberOfGuests]=useState(1);
        const [name, setName]=useState('');
        const [phone, setphone]=useState('');
        const [redirect, setRedirect]=useState('');
        const [interference, setInterference]=useState(false);
        const {user}=useContext(UserContext);

        useEffect(()=>{
                if(user){
                        setName(user.name)
                }
        },[user])

        useEffect(()=>{

                function calcIntervals(){
                
                        const dates=[]
                        
                        for (let i = 0; i<intervals.length; i++){
                                
                                const overlappping=areIntervalsOverlapping(
                                        { start: new Date(format(new Date(checkIn), 'yyyy/MM/dd')), end: new Date(format(new Date(checkOut), 'yyyy/MM/dd')) },
                                        { start: new Date(format(new Date(intervals[i].checkIn), 'yyyy/MM/dd')) , end: new Date(format(new Date(intervals[i].checkOut), 'yyyy/MM/dd')) }
                                )
                                dates.push(overlappping)
                                // console.log({ start: new Date(format(new Date(checkIn), 'yyyy/MM/dd')), end: new Date(format(new Date(checkOut), 'yyyy/MM/dd')) })
                                // console.log( { start: new Date(format(new Date(intervals[i].checkIn), 'yyyy/MM/dd')) , end: new Date(format(new Date(intervals[i].checkIn), 'yyyy/MM/dd')) })
                        }
                        console.log(dates)
                        if(dates.includes(true)){
                                setInterference(true)
                                setCheckIn("")
                                setCheckOut("")
                        }else{
                                setInterference(false)
                        }
                                
                }
                if(checkIn&&checkOut&&intervals){
                        try {
                                calcIntervals() 
                        } catch (error) {
                                console.error(error)
                        }
                        
                }
                
        },[checkIn,checkOut])

        let numberOfNights =0;
        
        if (checkIn && checkOut){
                numberOfNights= differenceInCalendarDays(new Date(checkOut),new Date(checkIn) )        
                
        }

        
        async function BookRoom (){
                const data = {
                        checkIn,checkOut,numberOfGuests,
                        name,phone,place: place._id, 
                        price : numberOfNights*place.price
                };
                const res = await axios.post('/booking', data)
                const bookingId= res.data._id
                setRedirect(`/account/bookings/${bookingId}`);
        }

        
            
        
            
        if (redirect){
                return <Navigate to={redirect}/>
        }       

  return (
    <div  className="w-full col-start-3  row-start-1 sticky top-6 bg-white m-5 border border-gray-50  rounded-xl p-3 shadow shadow-zinc-400">
                <div className="flex justify-between">
                        <h1 className="text-2xl">{place.price+" $"}</h1>
                        <div className="flex gap-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                            4.35
                        </div> 
                    </div>
                    {interference &&(
                                <span className='text-red-500'>This date is already have been booked !</span>
                        )}
                    <div className="border rounded-2xl mt-2">
                        
                        <div className="flex ">
                                
                                <div className=" border-r border-b">
                                        <label>check in :</label>
                                        <input type="date" value={checkIn} onChange={ev=>{setCheckIn(ev.target.value)}} min={format(new Date(),'yyyy-MM-dd')}/>
                                </div>
                                <div className=" border-b">
                                        <label>check out :</label>
                                        <input type="date" value={checkOut} onChange={ev=>{setCheckOut(ev.target.value)}} min={format(new Date(),'yyyy-MM-dd')} />
                                </div>
                        </div>
                        
                                <div className="p-3">
                                        <div >
                                                <label > Number of Guests :</label>
                                                <input type="text" value={numberOfGuests} onChange={ev=>{setNumberOfGuests(ev.target.value)}} />
        
                                        </div>
                                        <div>
                                                <label >Full Name :</label>
                                                <input type="text"  value={name} onChange={ev=>{setName(ev.target.value)}}/>
                                        </div>
                                        <div>   
                                                <label >Phone Number:</label>
                                                <input type="tel"  value={phone} onChange={ev=>{setphone(ev.target.value)}}/>
                                        </div>
                                        
                                        
                                </div>
                        
                       
                        
                    </div>
                    <button onClick={BookRoom} className="bg-primary rounded-2xl text-white px-4 p-2 mt-4 w-full">
                        Book
                        {numberOfNights >0 &&(
                                <span> $ {numberOfNights * place.price}</span>
                        )}
                    </button>
                        
                </div>
  )
}
