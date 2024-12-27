package main

import (
	"encoding/json"
	"fmt"
	"prestamos/internal/models"
	"sort"
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
	driver.Write("clients", Client.ID, Client)
}

func (a *App) GetAllClient() []models.Client {
	driver, err := local_db.New("./db", nil)

	if err != nil {
		panic(err)
	}

	listClient := []models.Client{}

	records, err := driver.ReadAll("clients")

	if err != nil {
		panic(err)
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

	listCheckPay := FillMonth(prestamo.Date, prestamo.Cuota)

	fmt.Printf("%v ", listCheckPay)

	driver.Write("prestamos", prestamo.ID, &models.Prestamo{
		ID:       prestamo.ID,
		Amount:   prestamo.Amount,
		Interest: prestamo.Interest,
		Cuota:    prestamo.Cuota,
		Date:     prestamo.Date,
		ClientId: prestamo.ClientId,
		CheckPay: listCheckPay,
	})
}

func (a *App) GetAllPrestamoTable() []models.PrestamoTable {
	driver, err := local_db.New("./db", nil)

	if err != nil {
		panic(err)
	}

	listPrestamo := []models.Prestamo{}

	records, err := driver.ReadAll("prestamos")

	if err != nil {
		panic(err)
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

func FillMonth(Date json.Number, cuotas json.Number) []models.CheckPay {
	listCheckPay := []models.CheckPay{}

	jsTime, err := Date.Int64()
	if err != nil {
		fmt.Printf("%v ", err)
	}

	t := time.Unix(jsTime/1000, 0)

	month := int64(t.Month())

	for range cuotas {
		if month+1 == 13 {
			month = 0
		}
		month += 1
		checkPay := models.CheckPay{
			Month: fmt.Sprintf("%d", month),
			Pay:   false,
		}
		listCheckPay = append(listCheckPay, checkPay)
	}

	return listCheckPay
}
