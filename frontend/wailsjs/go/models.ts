export namespace models {
	
	export class Client {
	    ID: string;
	    Name: string;
	    Last_Name: string;
	    Address: string;
	    Phone: string;
	    Email: string;
	    DNI: string;
	    CUIL: string;
	    Empresa: string;
	    Job: string;
	
	    static createFrom(source: any = {}) {
	        return new Client(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.Name = source["Name"];
	        this.Last_Name = source["Last_Name"];
	        this.Address = source["Address"];
	        this.Phone = source["Phone"];
	        this.Email = source["Email"];
	        this.DNI = source["DNI"];
	        this.CUIL = source["CUIL"];
	        this.Empresa = source["Empresa"];
	        this.Job = source["Job"];
	    }
	}
	export class PrestamoToPopUpClient {
	    ID: string;
	    Amount: string;
	    Interest: string;
	    Cuota: string;
	    Date: string;
	
	    static createFrom(source: any = {}) {
	        return new PrestamoToPopUpClient(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.Amount = source["Amount"];
	        this.Interest = source["Interest"];
	        this.Cuota = source["Cuota"];
	        this.Date = source["Date"];
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
	    PrestamoAmount: string;
	    AmountDue: string;
	    AmountPaid: string;
	    Prestamos: PrestamoToPopUpClient[];
	
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
	        this.PrestamoAmount = source["PrestamoAmount"];
	        this.AmountDue = source["AmountDue"];
	        this.AmountPaid = source["AmountPaid"];
	        this.Prestamos = this.convertValues(source["Prestamos"], PrestamoToPopUpClient);
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
	export class PrestamoBrought {
	    ID: string;
	    Amount: string;
	    Interest: string;
	    Cuota: string;
	    Date: string;
	    TotalAmount: string;
	    AmountForQuota: string;
	    ClientId: string;
	
	    static createFrom(source: any = {}) {
	        return new PrestamoBrought(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.Amount = source["Amount"];
	        this.Interest = source["Interest"];
	        this.Cuota = source["Cuota"];
	        this.Date = source["Date"];
	        this.TotalAmount = source["TotalAmount"];
	        this.AmountForQuota = source["AmountForQuota"];
	        this.ClientId = source["ClientId"];
	    }
	}
	export class PrestamoTable {
	    ID: string;
	    Amount: string;
	    Interest: string;
	    Cuota: string;
	    Date: string;
	    ClientId: string;
	    ClientName: string;
	
	    static createFrom(source: any = {}) {
	        return new PrestamoTable(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.Amount = source["Amount"];
	        this.Interest = source["Interest"];
	        this.Cuota = source["Cuota"];
	        this.Date = source["Date"];
	        this.ClientId = source["ClientId"];
	        this.ClientName = source["ClientName"];
	    }
	}

}

