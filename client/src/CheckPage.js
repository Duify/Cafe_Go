import React, { useContext } from "react";
import BookingContext from "./BookingContext";
import SelectedDishesContext from "./SelectedDishesContext";

const CheckPage = () => {
  const { bookingData } = useContext(BookingContext);
  const { selectedDishes, removeDish } = useContext(SelectedDishesContext);

  return (
    <div>
      <h1>CheckPage</h1>
      <p>Number of table: {bookingData.number_of_table}</p>
      <p>Time: {bookingData.time}</p>
      <p>Date: {bookingData.date}</p>
      {Object.values(selectedDishes).map((dish) => (
        <div key={dish.id}>
          <h3>{dish.dish_name}</h3>
          <p>{dish.dish_cost} руб. x {dish.quantity}</p> {/* Display the quantity of the dish */}
          <button onClick={() => removeDish(dish.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default CheckPage;