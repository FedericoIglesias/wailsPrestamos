import {
  SaveClient,
  GetAllClient,
  SavePrestamo,
  GetAllPrestamo,
} from "../wailsjs/go/main/App.js";
import { Client, prestamo } from "./vite-env.js";
const $ = (id: string) => document.getElementById(id);
const $$ = (name: string) => document.querySelector(name);
const addClient = $("add-client");
const addPrestamo = $("add-prestamo");
const tablePrestamo = $("table-prestamo");
const tableClient = $("table-client");
const sectionAddPrestamo = $$(".add-prestamo") as HTMLDivElement;
const sectionAddClient = $$(".add-client") as HTMLDivElement;
const sectionTableClient = $$(".table-client") as HTMLDivElement;
const sectionTablePrestamo = $$(".table-prestamo") as HTMLDivElement;
const btnPrestamo = $("btnPrestamo") as HTMLButtonElement;
const inputAmount = $("inputAmount") as HTMLInputElement;
const inputInterest = $("inputInterest") as HTMLInputElement;
const inputCuota = $("inputCuota") as HTMLInputElement;
const inputDate = $("inputDate") as HTMLInputElement;
const selectClient = $("selectClient") as HTMLSelectElement;
const btnClient = $("btnClient") as HTMLButtonElement;
const inptName = $("inptName") as HTMLInputElement;
const inptLastName = $("inptLastName") as HTMLInputElement;
const inptAddress = $("inptAddress") as HTMLInputElement;
const inptPhone = $("inptPhone") as HTMLInputElement;
const inptEmail = $("inptEmail") as HTMLInputElement;
const inptDNI = $("inptDNI") as HTMLInputElement;
const inptCUIL = $("inptCUIL") as HTMLInputElement;
const inptEmpresa = $("inptEmpresa") as HTMLInputElement;
const inptJob = $("inptJob") as HTMLInputElement;
const descriptionPrestamo = $$(".descriptionPrestamo") as HTMLDivElement;
const tbodyClient = $("tbodyClient");
const tbodyPrestamo = $("tbodyPrestamo");
const listClient = GetAllClient().then((data) => data);
const listPrestamo = GetAllPrestamo().then((data) => data);

const createRowClient = (Client: Client) => {
  return `<tr id=${Client.ID}>
  <td>${Client.Name + " " + Client.Last_Name}</td>
  <td>${Client.Address}</td>
  <td>${Client.Phone}</td>
  <td>${Client.Email}</td>
  <td>${Client.DNI}</td>
  <td>${Client.CUIL}</td>
  <td>${Client.Empresa}</td>
  <td>${Client.Job}</td>
  </tr>`;
};
const createRowPrestamo = (prestamo: prestamo) => {
  return `<tr>
  <td>${prestamo.Amount}</td>
  <td>${prestamo.Interest}</td>
  <td>${prestamo.Cuota}</td>
  <td>${prestamo.Date}</td>
  <td>${prestamo.ClientId}</td>
  </tr>`;
};

const initTablePrestamo = async () => {
  if (tbodyPrestamo) {
    while (tbodyPrestamo.firstChild) {
      tbodyPrestamo.removeChild(tbodyPrestamo.firstChild);
    }
    (await listPrestamo).map((Prestamo: prestamo) => {
      const row = createRowPrestamo(Prestamo);
      tbodyPrestamo.appendChild(document.createElement("tr")).innerHTML = row;
    });
  }
};

const InitTableClient = async () => {
  if (tbodyClient) {
    while (tbodyClient.firstChild) {
      tbodyClient.removeChild(tbodyClient.firstChild);
    }
    (await listClient).map((client: Client) => {
      const row = createRowClient(client);
      tbodyClient.appendChild(document.createElement("tr")).innerHTML = row;
    });
  }
};

const createClient = () => {
  const client: Client = {
    ID: "C" + new Date().getTime().toString(),
    Name: inptName.value.toLowerCase(),
    Last_Name: inptLastName.value.toLowerCase(),
    Address: inptAddress.value.toLowerCase(),
    Phone: inptPhone.value.toString(),
    Email: inptEmail.value.toLowerCase(),
    DNI: inptDNI.value.toString(),
    CUIL: inptCUIL.value.toString(),
    Empresa: inptEmpresa.value.toLowerCase(),
    Job: inptJob.value.toLowerCase(),
  };

  SaveClient(client);
  inptName.value = "";
  inptLastName.value = "";
  inptAddress.value = "";
  inptPhone.value = "";
  inptEmail.value = "";
  inptDNI.value = "";
  inptCUIL.value = "";
  inptEmpresa.value = "";
  inptJob.value = "";
};

const createPrestamo = () => {
  const prestamo: prestamo = {
    ID: "P" + new Date().getTime().toString(),
    Amount: inputAmount.value,
    Interest: inputInterest.value,
    Cuota: inputCuota.value,
    Date: new Date(inputDate.value).getTime().toString(),
    ClientId: selectClient.value,
  };
  SavePrestamo(prestamo);
  inputAmount.value = "";
  inputInterest.value = "";
  inputCuota.value = "";
  inputDate.value = "";
  selectClient.value = "";
};

