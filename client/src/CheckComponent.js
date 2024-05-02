import React, { useState } from "react";

const CheckComponent = ({ table, date, time, dishes, onConfirm }) => {
  // Здесь вы можете хранить информацию о выбранном столике, дате, времени и заказанных блюдах
  // Например, вы можете использовать useState для хранения этой информации

  // Пример state для хранения выбранных блюд
  const [selectedDishes, setSelectedDishes] = useState(dishes || []);

  // Пример функции для добавления блюда в заказ
  const handleAddDish = (dish) => {
    setSelectedDishes([...selectedDishes, dish]);
  };

  // Пример функции для удаления блюда из заказа
  const handleRemoveDish = (dish) => {
    setSelectedDishes(selectedDishes.filter((d) => d !== dish));
  };

  // Пример функции для подтверждения заказа
  const handleConfirm = () => {
    // Здесь вы можете передать информацию о выбранном столике, дате, времени и заказанных блюдах в функцию onConfirm
    onConfirm({ table, date, time, dishes: selectedDishes });
  };

  return (
    <div>
      {/* Здесь вы можете отобразить информацию о выбранном столике, дате, времени и заказанных блюдах */}
      {/* Например, вы можете отобразить выбранный столик, дату и время */}
      <p>Столик: {table}</p>
      <p>Дата: {date}</p>
      <p>Время: {time}</p>

      {/* Здесь вы можете отобразить список заказанных блюд */}
      {/* Например, вы можете отобразить список блюд с кнопками для удаления блюда из заказа */}
      <ul>
        {selectedDishes.map((dish, index) => (
          <li key={index}>
            {dish}
            <button onClick={() => handleRemoveDish(dish)}>Удалить</button>
          </li>
        ))}
      </ul>

      {/* Здесь вы можете отобразить кнопку для добавления блюда в заказ */}
      <button onClick={() => handleAddDish("Пример блюда")}>Добавить блюдо</button>

      {/* Здесь вы можете отобразить кнопку для подтверждения заказа */}
      <button onClick={handleConfirm}>Вперед</button>
    </div>
  );
};

export default CheckComponent;