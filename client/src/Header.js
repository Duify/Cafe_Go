import * as React from "react";
 
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Logo from './лого.png';
import headerBackground from "./blue_background.jpg";
 
export default function Header() {
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
        </AppBar>
    );
}