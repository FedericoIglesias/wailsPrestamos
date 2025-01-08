package models

import (
	"encoding/json"
)

type Client struct {
	ID        string
	Name      string
	Last_Name string
	Address   string
	Zone      string
	Partido   string
	Phone     json.Number
	DNI       json.Number
	CUIL      json.Number
	Empresa   string
	Job       string
	JobPlace  string
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
