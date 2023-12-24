package model

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	Id        uint           `json:"id" gorm:"primary_key; autoIncrement"`
	Title     string         `json:"title" gorm:"not null; comment:タイトル"`
	Memo      string         `json:"memo" gorm:"comment:メモ"`
	Deadline  time.Time      `json:"deadline" gorm:"comment:期限日"`
	CreatedAt time.Time      `json:"created_at" gorm:"comment:作成日時"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"comment:更新日時"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"comment:論理削除日時"`
}

type TaskResponse struct {
	Id uint `json:"id"`
}
