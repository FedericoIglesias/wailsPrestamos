package models

import "encoding/json"

type Prestamo struct {
	ID       string
	Amount   json.Number
	Interest json.Number
	Cuota    json.Number
	Date     json.Number
	ClientId string
}

type PrestamoPlus struct {
	ID         string
	Amount     json.Number
	Interest   json.Number
	Cuota      json.Number
	Date       json.Number
	ClientId   string
	ClientName string
}
