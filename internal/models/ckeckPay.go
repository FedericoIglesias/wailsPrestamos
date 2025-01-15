package models

type CheckPay struct {
	QuotaNumber string
	DatePay     string
	Pay         bool
}

type CheckPayAndClient struct {
	QuotaNumber string
	DatePay     string
	Pay         bool
	ClientId    string
	ClientName  string
	DNI         string
}
