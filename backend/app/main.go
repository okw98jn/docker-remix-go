package main

import (
	"app/controller"
	"app/db"
	"app/repository"
	"app/router"
	"app/usecase"
)

func main() {
	db := db.NewDB()
	taskRepository := repository.NewTaskRepository(db)
	taskUseCase := usecase.NewTaskUsecase(taskRepository)
	taskController := controller.NewTaskController(taskUseCase)
	e := router.NewRouter(taskController)
	e.Logger.Fatal(e.Start(":8080"))
}
