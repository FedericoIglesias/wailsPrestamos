package models

import "encoding/json"

type CheckPay struct {
	Month json.Number
	Pay   bool
}
