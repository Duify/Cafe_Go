import React, { useState } from "react";
import axios from "axios";
import cort from "./cort_background.jpg";

function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        login,
        password,
        username,
      });

      if (response.status === 201) {
        setError("");
        alert("Registration successful!");
        // Optionally, you can redirect the user to the login page
        // window.location.href = "/login";
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("User already exists");
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  return (
    <div style={{background: `linear-gradient( #E2E2FD 150px, transparent 600px), url(${cort})`, width:"100vw", height:"83.5%",backgroundRepeat:"no-repeat",overflow:"hidden",backgroundSize:"cover"}}>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <h2>Зарегистрироваться</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleRegister} style={{ height:"200px",width:"200px",display:"flex",flexDirection:"column"}}>

            <input
              style={{
                  height:"35px",
                  width:"200px",
                  fontSize:"20px",
                  padding:"4px",
                  borderRadius:"5px",
                  borderColor:"transparent",
                  boxShadow:"0px 4px 5px rgb(0,0,0,0.3)"
              }}
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />

          <br />

            <input
              style={{
                  height:"35px",
                  width:"200px",
                  fontSize:"20px",
                  padding:"4px",
                  borderRadius:"5px",
                  borderColor:"transparent",
                  boxShadow:"0px 4px 5px rgb(0,0,0,0.3)"
              }}
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          <br />

            <input
              style={{
                  height:"35px",
                  width:"200px",
                  fontSize:"20px",
                  padding:"4px",
                  borderRadius:"5px",
                  borderColor:"transparent",
                  boxShadow:"0px 4px 5px rgb(0,0,0,0.3)"
              }}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          <br />
          <button style={{
                  width:"210px",
                  fontSize:"20px",
                  cursor:"pointer",
                  padding:"4px",
                  borderRadius:"5px",
                  borderColor:"transparent",
                  boxShadow:"0px 4px 5px rgb(0,0,0,0.3)" }} type="submit">Вперёд</button>
        </form>
      </div>
    </div>
  );
}

export default Register;