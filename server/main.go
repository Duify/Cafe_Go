package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "root"
	dbname   = "Cafe"
)

type Booking struct {
	NumberOfTable int    `json:"number_of_table"`
	Time          string `json:"time"`
	Date          string `json:"date"`
}

type AvailabilityRequest struct {
	Table int    `json:"table"`
	Date  string `json:"date"` // Add this line
}

type Dish struct {
	ID       int    `json:"id"`
	Name     string `json:"dish_name"`
	Cost     int    `json:"dish_cost"`
	ImageURL string `json:"dish_img"`
}

type User struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

var mySigningKey = []byte("secret")
var db *sql.DB

func main() {

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		ExposedHeaders:   []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           3600,
	})

	router := mux.NewRouter()
	router.HandleFunc("/api/bookings", createBooking).Methods("POST")

	router.HandleFunc("/api/check-availability", checkTableAvailability).Methods("POST")

	router.HandleFunc("/api/dishes", getDishesHandler).Methods("GET")

	router.HandleFunc("/api/login", loginHandler).Methods("POST")

	log.Fatal(http.ListenAndServe(":8000", c.Handler(router)))
}

func checkTableAvailability(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var request AvailabilityRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `SELECT time FROM booking_tables WHERE number_of_table=$1 AND date=$2` // Update this line
	rows, err := db.Query(query, request.Table, request.Date)                       // Update this line
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var unavailableTimes []string

	for rows.Next() {
		var time string
		err := rows.Scan(&time)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		unavailableTimes = append(unavailableTimes, time)
	}

	response := struct {
		UnavailableTimes []string `json:"unavailableTimes"`
	}{
		UnavailableTimes: unavailableTimes,
	}

	json.NewEncoder(w).Encode(response)
}

func createBooking(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var booking Booking
	err := json.NewDecoder(r.Body).Decode(&booking)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `INSERT INTO booking_tables (number_of_table, time, date) VALUES ($1, $2, $3)` // Update this line
	_, err = db.Exec(query, booking.NumberOfTable, booking.Time, booking.Date)              // Update this line
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(booking)
}

func getDishesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	rows, err := db.Query("SELECT dish_id, dish_name, dish_cost, dish_img FROM dishes")
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var dishes []Dish
	for rows.Next() {
		var dish Dish
		err := rows.Scan(&dish.ID, &dish.Name, &dish.Cost, &dish.ImageURL)
		if err != nil {
			log.Println(err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		dishes = append(dishes, dish)
	}

	json.NewEncoder(w).Encode(dishes)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Получить пользователя из базы данных
	row := db.QueryRow("SELECT password, username FROM users WHERE login=$1", user.Login)
	var dbPassword string
	var username string
	err = row.Scan(&dbPassword, &username)
	if err != nil {
		http.Error(w, "Invalid login or password ahaha", http.StatusUnauthorized)
		return
	}

	// Сравнить пароли
	if dbPassword != user.Password {
		http.Error(w, "Invalid login or password hehehe", http.StatusUnauthorized)
		return
	}
	now := time.Now()
	someExpirationTime := now.Add(24 * time.Hour).Unix()

	// Create a new token with claims
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: someExpirationTime,
		},
	}

	// Sign the token with the signing key
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(mySigningKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return the token as a JSON response
	response := map[string]string{"token": tokenString}
	json.NewEncoder(w).Encode(response)
}
