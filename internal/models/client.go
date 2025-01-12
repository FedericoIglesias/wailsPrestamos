package models

type Client struct {
	ID        string
	Name      string
	Last_Name string
	Address   string
	Zone      string
	Partido   string
	Phone     string
	DNI       string
	CUIL      string
	Empresa   string
	Job       string
	JobPlace  string
}

type ClientPopUp struct {
	Name       string
	Last_Name  string
	Address    string
	Phone      string
	Email      string
	DNI        string
	CUIL       string
	Empresa    string
	Job        string
	LoanAmount string
	AmountDue  string
	AmountPaid string
	Loans      []LoanToPopUpClient
}
