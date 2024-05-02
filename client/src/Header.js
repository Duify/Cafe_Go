import * as React from "react";
 
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Logo from './лого.png';
import headerBackground from "./blue_background.jpg";
import { useNavigate, Link} from "react-router-dom";
 
export default function Header() {
    const token = localStorage.getItem("user");

    const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/booking");
  };

    return (
        <AppBar position="static"  style={{backgroundImage: `url(${headerBackground})`,  width:'100vw', height:'70px' }}>
            <Toolbar>
                {/*Inside the IconButton, we 
                    can render various icons*/}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {/*This is a simple Menu 
                      Icon wrapped in Icon */}
                   
                </IconButton>
                {/* The Typography component applies 
                     default font weights and sizes */}
 
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    display= 'flex'
                    justifyContent='center'
                >
                    <img src={Logo} style={{ width: 200, height: 60 }}/>
                    
                </Typography>
                
            </Toolbar>
        {localStorage.getItem("user") ? (
        <Link to="/booking" style={{ textDecoration: "none", top: "-5px", right: "5%", position: "absolute" }} onClick={logout}>
          <p style={{ fontSize: "20px", color: "white", fontWeight: 800 }}>Выйти</p>
        </Link>
      ) : (
        <Link to="/login" style={{ textDecoration: "none", top: "-5px", right: "5%", position: "absolute" }}>
          <p style={{ fontSize: "20px", color: "white", fontWeight: 800 }}>Войти</p>
        </Link>
      )}
        </AppBar>
    );
}