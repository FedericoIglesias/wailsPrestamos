package models

import (
	"encoding/json"

	"github.com/FedericoIglesias/local_db"
)

type Client struct {
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

func NewClient(name, last_name, address, phone, email, dni, cuil, empresa, job string) *Client {
	return &Client{
		Name:      name,
		Last_Name: last_name,
		Address:   address,
		Phone:     json.Number(phone),
		Email:     email,
		DNI:       json.Number(dni),
		CUIL:      json.Number(cuil),
		Empresa:   empresa,
		Job:       job,
	}
}

func (c *Client) SaveClient() {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	driver.Write("clients", c.DNI.String(), c)

}

func (c *Client) UpdateClient() {

}
