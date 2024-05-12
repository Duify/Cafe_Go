import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SelectedDishesContext from "./SelectedDishesContext";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dishes, setDishes] = useState([]);
  const [addDishForm, setAddDishForm] = useState({
    name: "",
    cost: 0,
    imageURL: "",
    category: "",
    quantity: 0,
  });
  const [editDishForm, setEditDishForm] = useState({
    id: "",
    name: "",
    cost: 0,
    imageURL: "",
    category: "",
    quantity: 0,
  });

  const [fetchedDish, setFetchedDish] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const { addDish } = useContext(SelectedDishesContext);
  const categories = ["десерты", "фаст-фуд", "салаты"];
  const userStatus = localStorage.getItem("userStatus")
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

  const handleAddDishInputChange = (e) => {
    setAddDishForm({
      ...addDishForm,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleEditDishInputChange = (e) => {
    if (e.target.name === "dishName") {
      const selectedDish = dishes.find((dish) => dish.dish_name === e.target.value);
      setSelectedDish(selectedDish);
      setEditDishForm({
        id: selectedDish ? selectedDish.id : "",
        name: selectedDish ? selectedDish.dish_name : "",
        cost: selectedDish ? selectedDish.dish_cost : 0,
        imageURL: selectedDish ? selectedDish.dish_img : "",
        category: selectedDish ? selectedDish.dish_category : "",
        quantity: selectedDish ? selectedDish.dish_quantity : 0,
      });
    } else {
      setEditDishForm({
        ...editDishForm,
        [e.target.name]: e.target.value,
      });
    }
  };



  const handleAddDishSubmit = async (e) => {
    e.preventDefault();

    try {
      const newDish = {
        dish_name: addDishForm.name,
        dish_cost: parseInt(addDishForm.cost, 10),
        dish_img: addDishForm.imageURL,
        dish_category: addDishForm.category,
        dish_quantity: parseInt(addDishForm.quantity, 10)
      };

      const response = await axios.post("http://localhost:8000/api/addDish", newDish);
      setDishes([...dishes, response.data]);
      setAddDishForm({
        dish_name: "",
        dish_cost: 0,
        dish_img: "",
        dish_category: "",
        dish_quantity: 0,
      });
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };

  const handleEditDishSubmit = async (e) => {
    e.preventDefault();

  try {
    const updatedDish = {
      id: parseInt(editDishForm.id, 10),
      dish_name: editDishForm.name,
      dish_cost: parseInt(editDishForm.cost, 10),
      dish_img: editDishForm.imageURL,
      dish_category: editDishForm.category,
      dish_quantity: parseInt(editDishForm.quantity, 10),
    };

    const response = await axios.put("http://localhost:8000/api/updateDish", updatedDish);

    // Update the dishes state with the updated dish
    setDishes(dishes.map((dish) => (dish.id === updatedDish.dish_id ? response.data : dish)));

    // Clear the edit dish form
    setEditDishForm({
      id: "",
      name: "",
      cost: 0,
      imageURL: "",
      category: "",
      quantity: 0,
    });
    setFetchedDish(null);
  } catch (error) {
    console.error("Error updating dish:", error);
  }
  };

  const AddDishForm = (
    <Grid item xs={12} sm={3} md={2} key={'add-dish-form'} style={{ margin: '10px' }}>
      <Card style={{ height: 320 , backgroundColor:'#ACB5E9',textAlign:"left"}}>
        <CardContent>
          <form onSubmit={handleAddDishSubmit}>
            <h3 style={{margin:0}}>Добавить новое блюдо</h3>
            <input
              type="text"
              name="name"
              value={addDishForm.name}
              onChange={handleAddDishInputChange}
              placeholder="Название"
              required
              style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
              
            />
            <input
              type="number"
              name="cost"
              value={addDishForm.cost}
              onChange={handleAddDishInputChange}
              placeholder="Цена"
              required
              style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
            />
            <input
              type="text"
              name="imageURL"
              value={addDishForm.imageURL}
              onChange={handleAddDishInputChange}
              placeholder="Ссылка на картинку"
              required
              style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
            />
            <select
              name="category"
              value={addDishForm.category}
              onChange={handleAddDishInputChange}
              required
              style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
            >
              <option value="">Выберите категорию</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={addDishForm.quantity}
              onChange={handleAddDishInputChange}
              placeholder="Количество"
              required
              style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
            />
            <button type="submit" style={{backgroundColor:"#27274B",color:"white",marginTop:"15px",borderRadius:"5px",fontWeight:"800",fontSize:"18px",width:"100%",height:"13%",cursor:"pointer",borderColor:"transparent"}} >Добавить блюдо</button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );

  const EditDishForm = (
    <Grid item xs={12} sm={3} md={2} key={'edit-dish-form'} style={{ margin: '10px'}}>
    <Card style={{ height: 320, backgroundColor:'#ACB5E9',textAlign:"left"}}>
      <CardContent >
        
        <form onSubmit={handleEditDishSubmit} >
          <select
            name="dishName"
            value={selectedDish ? selectedDish.dish_name : ""}
            onChange={handleEditDishInputChange}
            required
            style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",fontWeight:"bold",width:"95%"}}
          >
            <option value="">Выберите блюдо</option>
            {dishes.map((dish) => (
              <option key={dish.id} value={dish.dish_name}>
                
                {dish.dish_name}
                
              </option>
            ))}
          </select>
          {selectedDish && (
            <>
              
              <input
                type="text"
                name="name"
                value={editDishForm.name}
                onChange={handleEditDishInputChange}
                placeholder="Name"
                required
                style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
              />
              <input
                type="number"
                name="cost"
                value={editDishForm.cost}
                onChange={handleEditDishInputChange}
                placeholder="Cost"
                required
                style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
              />
              <input
                type="text"
                name="imageURL"
                value={editDishForm.imageURL}
                onChange={handleEditDishInputChange}
                placeholder="Image URL"
                required
                style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
              />
              <select
                name="category"
                value={editDishForm.category}
                onChange={handleEditDishInputChange}
                required
                style={{marginTop:"10px",padding:"2px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
              >
                <option value="">Select category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category} >
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="quantity"
                value={editDishForm.quantity}
                onChange={handleEditDishInputChange}
                placeholder="Quantity"
                required
                style={{marginTop:"10px",padding:"5px",borderRadius:"5px",borderColor:"transparent",fontSize:"20px",width:"95%"}}
              />
            </>
          )}
          <button type="submit" style={{backgroundColor:"#27274B",color:"white",marginTop:"15px",borderRadius:"5px",fontWeight:"800",fontSize:"18px",width:"100%",height:"13%",cursor:"pointer",borderColor:"transparent"}} disabled={!selectedDish}>
            Изменить данные
          </button>
        </form>
        
      </CardContent>
    </Card>
  </Grid>
  );

  return (
    <div>
      <select
        value={selectedCategory}
        style={{fontSize:"20px",height:"40px",margin:"10px",borderRadius:"5px",borderColor:"transparent",boxShadow:"0px 4px 5px rgb(0,0,0,0.3)",float:"left"}}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Все категории</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <Grid container spacing={3} style={{ width: "100vw" }}>
        {dishes
          .filter((dish) => !selectedCategory || dish.dish_category === selectedCategory)
          .map((dish) => (
            <Grid item xs={12} sm={3} md={2} key={dish.id} style={{ margin: "10px" }}>
              <Card style={{ height: 320 }}>
                <CardMedia
                  component="img"
                  alt={dish.dish_name}
                  height="140"
                  image={dish.dish_img}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {dish.dish_name}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" component="p">
                    Цена: {dish.dish_cost} руб.
                  </Typography>
                  <Typography variant="h7" color="textSecondary" component="p">
                    Осталось в наличии: {dish.dish_quantity}
                  </Typography>
                </CardContent>
                <button
                  style={{backgroundColor:"#27274B",color:"white",fontWeight:"800",fontSize:"18px",width:"100%",height:"13%",cursor:"pointer",borderColor:"transparent"}}
                  onClick={() => handleAddDish(dish)}
                >
                  Добавить
                </button>
              </Card>
            </Grid>
          ))}

        {
        userStatus === "1" && (
          <>
            {AddDishForm}
            {EditDishForm}
          </>
        )}
      </Grid>
    </div>
  );
};

export default Menu;
