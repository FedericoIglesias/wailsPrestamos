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

type ClientPopUp struct {
	Name           string
	Last_Name      string
	Address        string
	Phone          json.Number
	Email          string
	DNI            json.Number
	CUIL           json.Number
	Empresa        string
	Job            string
	PrestamoAmount json.Number
	AmountDue      json.Number
	AmountPaid     json.Number
	Prestamos      []PrestamoToPopUpClient
}
