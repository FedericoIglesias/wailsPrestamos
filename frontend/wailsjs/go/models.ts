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
	export class Prestamo {
	    ID: string;
	    Amount: string;
	    Interest: string;
	    Cuota: string;
	    Date: string;
	    ClientId: string;
	
	    static createFrom(source: any = {}) {
	        return new Prestamo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.Amount = source["Amount"];
	        this.Interest = source["Interest"];
	        this.Cuota = source["Cuota"];
	        this.Date = source["Date"];
	        this.ClientId = source["ClientId"];
	    }
	}
	export class PrestamoPlus {
	    ID: string;
	    Amount: string;
	    Interest: string;
	    Cuota: string;
	    Date: string;
	    ClientId: string;
	    ClientName: string;
	
	    static createFrom(source: any = {}) {
	        return new PrestamoPlus(source);
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

