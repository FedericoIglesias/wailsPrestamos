package main

import (
	"encoding/json"
	"fmt"
	"prestamos/internal/models"
	"sort"
	"strconv"
	"time"

	"github.com/FedericoIglesias/local_db"
)

// App struct
type App struct {
	// ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) SaveClient(Client models.Client) {
	driver, err := local_db.New("./db", nil)

	if err != nil {
		panic(err)
	}
	err = driver.Write("clients", Client.ID, Client)
	if err != nil {
		panic(err)
	}

}

func (a *App) GetAllClient() []models.Client {
	driver, err := local_db.New("./db", nil)

	if err != nil {
		panic(err)
	}

	listClient := []models.Client{}

	records, err := driver.ReadAll("clients")

	if err != nil {
		return nil
	}

	for _, client := range records {
		c := &models.Client{}
		if err := json.Unmarshal([]byte(client), &c); err != nil {
			panic(err)
		}
		listClient = append(listClient, *c)
	}

	sort.Slice(listClient, func(i, j int) bool { return listClient[i].Name < listClient[j].Name })

	return listClient
}

func (a *App) SaveLoan(loan models.LoanBrought) {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	listCheckPay := FillQuote(loan.Quota, loan.Date)

	err = driver.Write("loans", loan.ID, &models.Loan{
		ID:             loan.ID,
		LoanNumber:     loan.LoanNumber,
		Amount:         loan.Amount,
		Interest:       loan.Interest,
		Quota:          loan.Quota,
		Date:           loan.Date,
		ClientId:       loan.ClientId,
		CheckPay:       listCheckPay,
		TotalAmount:    loan.TotalAmount,
		AmountPaid:     "0",
		AmountForQuota: loan.AmountForQuota,
	})

	if err != nil {
		fmt.Println(err)
	}

}

func (a *App) GetAllLoanTable() []models.LoanTable {
	driver, err := local_db.New("./db", nil)

	if err != nil {
		panic(err)
	}

	listLoan := []models.Loan{}

	records, err := driver.ReadAll("loans")

	if err != nil {
		return nil
	}

	for _, loan := range records {
		p := &models.Loan{}
		if err := json.Unmarshal([]byte(loan), &p); err != nil {
			panic(err)
		}
		listLoan = append(listLoan, *p)
	}

	return FillDataLoan(listLoan, a.GetAllClient())
}

func FillDataLoan(listLoan []models.Loan, listClient []models.Client) []models.LoanTable {
	var listLoanTable []models.LoanTable
	for _, client := range listClient {
		for _, loan := range listLoan {
			if loan.ClientId == client.ID {
				loanTable := &models.LoanTable{
					ID:         loan.ID,
					LoanNumber: loan.LoanNumber,
					Amount:     loan.Amount,
					Interest:   loan.Interest,
					Quota:      loan.Quota,
					Date:       loan.Date,
					ClientId:   loan.ClientId,
					ClientName: client.Name + " " + client.Last_Name,
				}
				listLoanTable = append(listLoanTable, *loanTable)
			}
		}
	}

	sort.Slice(listLoanTable, func(i, j int) bool { return listLoanTable[i].Date < listLoanTable[j].Date })
	return listLoanTable
}

func FillQuote(quotas, date string) []models.CheckPay {
	listCheckPay := []models.CheckPay{}

	c, err := strconv.Atoi(quotas)

	if err != nil {
		panic(err)
	}

	initDate, err := strconv.Atoi(date)

	if err != nil {
		panic(err)
	}

	dateUnix := time.UnixMilli(int64(initDate))

	dateUnix = time.Date(dateUnix.Year(), dateUnix.Month(), 1, 0, 0, 0, 0, dateUnix.Location())

	for value := range c {
		DatePay := dateUnix.AddDate(0, value+1, 0).UnixMilli()
		checkPay := models.CheckPay{
			QuotaNumber: fmt.Sprint(value + 1),
			DatePay:     fmt.Sprint(DatePay),
			Pay:         false,
		}
		listCheckPay = append(listCheckPay, checkPay)
	}

	return listCheckPay
}

func (a *App) GetClientPopUp(ID string) *models.ClientPopUp {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	client := &models.ClientPopUp{}

	if err = driver.Read("clients", ID, client); err != nil {
		return nil
	}

	recordsLoans, err := driver.ReadAll("loans")
	if err != nil {
		return client
	}

	for _, r := range recordsLoans {
		p := &models.Loan{}
		err := json.Unmarshal([]byte(r), p)
		if err != nil {
			fmt.Println(err)
		}
		if ID == p.ClientId {
			client.Loans = append(client.Loans, models.LoanToPopUpClient{
				ID:             p.ID,
				Amount:         p.Amount,
				Interest:       p.Interest,
				Quota:          p.Quota,
				Date:           p.Date,
				TotalAmount:    p.TotalAmount,
				AmountForQuota: p.AmountForQuota,
				AmountPaid:     p.AmountPaid,
			})
		}
	}

	return client
}

func (a *App) GetLoan(ID string) *models.Loan {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	loan := &models.Loan{}

	if err = driver.Read("loans", ID, loan); err != nil {
		return nil
	}

	return loan
}

func (a *App) UpdateLoan(loan models.Loan) {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	if err = driver.Write("loans", loan.ID, loan); err != nil {
		panic(err)
	}
}

func (a *App) GetQuotasForMonth(date string) ([]models.CheckPayAndClient, error) {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	loansRecords, err := driver.ReadAll("loans")
	if err != nil {
		return nil, err
	}

	listCheckPay := []models.CheckPayAndClient{}

	for _, r := range loansRecords {
		p := &models.Loan{}
		err := json.Unmarshal([]byte(r), p)
		if err != nil {
			fmt.Println(err)
		}
		for _, checkPay := range p.CheckPay {
			if date == checkPay.DatePay {
				client := &models.Client{}
				err := driver.Read("clients", p.ClientId, client)
				if err != nil {
					return nil, err
				}
				listCheckPay = append(listCheckPay, models.CheckPayAndClient{
					QuotaNumber: checkPay.QuotaNumber,
					DatePay:     checkPay.DatePay,
					Pay:         checkPay.Pay,
					ClientId:    p.ClientId,
					ClientName:  client.Name + " " + client.Last_Name,
					DNI:         client.DNI,
				})
				break
			}
		}
	}

	return listCheckPay, nil
}
