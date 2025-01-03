package models

import "encoding/json"

type CheckPay struct {
	QuotaNumber json.Number
	Pay         bool
}
