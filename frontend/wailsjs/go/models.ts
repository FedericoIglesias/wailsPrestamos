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

}

