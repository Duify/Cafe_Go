import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import Header from "./Header";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route,Routes, Navigate} from "react-router-dom";
import BookingPage from "./BookingPage";
import CheckPage from "./CheckPage";
import BookingContext from "./BookingContext";
import Menu from "./Menu";
import { SelectedDishesProvider } from "./SelectedDishesContext";
import Login from "./Login";
import Register from "./Register";

function App() {

  const [bookingData, setBookingData] = useState({});

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      <SelectedDishesProvider >
    <div className="App" style= {{background: '#E2E2FD',width:'100vw',height:'100vh',backgroundSize:"cover",overflow:"auto"}}>
  
      
      <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/booking" element={<BookingPage />} />
        <Route exact path="/check" element={<CheckPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/menu" replace />} />
      
      </Routes>
      
    </Router>
    </div>
    </SelectedDishesProvider>
    </BookingContext.Provider>
  );
}

export default App;