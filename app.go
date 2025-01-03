package main

import (
	"encoding/json"
	"fmt"
	"prestamos/internal/models"
	"sort"

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

func (a *App) SavePrestamo(prestamo models.PrestamoBrought) {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	listCheckPay := FillQuote(prestamo.Cuota)

	err = driver.Write("prestamos", prestamo.ID, &models.Prestamo{
		ID:             prestamo.ID,
		Amount:         prestamo.Amount,
		Interest:       prestamo.Interest,
		Cuota:          prestamo.Cuota,
		Date:           prestamo.Date,
		ClientId:       prestamo.ClientId,
		CheckPay:       listCheckPay,
		TotalAmount:    prestamo.TotalAmount,
		AmountPaid:     "0",
		AmountForQuota: prestamo.AmountForQuota,
	})

	if err != nil {
		fmt.Println(err)
	}

}

func (a *App) GetAllPrestamoTable() []models.PrestamoTable {
	driver, err := local_db.New("./db", nil)

	if err != nil {
		panic(err)
	}

	listPrestamo := []models.Prestamo{}

	records, err := driver.ReadAll("prestamos")

	if err != nil {
		return nil
	}

	for _, prestamo := range records {
		p := &models.Prestamo{}
		if err := json.Unmarshal([]byte(prestamo), &p); err != nil {
			panic(err)
		}
		listPrestamo = append(listPrestamo, *p)
	}

	return FillDataPrestamo(listPrestamo, a.GetAllClient())
}

func FillDataPrestamo(listPrestamo []models.Prestamo, listClient []models.Client) []models.PrestamoTable {
	var listPrestamoTable []models.PrestamoTable
	for _, client := range listClient {
		for _, prestamo := range listPrestamo {
			if prestamo.ClientId == client.ID {
				prestamoTable := &models.PrestamoTable{
					ID:         prestamo.ID,
					Amount:     prestamo.Amount,
					Interest:   prestamo.Interest,
					Cuota:      prestamo.Cuota,
					Date:       prestamo.Date,
					ClientId:   prestamo.ClientId,
					ClientName: client.Name + " " + client.Last_Name,
				}
				listPrestamoTable = append(listPrestamoTable, *prestamoTable)
			}
		}
	}

	sort.Slice(listPrestamoTable, func(i, j int) bool { return listPrestamoTable[i].Date < listPrestamoTable[j].Date })
	return listPrestamoTable
}

func FillQuote(quotas json.Number) []models.CheckPay {
	listCheckPay := []models.CheckPay{}

	c, err := quotas.Int64()

	if err != nil {
		fmt.Println(err)
	}

	var count int64 = 0

	for range c {
		count += 1
		checkPay := models.CheckPay{
			QuotaNumber: json.Number(fmt.Sprintf("%d", count)),
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
		panic(err)
	}

	recordsPrestamos, err := driver.ReadAll("prestamos")
	if err != nil {
		panic(err)
	}

	for _, r := range recordsPrestamos {
		p := &models.Prestamo{}
		err := json.Unmarshal([]byte(r), p)
		if err != nil {
			fmt.Println(err)
		}
		if ID == p.ClientId {
			client.Prestamos = append(client.Prestamos, models.PrestamoToPopUpClient{
				ID:             p.ID,
				Amount:         p.Amount,
				Interest:       p.Interest,
				Cuota:          p.Cuota,
				Date:           p.Date,
				TotalAmount:    p.TotalAmount,
				AmountForQuota: p.AmountForQuota,
				AmountPaid:     p.AmountPaid,
			})
		}
	}

	return client
}

func (a *App) GetPrestamo(ID string) *models.Prestamo {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	prestamo := &models.Prestamo{}

	if err = driver.Read("prestamos", ID, prestamo); err != nil {
		return nil
	}

	return prestamo
}

func (a *App) UpdatePrestamo(prestamo models.Prestamo) {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	if err = driver.Write("prestamos", prestamo.ID, prestamo); err != nil {
		panic(err)
	}
}
