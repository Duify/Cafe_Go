import React, {useReducer} from "react";

const SelectedDishesContext = React.createContext();

export const SelectedDishesProvider = ({ children }) => {
    const [selectedDishes, setSelectedDishes] = React.useState({});

    const addDish = (dish) => {
        setSelectedDishes((prevDishes) => {
          const newDishes = { ...prevDishes };
          if (newDishes[dish.id]) {
            newDishes[dish.id] = { ...newDishes[dish.id], quantity: newDishes[dish.id].quantity + 1 };
          } else {
            newDishes[dish.id] = { ...dish, quantity: 1 };
          }
          return newDishes;
        });
      };

      const removeDish = (dishId) => {
        setSelectedDishes((prevDishes) => {
          const newDishes = { ...prevDishes };
          if (newDishes[dishId] && newDishes[dishId].quantity > 1) {
            newDishes[dishId] = { ...newDishes[dishId], quantity: newDishes[dishId].quantity - 1 };
          } else {
            delete newDishes[dishId];
          }
          return newDishes;
        });
      };

  return (
    <SelectedDishesContext.Provider value={{ selectedDishes, addDish, removeDish }}>
      {children}
    </SelectedDishesContext.Provider>
  );
};

export default SelectedDishesContext;