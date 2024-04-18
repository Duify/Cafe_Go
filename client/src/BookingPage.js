import React, { useState } from "react";
import axios from "axios";
import map from "./map.png";
import './App.css';

const BookingPage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [tableAvailability, setTableAvailability] = useState({});
  const [unavailableTimes, setUnavailableTimes] = useState({});
  



  const handleTableClick = async (tableNumber) => {
    const response = await axios.post("http://localhost:8000/api/check-availability", {
      table: tableNumber,
    });
  
    setUnavailableTimes({
      ...unavailableTimes,
      [tableNumber]: response.data.unavailableTimes,
    });
  
    setSelectedTable(tableNumber);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleBooking = async () => {
    if (!selectedTable || !selectedTime) {
      alert("Please select a table and time.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/bookings", {
        number_of_table: selectedTable,
        time: selectedTime,
      });

      console.log(response.data);
      alert("Booking successful!");
    } catch (error) {
      console.error(error);
      alert("Error while booking. Please try again.");
    }
  };

  return (
    <div>
    <h1 style={{fontWeight:"initial",color:"#27274B"}}>Выберите столик</h1>
    <div className="bookDiv">
        
        
        
      {/* Restaurant map with tables as divs */}
    <div className="myDiv">
    {/*<img  src={map} />*/}
    <div className="container">
    <div className="myDiv2" style={{cursor:"pointer"}}onClick={() => handleTableClick(1)}></div>
    <div className="myDiv3" style={{cursor:"pointer"}}onClick={() => handleTableClick(2)}></div>
    <div className="myDiv4" style={{cursor:"pointer"}}onClick={() => handleTableClick(3)}></div>
    <div className="myDiv5" style={{cursor:"pointer"}}onClick={() => handleTableClick(4)}></div>
    </div>
    </div>
      
      {/* ... */}

      {/* Time dropdown */}
      <select value={selectedTime} style={{width:"185px",height:"40px",fontSize:20}} onChange={handleTimeChange}>
  <option value="">Выберите время</option>
  <option value="10:00" disabled={unavailableTimes[selectedTable] && unavailableTimes[selectedTable].includes("10:00")}>10:00 AM</option>
  <option value="10:30" disabled={unavailableTimes[selectedTable] && unavailableTimes[selectedTable].includes("10:30")}>10:30 AM</option>
  {/* ... */}
  <option value="22:00" disabled={unavailableTimes[selectedTable] && unavailableTimes[selectedTable].includes("22:00")}>10:00 PM</option>
</select>

      {/* Book button */}
      <button onClick={handleBooking} style={{width:"180px",height:"40px",fontSize:20}} disabled={!selectedTable || !selectedTime}>
        Забронировать
      </button>
    </div>
    </div>
  );
};

export default BookingPage;