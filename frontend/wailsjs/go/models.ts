export namespace models {
	
	export class CheckPay {
	    QuotaNumber: string;
	    Pay: boolean;
	
	    static createFrom(source: any = {}) {
	        return new CheckPay(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.QuotaNumber = source["QuotaNumber"];
	        this.Pay = source["Pay"];
	    }
	}
	export class Client {
	    ID: string;
	    Name: string;
	    Last_Name: string;
	    Address: string;
	    Zone: string;
	    Partido: string;
	    Phone: string;
	    DNI: string;
	    CUIL: string;
	    Empresa: string;
	    Job: string;
	    JobPlace: string;
	
	    static createFrom(source: any = {}) {
	        return new Client(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.Name = source["Name"];
	        this.Last_Name = source["Last_Name"];
	        this.Address = source["Address"];
	        this.Zone = source["Zone"];
	        this.Partido = source["Partido"];
	        this.Phone = source["Phone"];
	        this.DNI = source["DNI"];
	        this.CUIL = source["CUIL"];
	        this.Empresa = source["Empresa"];
	        this.Job = source["Job"];
	        this.JobPlace = source["JobPlace"];
	    }
	}
	export class LoanToPopUpClient {
	    ID: string;
	    LoanNumber: string;
	    Amount: string;
	    Interest: string;
	    Quota: string;
	    Date: string;
	    TotalAmount: string;
	    AmountForQuota: string;
	    AmountPaid: string;
	
	    static createFrom(source: any = {}) {
	        return new LoanToPopUpClient(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.LoanNumber = source["LoanNumber"];
	        this.Amount = source["Amount"];
	        this.Interest = source["Interest"];
	        this.Quota = source["Quota"];
	        this.Date = source["Date"];
	        this.TotalAmount = source["TotalAmount"];
	        this.AmountForQuota = source["AmountForQuota"];
	        this.AmountPaid = source["AmountPaid"];
	    }
	}
	export class ClientPopUp {
	    Name: string;
	    Last_Name: string;
	    Address: string;
	    Phone: string;
	    Email: string;
	    DNI: string;
	    CUIL: string;
	    Empresa: string;
	    Job: string;
	    LoanAmount: string;
	    AmountDue: string;
	    AmountPaid: string;
	    Loans: LoanToPopUpClient[];
	
	    static createFrom(source: any = {}) {
	        return new ClientPopUp(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Last_Name = source["Last_Name"];
	        this.Address = source["Address"];
	        this.Phone = source["Phone"];
	        this.Email = source["Email"];
	        this.DNI = source["DNI"];
	        this.CUIL = source["CUIL"];
	        this.Empresa = source["Empresa"];
	        this.Job = source["Job"];
	        this.LoanAmount = source["LoanAmount"];
	        this.AmountDue = source["AmountDue"];
	        this.AmountPaid = source["AmountPaid"];
	        this.Loans = this.convertValues(source["Loans"], LoanToPopUpClient);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Loan {
	    ID: string;
	    LoanNumber: string;
	    Amount: string;
	    Interest: string;
	    Quota: string;
	    Date: string;
	    ClientId: string;
	    TotalAmount: string;
	    AmountForQuota: string;
	    AmountPaid: string;
	    CheckPay: CheckPay[];
	
	    static createFrom(source: any = {}) {
	        return new Loan(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.LoanNumber = source["LoanNumber"];
	        this.Amount = source["Amount"];
	        this.Interest = source["Interest"];
	        this.Quota = source["Quota"];
	        this.Date = source["Date"];
	        this.ClientId = source["ClientId"];
	        this.TotalAmount = source["TotalAmount"];
	        this.AmountForQuota = source["AmountForQuota"];
	        this.AmountPaid = source["AmountPaid"];
	        this.CheckPay = this.convertValues(source["CheckPay"], CheckPay);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LoanBrought {
	    ID: string;
	    LoanNumber: string;
	    Amount: string;
	    Interest: string;
	    Quota: string;
	    Date: string;
	    TotalAmount: string;
	    AmountForQuota: string;
	    ClientId: string;
	
	    static createFrom(source: any = {}) {
	        return new LoanBrought(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.LoanNumber = source["LoanNumber"];
	        this.Amount = source["Amount"];
	        this.Interest = source["Interest"];
	        this.Quota = source["Quota"];
	        this.Date = source["Date"];
	        this.TotalAmount = source["TotalAmount"];
	        this.AmountForQuota = source["AmountForQuota"];
	        this.ClientId = source["ClientId"];
	    }
	}
	export class LoanTable {
	    ID: string;
	    LoanNumber: string;
	    Amount: string;
	    Interest: string;
	    Quota: string;
	    Date: string;
	    ClientId: string;
	    ClientName: string;
	
	    static createFrom(source: any = {}) {
	        return new LoanTable(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.LoanNumber = source["LoanNumber"];
	        this.Amount = source["Amount"];
	        this.Interest = source["Interest"];
	        this.Quota = source["Quota"];
	        this.Date = source["Date"];
	        this.ClientId = source["ClientId"];
	        this.ClientName = source["ClientName"];
	    }
	}

}

