import './App.css'
import { Routes, Route } from 'react-router-dom'
import SlotBooking from './components/SlotBooking'
function App() {
  return (
    <div className="App">
      <h1>Welcome to our Slot Booking App!</h1>
      <Routes>
        <Route path="/" element={<SlotBooking />} />
      </Routes>
    </div>
  )
}

export default App
