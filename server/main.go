package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

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

	log.Fatal(http.ListenAndServe(":8000", c.Handler(router)))
}

func checkTableAvailability(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var request struct {
		Table int `json:"table"`
	}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `SELECT time FROM booking_tables WHERE number_of_table=$1`
	rows, err := db.Query(query, request.Table)
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

	query := `INSERT INTO booking_tables (number_of_table, Time) VALUES ($1, $2)`
	_, err = db.Exec(query, booking.NumberOfTable, booking.Time)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(booking)
}
