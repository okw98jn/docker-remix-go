package main

import (
	"app/db"
	"app/model"
	"fmt"
)

// docker compose exec go go run migrate/migrate.go
func main() {
	dbConnection := db.NewDB()
	defer fmt.Println("migration finished")
	defer db.CloseDB(dbConnection)
	dbConnection.AutoMigrate(&model.Task{}, &model.User{})
}
