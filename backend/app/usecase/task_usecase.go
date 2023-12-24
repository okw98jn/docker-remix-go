package usecase

import (
	"app/model"
	"app/repository"
)

type TaskUsecaseInterface interface {
	CreateTask(task model.Task) (model.TaskResponse, error)
}

type taskUsecase struct {
	tr repository.TaskRepositoryInterface
}

func NewTaskUsecase(tr repository.TaskRepositoryInterface) TaskUsecaseInterface {
	return &taskUsecase{tr}
}

func (tu *taskUsecase) CreateTask(task model.Task) (model.TaskResponse, error) {
	if err := tu.tr.CreateTask(&task); err != nil {
		return model.TaskResponse{}, err
	}

	resTask := model.TaskResponse{
		Id: task.Id,
	}
	return resTask, nil
}
