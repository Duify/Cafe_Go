import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import  SelectedDishesContext from "./SelectedDishesContext";



const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dishes, setDishes] = useState([]);
  const { addDish } = useContext(SelectedDishesContext);

  const categories = ["десерты", "фаст-фуд", "салаты"];

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/dishes");
      setDishes(response.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  /*const handleAddDish = (dish) => {
    addDish(dish);
    console.log(dish)
  };*/
  const handleAddDish = async (dish) => {
    try {
      const response = await axios.post('http://localhost:8000/api/checkDishQuantity', dish);
      if (response.data.quantity > 0) {
        addDish(dish);
      } else {
        alert('Товар кончился');
      }
    } catch (error) {
      console.error('Error checking dish quantity:', error);
    }
  };

  return (
    <div >
        <select value={selectedCategory} style={{fontSize:"20px",height:"40px",margin:"10px",borderRadius:"5px",borderColor:"transparent",boxShadow:"0px 4px 5px rgb(0,0,0,0.3)",float:"left"}} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Все категории</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    <Grid container spacing={3} style={{width:"100vw"}}>
        {dishes
          .filter((dish) => !selectedCategory || dish.dish_category === selectedCategory)
          .map((dish) => (
        <Grid item xs={12} sm={3} md={2} key={dish.id}  style={{margin:"10px"}}>
          <Card style={{height:320}}>
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
              <Typography variant="h7" color="textSecondary" component="p">
                Осталось в наличии: {dish.dish_quantity}
              </Typography>
            </CardContent>
            <button style={{backgroundColor:"#27274B",color:"white",fontWeight:"800",fontSize:"18px",width:"100%",height:"13%",cursor:"pointer",borderColor:"transparent"}} onClick={() => handleAddDish(dish)}> Добавить</button>
          </Card>
        
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default Menu;