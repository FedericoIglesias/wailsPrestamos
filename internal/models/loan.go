package models

type Loan struct {
	ID             string
	LoanNumber     string
	Amount         string
	Interest       string
	Quota          string
	Date           string
	ClientId       string
	TotalAmount    string
	AmountForQuota string
	AmountPaid     string
	CheckPay       []CheckPay
}

type LoanTable struct {
	ID         string
	LoanNumber string
	Amount     string
	Interest   string
	Quota      string
	Date       string
	ClientId   string
	ClientName string
}

type LoanBrought struct {
	ID             string
	LoanNumber     string
	Amount         string
	Interest       string
	Quota          string
	Date           string
	TotalAmount    string
	AmountForQuota string
	ClientId       string
}

type LoanToPopUpClient struct {
	ID             string
	LoanNumber     string
	Amount         string
	Interest       string
	Quota          string
	Date           string
	TotalAmount    string
	AmountForQuota string
	AmountPaid     string
}
