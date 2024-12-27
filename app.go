package main

import (
	"context"
	"encoding/json"
	"prestamos/internal/models"
	"sort"

	"github.com/FedericoIglesias/local_db"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
// func (a *App) startup(ctx context.Context) {
// 	a.ctx = ctx
// }

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

	driver.Write("prestamos", prestamo.ID.String(), prestamo)
}