const checkClient = () => {
  let checkCount = 0;

  inptName.value == ""
    ? (inptName.style.border = "1px solid red")
    : ((inptName.style.border = "1px solid black"), checkCount++);
  inptLastName.value == ""
    ? (inptLastName.style.border = "1px solid red")
    : ((inptLastName.style.border = "1px solid black"), checkCount++);
  inptAddress.value == ""
    ? (inptAddress.style.border = "1px solid red")
    : ((inptAddress.style.border = "1px solid black"), checkCount++);
  inptPhone.value == ""
    ? (inptPhone.style.border = "1px solid red")
    : ((inptPhone.style.border = "1px solid black"), checkCount++);
  inptEmail.value == ""
    ? (inptEmail.style.border = "1px solid red")
    : ((inptEmail.style.border = "1px solid black"), checkCount++);
  inptDNI.value == ""
    ? (inptDNI.style.border = "1px solid red")
    : ((inptDNI.style.border = "1px solid black"), checkCount++);
  inptCUIL.value == ""
    ? (inptCUIL.style.border = "1px solid red")
    : ((inptCUIL.style.border = "1px solid black"), checkCount++);
  inptEmpresa.value == ""
    ? (inptEmpresa.style.border = "1px solid red")
    : ((inptEmpresa.style.border = "1px solid black"), checkCount++);
  inptJob.value == ""
    ? (inptJob.style.border = "1px solid red")
    : ((inptJob.style.border = "1px solid black"), checkCount++);

  if (checkCount >= 9) {
    return createClient();
  }
  return alert("Complete todos los campos");
};

const checkPrestamo = () => {
  let checkCount = 0;
  inputAmount.value == ""
    ? (inputAmount.style.border = "1px solid red")
    : ((inputAmount.style.border = "1px solid black"), checkCount++);
  inputInterest.value == ""
    ? (inputInterest.style.border = "1px solid red")
    : ((inputInterest.style.border = "1px solid black"), checkCount++);
  inputCuota.value == ""
    ? (inputCuota.style.border = "1px solid red")
    : ((inputCuota.style.border = "1px solid black"), checkCount++);
  inputDate.value == ""
    ? (inputDate.style.border = "1px solid red")
    : ((inputDate.style.border = "1px solid black"), checkCount++);
  selectClient.value == ""
    ? (selectClient.style.border = "1px solid red")
    : ((selectClient.style.border = "1px solid black"), checkCount++);
  if (checkCount >= 5) {
    console.log(checkCount);
    return createPrestamo();
  }
  return alert("Complete todos los campos");
};

if (addClient)
  addClient.addEventListener("click", () => {
    sectionAddClient.style.display = "block";
    sectionAddPrestamo.style.display = "none";
    sectionTableClient.style.display = "none";
    sectionTablePrestamo.style.display = "none";
  });
if (addPrestamo)
  addPrestamo.addEventListener("click", () => {
    fillSelectClient();
    sectionAddClient.style.display = "none";
    sectionAddPrestamo.style.display = "block";
    sectionTableClient.style.display = "none";
    sectionTablePrestamo.style.display = "none";
  });
if (tableClient)
  tableClient.addEventListener("click", () => {
    InitTableClient();
    sectionAddClient.style.display = "none";
    sectionAddPrestamo.style.display = "none";
    sectionTableClient.style.display = "block";
    sectionTablePrestamo.style.display = "none";
  });
if (tablePrestamo)
  tablePrestamo.addEventListener("click", () => {
    initTablePrestamo();
    sectionAddClient.style.display = "none";
    sectionAddPrestamo.style.display = "none";
    sectionTableClient.style.display = "none";
    sectionTablePrestamo.style.display = "block";
  });

btnPrestamo.addEventListener("click", () => {
  checkPrestamo();
});

btnClient.addEventListener("click", () => {
  checkClient();
});

sectionAddClient.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkClient();
  }
});
sectionAddPrestamo.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkPrestamo();
  }
});

sectionAddPrestamo.addEventListener("change", () => {
  const { toPay } = calculatePrestamo();
  showCalculated(toPay);
});

const calculatePrestamo = () => {
  const int = Number(inputInterest.value) * Number(inputCuota.value);
  const toPay = Math.floor(Number(inputAmount.value) * (1 + int / 100));
  return { int, toPay };
};
const showCalculated = (toPay: number) => {
  const amountForMonth = Math.floor(toPay / Number(inputCuota.value));
  const intForMonth = Math.floor(toPay - Number(inputAmount.value));
  if (descriptionPrestamo)
    return (descriptionPrestamo.innerHTML = `<div>
    <p>* Monto a devolver: <span>${toPay}</span>$</p>
    <p>* Monto por mes: <span>${amountForMonth}</span>$</p>
    <p>* Monto de interes: <span>${intForMonth}</span>$</p>
</div>`);
  return;
};

const fillSelectClient = async () => {
  console.log("fill select");
  (await listClient).map((client: Client) => {
    selectClient.appendChild(
      document.createElement("option")
    ).innerHTML = `<option value=${client.ID}>${
      client.DNI + "--" + client.Name + " " + client.Last_Name
    }</option>`;
  });
};
