package router

import (
	"app/controller"

	"github.com/labstack/echo/v4"
)

func NewRouter(tc controller.TaskControllerInterface) *echo.Echo {
	e := echo.New()
	e.POST("/task/", tc.CreateTask)
	return e
}
