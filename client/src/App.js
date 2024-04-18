import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import Header from "./Header";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route,Routes, Navigate} from "react-router-dom";
import BookingPage from "./BookingPage";

function App() {
  /*const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8000/users");
    setUsers(response.data);
  };*/

  return (
    <div className="App" style= {{background: '#E2E2FD',width:'100vw',height:'100vh'}}>
      <Header />
      <Router>
      <Navbar />
      <Routes>
        <Route exact path="/menu"  />
        <Route exact path="/booking" element={<BookingPage />} />
        <Route path="/" element={<Navigate to="/menu" replace />} />
      </Routes>
      
    </Router>
    </div>
  );
}

export default App;