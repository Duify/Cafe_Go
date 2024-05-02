import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import  SelectedDishesContext from "./SelectedDishesContext";

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const { addDish } = useContext(SelectedDishesContext);


  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/dishes"); // Замените на ваш API endpoint
      setDishes(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleAddDish = (dish) => {
    addDish(dish);
    console.log(dish)
  };

  return (
    <Grid container spacing={3} style={{width:"100vw"}}>
      {dishes.map((dish) => (
        <Grid item xs={12} sm={3} md={3} key={dish.id}  style={{margin:"10px"}}>
          <Card style={{height:270}}>
            <CardMedia
              component="img"
              alt={dish.dish_name}
              height="140"
              image={dish.dish_img} // Замените на правильный URL-адрес изображения
            />
            <CardContent>
              <Typography  variant="h5" component="h2">
                {dish.dish_name}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="p">
                Цена: {dish.dish_cost} руб.
              </Typography>
            </CardContent>
            <button style={{backgroundColor:"#27274B",color:"white",fontWeight:"800",fontSize:"18px",width:"100%",height:"13%",cursor:"pointer",borderColor:"transparent"}} onClick={() => handleAddDish(dish)}> Добавить</button>
          </Card>
        
        </Grid>
      ))}
    </Grid>
  );
};

export default Menu;