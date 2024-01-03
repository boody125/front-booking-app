import './App.css'
import {Route,Routes} from "react-router-dom"
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import LayOut from './LayOut'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import BookingPage from './pages/BookingPage'
import Room from './pages/Room'
import BookingsPage from './pages/BookingsPage'


axios.defaults.withCredentials= true


function App() {


  return (
    <UserContextProvider>
      <Routes>
        <Route element={<LayOut/>}> 
          <Route path="/" element={<IndexPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage/>} />
          <Route path="/account/places" element={<PlacesPage/>} />
          <Route path="/account/places/new" element={<PlacesFormPage/>} />
          <Route path="/account/places/:id" element={<PlacesFormPage/>} />
          <Route path="/account/bookings" element={<BookingsPage/>} />
          <Route path="/account/bookings/:id" element={<BookingPage/>} />
          <Route path="/room/:id" element={<Room/>} />
          
          
          
        </Route>
        
      </Routes>

    </UserContextProvider>
  )
}

export default App
