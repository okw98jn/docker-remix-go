package repository

import (
	"app/model"

	"gorm.io/gorm"
)

type TaskRepositoryInterface interface {
	CreateTask(task *model.Task) error
}

type taskRepository struct {
	db *gorm.DB
}

func NewTaskRepository(db *gorm.DB) TaskRepositoryInterface {
	return &taskRepository{db}
}

func (ar *taskRepository) CreateTask(task *model.Task) error {
	if err := ar.db.Create(task).Error; err != nil {
		return err
	}
	return nil
}
