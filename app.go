package main

import (
	"encoding/json"
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

func (a *App) SavePrestamo(prestamo models.Prestamo) {
	driver, err := local_db.New("./db", nil)
	if err != nil {
		panic(err)
	}

	driver.Write("prestamos", prestamo.ID, prestamo)
}

func (a *App) GetAllPrestamo() []models.PrestamoPlus {
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

func FillDataPrestamo(listPrestamo []models.Prestamo, listClient []models.Client) []models.PrestamoPlus {
	var listPrestamoPlus []models.PrestamoPlus
	for _, client := range listClient {
		for _, prestamo := range listPrestamo {
			if prestamo.ClientId == client.ID {
				prestamoPlus := &models.PrestamoPlus{
					ID:         prestamo.ID,
					Amount:     prestamo.Amount,
					Interest:   prestamo.Interest,
					Cuota:      prestamo.Cuota,
					Date:       prestamo.Date,
					ClientId:   prestamo.ClientId,
					ClientName: client.Name + " " + client.Last_Name,
				}
				listPrestamoPlus = append(listPrestamoPlus, *prestamoPlus)
			}
		}
	}
	sort.Slice(listPrestamoPlus, func(i, j int) bool { return listPrestamoPlus[i].Date < listPrestamoPlus[j].Date })
	return listPrestamoPlus
}
