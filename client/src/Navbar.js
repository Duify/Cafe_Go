import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  activeButton: {
    backgroundColor: "#27274B",
    color: "#fff",
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: "#27274B",
      color: "#fff",
    },
  },
  inactiveButton: {
    color: "#000",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#333",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const getButtonClassName = (path) => {
    return location.pathname === path ? classes.activeButton : classes.inactiveButton;
  };

  return (
    <div style={{justifyContent:"center",display:"flex",margin:"15px"}}>
      <Button className={getButtonClassName("/menu")} style={{height:"40px",margin:"3px"}} component="a" href="/menu">
        <p style={{fontSize:"24px"}}>Меню</p>
      </Button>
      <Button className={getButtonClassName("/booking")}  style={{height:"40px",margin:"3px"}} component="a" href="/booking">
      <p style={{fontSize:"24px"}}>Бронирование</p>
      </Button>
    </div>
  );
};

export default Navbar;