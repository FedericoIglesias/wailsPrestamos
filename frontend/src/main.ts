import { SaveClient, GetAllClient } from "../wailsjs/go/main/App.js";
import { Client } from "./vite-env.js";
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
const tbodyClient = $("tbodyClient");
const tbodyPrestamo = $("tbodyPrestamo");

const createRowClient = (Client: Client) => {
  return `<tr id=${Client.ID}>
  <td>${Client.Name + "" + Client.Last_Name}</td>
  <td>${Client.Address}</td>
  <td>${Client.Phone}</td>
  <td>${Client.Email}</td>
  <td>${Client.DNI}</td>
  <td>${Client.CUIL}</td>
  <td>${Client.Empresa}</td>
  <td>${Client.Job}</td>
  </tr>`;
};
const createRowPrestamo = (
  Amount: any,
  Interest: any,
  Cuota: any,
  Date: any,
  Client: any
) => {
  return `<tr>
  <td>${Amount}</td>
  <td>${Interest}</td>
  <td>${Cuota}</td>
  <td>${Date}</td>
  <td>${Client}</td>
  </tr>`;
};

const InitTableClient = async () => {
  if (tbodyClient) {
    while (tbodyClient.firstChild) {
      tbodyClient.removeChild(tbodyClient.firstChild);
    }
    GetAllClient().then((data) => {
      data.map((client: Client) => {
        const row = createRowClient(client);
        tbodyClient.appendChild(document.createElement("tr")).innerHTML = row;
      });
    });
  }
};

const createClient = () => {
  if (
    inptName &&
    inptLastName &&
    inptAddress &&
    inptPhone &&
    inptEmail &&
    inptDNI &&
    inptCUIL &&
    inptEmpresa &&
    inptJob
  ) {
    SaveClient(
      inptName.value,
      inptLastName.value,
      inptAddress.value,
      inptPhone.value.toString(),
      inptEmail.value,
      inptDNI.value.toString(),
      inptCUIL.value.toString(),
      inptEmpresa.value,
      inptJob.value
    );
    inptName.value = "";
    inptLastName.value = "";
    inptAddress.value = "";
    inptPhone.value = "";
    inptEmail.value = "";
    inptDNI.value = "";
    inptCUIL.value = "";
    inptEmpresa.value = "";
    inptJob.value = "";
  }
};

const createPrestamo = () => {
  const row = createRowPrestamo(
    inputAmount.value,
    inputInterest.value,
    inputCuota.value,
    inputDate.value,
    selectClient.value
  );
  if (tbodyPrestamo)
    tbodyPrestamo.appendChild(document.createElement("tr")).innerHTML = row;
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
