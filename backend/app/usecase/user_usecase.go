package usecase

import (
	"app/model"
	"app/repository"
	"strconv"

	"golang.org/x/crypto/bcrypt"
)

type IUserUsecase interface {
	SignUp(user model.User) (model.UserLoginResponse, error)
	Login(user model.User) (string, error)
	IsDuplicatedEmail(email string) bool
}

type userUsecase struct {
	ur repository.IUserRepository
}

func NewUserUsecase(ur repository.IUserRepository) IUserUsecase {
	return &userUsecase{ur}
}

func (uu *userUsecase) SignUp(user model.User) (model.UserLoginResponse, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return model.UserLoginResponse{}, err
	}
	newUser := model.User{Name: user.Name, Email: user.Email, Password: string(hash)}
	if err := uu.ur.CreateUser(&newUser); err != nil {
		return model.UserLoginResponse{}, err
	}
	resUser := model.UserLoginResponse{
		ID: newUser.ID,
	}
	return resUser, nil
}

func (uu *userUsecase) Login(user model.User) (string, error) {
	storedUser := model.User{}
	if err := uu.ur.GetUserByEmail(&storedUser, user.Email); err != nil {
		return "", err
	}
	err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(user.Password))
	if err != nil {
		return "", err
	}
	return strconv.FormatUint(uint64(storedUser.ID), 10), nil
}

func (uu *userUsecase) IsDuplicatedEmail(email string) bool {
	user := model.User{}
	if err := uu.ur.GetUserByEmail(&user, email); err != nil {
		return false
	}
	return true
}
