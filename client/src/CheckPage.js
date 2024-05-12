import React, { useContext } from "react";
import BookingContext from "./BookingContext";
import SelectedDishesContext from "./SelectedDishesContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Waiter from './waiter.png';
import axios from "axios";

const CheckPage = () => {
  const { bookingData } = useContext(BookingContext);
  const { selectedDishes, removeDish } = useContext(SelectedDishesContext);

  const handleReturnDish = async (dish) => {
    try {
      await axios.post('http://localhost:8000/api/returnDish', dish);
      removeDish(dish.id);
    } catch (error) {
      console.error('Error returning dish:', error);
    }
  };

  const totalCost = Object.values(selectedDishes).reduce((acc, dish) => {
    return acc + dish.dish_cost * dish.quantity;
  }, 0);

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <h1>Ваш заказ</h1>
        <div style={{display:"flex"}}>
       <img src={Waiter} style={{ width: 200, height: 200 }}/>
        <div style={{ textAlign:"left",
        backgroundColor:"white",
        padding:"5px", 
        borderRadius:"5px", 
        position:"relative", 
        left:"9%",
        margin:"10px",
        boxShadow:"0px 4px 5px rgb(0,0,0,0.3)", 
        
        }}>
            
      
      <p>Номер столика: {bookingData.number_of_table}</p>
      <p>Время: {bookingData.time}</p>
      <p>Дата: {bookingData.date}</p>
      </div>
      </div>
      <TableContainer sx={{ minWidth: 350, maxWidth: 500}}  component={Paper}>
        <Table sx={{ minWidth: 350, maxWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название блюда</TableCell>
              <TableCell align="right">Цена (руб.)</TableCell>
              <TableCell align="right">Количество</TableCell>
              <TableCell align="right">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(selectedDishes).map((dish) => (
              <TableRow
                key={dish.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dish.dish_name}
                </TableCell>
                <TableCell align="right">{dish.dish_cost}</TableCell>
                <TableCell align="right">{dish.quantity}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="error" onClick={() => handleReturnDish(dish)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableRow>
          <TableCell colSpan={3} align="right">Общая сумма заказа:</TableCell>
          <TableCell align="right" style={{fontSize:"25px"}}> {totalCost} рублей</TableCell>
        </TableRow>
      </TableContainer>
    </div>
  );
};

export default CheckPage;