import React, { useState, useContext } from "react";
import axios from "axios";
import map from "./map.png";
import './App.css';
import BookingContext from "./BookingContext";
import { useNavigate } from "react-router-dom";


const BookingPage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [unavailableTimes, setUnavailableTimes] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTableNumber, setSelectedTableNumber] = useState(null);
  const { setBookingData } = useContext(BookingContext);



const handleDateChange = (event) => {
  setSelectedDate(event.target.value);
  setSelectedTime("");
  setSelectedTable();
  setSelectedTableNumber();
};
  
const handleConfirm = (data) => {
  // Здесь вы можете передать данные в базу данных
  console.log(data);
};


  const handleTableClick = async (tableNumber) => {
    setSelectedTableNumber(tableNumber);
    setSelectedTime("");

    if (selectedDate) {
    const response = await axios.post("http://localhost:8000/api/check-availability", {
      table: tableNumber,
      date: selectedDate,
    });
  
    setUnavailableTimes({
      ...unavailableTimes,
      [tableNumber]: response.data.unavailableTimes,
    });
}
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
        date: selectedDate,
      });
  
      console.log(response.data);
      alert("Booking successful!");
  
         // Save booking data
    const bookingData = {
      number_of_table: selectedTable,
      time: selectedTime,
      date: selectedDate,
    };
    console.log(bookingData)

    setBookingData(bookingData);

    // Redirect to CheckPage
    
      
    } catch (error) {
      console.error(error);
      alert("Error while booking. Please try again.");
    }
  };

  return (
    <div>
    {/*<h1 style={{fontWeight:"initial",color:"#27274B"}}>Выберите столик</h1>*/}
   
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
      <div className="bookDiv2">
      <label for="date" style={{fontSize:20}}>1. Введите дату посещения</label>
      <input type="date" id="date" value={selectedDate} style={{width:"185px",height:"40px",fontSize:20,marginBottom:"20px",marginTop:"10px"}} onChange={handleDateChange} />
      
      <label for="number" style={{fontSize:20}}>2. Выберите столик на карте</label>
      {selectedTableNumber !== null && (
  <h3 id="number" style={{fontWeight:"bold",color:"#000"}}>Столик номер {selectedTableNumber}</h3>
)}
      
      <label for="time" style={{fontSize:20}}>3. Выберите время посещения</label>
      <select id="time" value={selectedTime} style={{width:"185px",height:"40px",fontSize:20,marginBottom:"20px",marginTop:"10px"}} onChange={handleTimeChange}>
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
    
    </div>
  );
};

export default BookingPage;