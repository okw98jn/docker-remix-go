package controller

import (
	"app/model"
	"app/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ITaskController interface {
	CreateTask(c echo.Context) error
}

type taskController struct {
	tu usecase.TaskUsecaseInterface
}

func NewTaskController(tu usecase.TaskUsecaseInterface) ITaskController {
	return &taskController{tu}
}

func (tc *taskController) CreateTask(c echo.Context) error {
	task := model.Task{}
	if err := c.Bind(&task); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	taskRes, err := tc.tu.CreateTask(task)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, taskRes)
}
