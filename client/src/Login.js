import React, { useState } from "react";
import axios from "axios";
import cort from "./cort_background.jpg"

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        login,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        localStorage.setItem("username", response.data.username);
        
        window.location.href = "/booking"; // перенаправить пользователя на главную страницу
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid login or password");
      } else {
        setError("An error occurred during login");
      }
    }
  };

  return (
    <div style={{background: `linear-gradient( #E2E2FD 150px, transparent 600px), url(${cort})`, width:"100vw", height:"83.5%",backgroundRepeat:"no-repeat",overflow:"hidden",backgroundSize:"cover"}}>
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <h2>Авторизация</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin} style={{ height:"120px",width:"200px",display:"flex",flexDirection:"column"}}>
        
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
                boxShadow:"0px 4px 5px rgb(0,0,0,0.3)" }} type="submit">Войти</button>
      </form>
    </div>
    </div>
  );
}

export default Login;