package models

import (
	"encoding/json"
)

type Client struct {
	ID        string
	Name      string
	Last_Name string
	Address   string
	Phone     json.Number
	Email     string
	DNI       json.Number
	CUIL      json.Number
	Empresa   string
	Job       string
}

