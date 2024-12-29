import { GetAllClient, SavePrestamo } from "../wailsjs/go/main/App.js";
import { checkClient } from "./utils/createClient.js";
import { InitTableClient } from "./utils/tableClient.js";
import { initTablePrestamo } from "./utils/tablePrestamo.js";
import { Client, PrestamoBrought } from "./vite-env.js";
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
const btnClient = $("btnClient") as HTMLButtonElement;
const inputAmount = $("inputAmount") as HTMLInputElement;
const inputInterest = $("inputInterest") as HTMLInputElement;
const inputCuota = $("inputCuota") as HTMLInputElement;
const inputDate = $("inputDate") as HTMLInputElement;
const selectClient = $("selectClient") as HTMLSelectElement;
const descriptionPrestamo = $$(".descriptionPrestamo") as HTMLDivElement;
const listClient = GetAllClient().then((data) => data);

if (tablePrestamo)
  tablePrestamo.addEventListener("click", async () => {
    await initTablePrestamo();
    sectionAddClient.style.display = "none";
    sectionAddPrestamo.style.display = "none";
    sectionTableClient.style.display = "none";
    sectionTablePrestamo.style.display = "block";
  });

const createPrestamo = () => {
  const prestamo: PrestamoBrought = {
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

btnPrestamo.addEventListener("click", () => {
  checkPrestamo();
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
  (await listClient).map((client: Client) => {
    let option: HTMLOptionElement = document.createElement("option");
    option.value = client.ID;
    option.text = client.DNI + "--" + client.Name + " " + client.Last_Name;
    selectClient.add(option);
  });
};

btnClient.addEventListener("click", () => {
  checkClient();
});

sectionAddClient.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkClient();
  }
});
