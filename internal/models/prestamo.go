package models

import "encoding/json"

type Prestamo struct {
	Amount   json.Number
	Interest json.Number
	Cuota    json.Number
	Date     json.Number
	ClientId json.Number
}

